from django.http import HttpResponseRedirect, HttpResponse
from django.views.generic.base import TemplateView
from django.template import loader
from apps.utils.apcd_database import  get_api_users, update_api_users, get_api_users_org_list
from apps.utils.apcd_groups import is_apcd_admin
from apps.components.paginator.custom_api_paginator import paginator
import logging

logger = logging.getLogger(__name__)


class ViewUsersTable(TemplateView):
    template_name = 'view_users.html'

    ##FORM FUNCTION
    def post(self, request):

        form = request.POST.copy()

        def _err_msg(resp):
            if 'pgerror' in resp:
                return resp['pgerror']
            if hasattr(resp, 'pgerror'):
                return resp.pgerror
            if isinstance(resp, Exception):
                return str(resp)
            return None

        def _edit_user(form):
            errors = []
            data = {
                "user_name": form['user_name'],
                "user_email": form['user_email'],
                "user_id": form['user_id'],
                "role_id": form['role_id'],
                "active": form['status'],
                "notes": form['notes'],
            }
            user_response = update_api_users(form['user_number'], data)
            if _err_msg(user_response):
                errors.append(_err_msg(user_response))
            if len(errors) != 0:
                logger.debug(print(errors))
                template = loader.get_template('view_user_edit_error.html')
            else:
                logger.debug(print("success"))
                template = loader.get_template('view_user_edit_success.html')
            return template

        template = _edit_user(form)
        return HttpResponse(template.render({}, request))

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return HttpResponseRedirect('/')
        return super(ViewUsersTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):
        context = super(ViewUsersTable, self).get_context_data(*args, **kwargs)

        context['header'] = ['User ID', 'Name', 'Organization', 'Role', 'Active', 'User Number', 'See More']
        context['status_options'] = ['All', 'Active', 'Inactive']
        context['role_options'] = ['SUBMITTER_USER', 'SUBMITTER_ADMIN', 'APCD_ADMIN']
        context['status'] = ['True', 'False']
        context['filter_options'] = ['All'] + get_api_users_org_list()

        # this kind of sucks, we should make this not hard coded, just getting it to work for now
        context['roles'] = [
            {'role_id': 1, 'role_name': 'APCD_ADMIN'},
            {'role_id': 2, 'role_name': 'SUBMITTER_ADMIN'},
            {'role_id': 3, 'role_name': 'SUBMITTER_USER'}
        ]

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        queryStr = ''
        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')
        role_filter = self.request.GET.get('role_name')

        context['selected_status'] = None
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'

        if role_filter is not None and role_filter != 'All':
            context['selected_role'] = role_filter

        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            queryStr += f'&org={org_filter}'

        limit = 50
        user_content = get_api_users(page_num, limit, status_filter, org_filter)

        context['query_str'] = queryStr
        context.update(paginator(self.request, user_content, limit))
        context['pagination_url_namespaces'] = 'administration:view_users'

        return context
