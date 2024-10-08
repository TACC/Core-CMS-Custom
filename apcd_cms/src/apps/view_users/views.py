from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core.paginator import Paginator, EmptyPage
from django.views.generic.base import TemplateView
from django.template import loader
from apps.utils.apcd_database import get_users, update_user
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import table_filter
from apps.components.paginator.paginator import paginator
import logging

logger = logging.getLogger(__name__)

class ViewUsersTable(TemplateView):
    template_name = 'view_users.html'
    ##FORM FUNCTION
    def post(self, request):

        form = request.POST.copy()
        
        def _err_msg(resp):
            if hasattr(resp, 'pgerror'):
                return resp.pgerror
            if isinstance(resp, Exception):
                return str(resp)
            return None
        
        def _edit_user(form):
            errors = []
            user_response = update_user(form)
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
    def get(self, request, *args, **kwargs):
        user_content = get_users()


        context = self.get_context_data(user_content, *args,**kwargs)
        template = loader.get_template(self.template_name)
        return HttpResponse(template.render(context, request))
        ##END FORM FUNCTION

    user_content = get_users()

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
           return HttpResponseRedirect('/')
        return super(ViewUsersTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, user_content=user_content, *args, **kwargs):
        context = super(ViewUsersTable, self).get_context_data(*args, **kwargs)

        def _set_user(usr):
            return {
                    'role_id': usr[0],
                    'user_id': usr[1],
                    'user_email': usr[2],
                    'user_name': usr[3],
                    'entity_name': usr[4] if usr[4] else 'None',
                    'created_at': usr[5],
                    'updated_at': usr[6],
                    'notes': usr[7],
                    'status': 'Active' if usr[8] else 'Inactive',
                    'user_number': usr[9],
                    'role_name': usr[10],
                    'entity_name_no_parens': usr[4].replace("(", "").replace(")", "") if usr[4] else "None",  # just for filtering purposes
                    'active': usr[8],
                }

        context['header'] = ['User ID', 'Name', 'Entity Organization', 'Role', 'Status', 'User Number', 'See More']
        context['status_options'] = ['All', 'Active', 'Inactive']
        context['filter_options'] = ['All', 'None']
        context['role_options'] = ['SUBMITTER_USER', 'SUBMITTER_ADMIN','APCD_ADMIN']

        context['status'] = ['Active', 'Inactive']

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
        table_entries = []
        for user in user_content:
            table_entries.append(_set_user(user,))
            org_name = user[4] if user[4] else None
            if org_name not in context['filter_options']:  # prevent duplicates
                context['filter_options'].append(user[4])
                context['filter_options'] = sorted(context['filter_options'],key=lambda x: (x != 'All', x is None, x if x is not None else ''))
                
        queryStr = ''
        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')
        role_filter = self.request.GET.get('role_name')

        context['selected_status'] = 'All'
        if status_filter is not None and status_filter !='All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'
            table_entries = table_filter(status_filter, table_entries, 'status', False)

        if role_filter is not None and role_filter !='All':
            context['selected_role'] = role_filter
            table_entries = table_filter(role_filter, table_entries, 'role_name', False)        

        context['selected_org'] = 'All'
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            queryStr += f'&org={org_filter}'
            table_entries = table_filter(org_filter.replace("(", "").replace(")",""), table_entries, 'entity_name_no_parens')

        context['query_str'] = queryStr
        context.update(paginator(self.request, table_entries))
        context['pagination_url_namespaces'] = 'administration:view_users'

        return context
