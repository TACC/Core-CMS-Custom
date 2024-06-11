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
        context = self.get_view_users_json(user_content, *args,**kwargs)
        return JsonResponse({'response': context})
        ##END FORM FUNCTION

    user_content = get_users()

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
           return HttpResponseRedirect('/')
        return super(ViewUsersTable, self).dispatch(request, *args, **kwargs)

    def get_view_users_json(self, user_content, *args, **kwargs):
        context = {
            'header': ['User ID', 'Name', 'Entity Organization', 'Role', 'Status', 'User Number', 'See More'],
            'page': [],
            'status_options': ['All', 'Active', 'Inactive'],
            'org_options': ['All', 'Organization A', 'Organization B', 'Not Applicable'],
            'selected_status': 'All',
            'query_str': '',
            'pagination_url_namespaces': 'administration:view_users'
        }

        def _set_user(usr):
            return {
                'user_id': usr[1],
                'user_name': usr[3],
                'entity_name': usr[4] if usr[4] else "Not Applicable",
                'role_name': usr[10],
                'status': 'Active' if usr[8] else 'Inactive',
                'user_number': usr[9],
            }

        for user in user_content:
            context['page'].append(_set_user(user))

        return context
