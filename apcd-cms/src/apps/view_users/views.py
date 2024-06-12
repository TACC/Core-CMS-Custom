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
        status = request.GET.get('status', 'All')
        org = request.GET.get('org', 'All')
        try:
            # Fetch all users
            user_content = get_users()
            # Filter users based on status and org
            filtered_users = self.filter_users(user_content, status, org)
            context = self.get_view_users_json(filtered_users)
            return JsonResponse({'response': context})
        except Exception as e:
            logger.error("Error fetching user data: %s", e)
            return JsonResponse({'error': str(e)}, status=500)

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
           return HttpResponseRedirect('/')
        return super(ViewUsersTable, self).dispatch(request, *args, **kwargs)

    def filter_users(self, users, status, org):
        # Convert to a list of dicts for easier filtering
        def _set_user(usr):
            return {
                'role_id': usr[0],
                'user_id': usr[1],
                'user_email': usr[2],
                'user_name': usr[3],
                'entity_name': usr[4] if usr[4] else "Not Applicable",
                'created_at': usr[5],
                'updated_at': usr[6],
                'notes': usr[7],
                'status': 'Active' if usr[8] else 'Inactive',
                'user_number': usr[9],
                'role_name': usr[10],
            }

        user_list = [_set_user(user) for user in users]

        # Apply filtering
        if status != 'All':
            user_list = [user for user in user_list if user['status'] == status]

        if org != 'All':
            user_list = [user for user in user_list if user['entity_name'] == org]

        return user_list
    
    def get_view_users_json(self, user_content, *args, **kwargs):
        context = {
            'header': ['User ID', 'Name', 'Entity Organization', 'Role', 'Status', 'User Number', 'See More'],
            'page': [],
            'status_options': ['All', 'Active', 'Inactive'],
            'org_options': ['All', 'TEST Meritan Health', 'UTHealth - SPH CHCD: APCD', 'None', 'Not Applicable'],
            'selected_status': 'All',
            'query_str': '',
            'pagination_url_namespaces': 'administration:view_users'
        }

        def _set_user(usr):
            return {
                'user_id': usr['user_id'],
                'user_name': usr['user_name'],
                'entity_name': usr['entity_name'],
                'role_name': usr['role_name'],
                'status': usr['status'],
                'user_number': usr['user_number'],
                'view_link': f"/administration/view-user-details/{usr['user_id']}",
                'edit_link': f"/administration/edit-user/{usr['user_id']}",
            }

        for user in user_content:
            context['page'].append(_set_user(user))

        return context
