from django.http import HttpResponseRedirect, JsonResponse
from django.views.generic.base import TemplateView
from django.template import loader
from apps.utils.apcd_database import get_users, update_user
from apps.utils.apcd_groups import is_apcd_admin
import logging

logger = logging.getLogger(__name__)

class ViewUsersTable(TemplateView):
    template_name = 'view_users.html'
    
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return HttpResponseRedirect('/')
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        # Check if the request is for API data or template
        if 'options' in request.path:
            return self.get_options(request)
        if 'modal' in request.path:
            return self.get_modals(request, kwargs['modal_type'])
        
        # Handle filtering parameters
        status = request.GET.get('status', 'All')
        org = request.GET.get('org', 'All')

        try:
            # Fetch and filter users
            user_content = get_users()
            filtered_users = self.filter_users(user_content, status, org)
            context = self.get_view_users_json(filtered_users)
            return JsonResponse({'response': context})
        except Exception as e:
            logger.error("Error fetching filtered user data: %s", e)
            return JsonResponse({'error': str(e)}, status=500)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(self.get_view_users_json(get_users()))
        return context

    def get_options(self, request):
        try:
            status_options = ['All', 'Active', 'Inactive']
            org_options = ['All', 'TEST Meritan Health', 'UTHealth - SPH CHCD: APCD', 'None', 'Not Applicable']
            return JsonResponse({
                'status_options': status_options,
                'org_options': org_options
            })
        except Exception as e:
            logger.error("Error fetching options data: %s", e)
            return JsonResponse({'error': str(e)}, status=500)
    
    def get_modals(self, request, modal_type):
        if modal_type == 'view':
            modal_template = 'view_users_modal.html'
        elif modal_type == 'edit':
            modal_template = 'edit_users_modal.html'
        else:
            return JsonResponse({'error': 'Invalid modal type'}, status=400)
        
        modal_content = loader.render_to_string(modal_template)
        return JsonResponse({'content': modal_content})

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

    def filter_users(self, users, status, org):
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

        if status != 'All':
            user_list = [user for user in user_list if user['status'] == status]

        if org != 'All':
            user_list = [user for user in user_list if user['entity_name'] == org]

        return user_list
    
    def get_view_users_json(self, user_content):
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
                'user_email': usr['user_email'],
                'notes': usr['notes'],
                'created_at': usr['created_at'],
                'updated_at': usr['updated_at'],
                'view_link': f"/administration/view-user-details/{usr['user_id']}",
                'edit_link': f"/administration/edit-user/{usr['user_id']}",
            }

        for user in user_content:
            context['page'].append(_set_user(user))

        return context
