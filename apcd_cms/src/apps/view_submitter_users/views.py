from django.core.paginator import Paginator
from django.http import JsonResponse
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_submitter_users, update_user
from apps.base.base import BaseAPIView, APCDAdminAccessAPIMixin, APCDAdminAccessTemplateMixin
import logging
import json

# Logs errors for debugging & error handling?
logger = logging.getLogger(__name__)


class ViewSubmitterUsersTable(APCDAdminAccessTemplateMixin, TemplateView):
    template_name = 'view_submitter_users.html'


class ViewSubmitterUsersApi(APCDAdminAccessAPIMixin, BaseAPIView):

    # Sends the request to get the data complete with error handling
    def get(self, request, *args, **kwargs):
        if 'options' in request.path:
            return self.get_options(request)

        status = request.GET.get('status', 'Active')
        payor_code = request.GET.get('payor_code', 'All')
        page_number = int(request.GET.get('page', 1))
        items_per_page = int(request.GET.get('limit', 50))

        try:
            user_content = get_submitter_users()
            filtered_users = self.filter_submitter_users(user_content, status, payor_code)

            paginator = Paginator(filtered_users, items_per_page)
            page_info = paginator.get_page(page_number)

            context = self.get_view_users_json(list(page_info))
            context['page_num'] = page_info.number
            context['total_pages'] = paginator.num_pages

            return JsonResponse({'response': context})
        except Exception as e:
            logger.error("Error fetching filtered user data: %s", e)
            return JsonResponse({'error': str(e)}, status=500)

    # Retrieves the data with context added?
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(self.get_view_users_json(get_submitter_users()))
        return context

    def get_options(self, request):
        try:
            status_options = ['All', 'Active', 'Inactive']
            user_content = get_submitter_users()
            user_list = sorted(list(set(user[11] if user[11] else 'None' for user in user_content)))
            org_options = ['All'] + user_list
            return JsonResponse({
                'status_options': status_options,
                'org_options': org_options,
            })
        except Exception as e:
            logger.error("Error fetching options data: %s", e)
            return JsonResponse({'error': str(e)}, status=500)

    # Filters users based on status and organization
    def filter_submitter_users(self, users, status, payor_code):
        def _set_submitter_user(usr):
            return {
                'submitter_id': usr[0],
                'user_id': usr[1],
                'user_name': usr[2],
                'entity_name': usr[3] if usr[3] else 'None',
                'role_name': usr[4],
                'status': 'Active' if usr[5] else 'Inactive',
                'user_number': usr[6],
                'payor_code': usr[7],
                'role_id': usr[8],
                'user_email': usr[9],
                'notes': usr[10],
                'org_name': usr[11],
            }

        user_list = [_set_submitter_user(user) for user in users]

        if status != 'All':
            user_list = [user for user in user_list if user['status'] == status]

        if payor_code != 'All':
            user_list = [user for user in user_list if user['org_name'] == payor_code]

        return user_list
    
    # Retrieves a JSON object containing all users
    def get_view_users_json(self, user_content):
        context = {
            'page': [],
            'pagination_url_namespaces': 'administration:view_users'
        }

        def _set_user(usr):
            return {
                'submitter_id': usr['submitter_id'],
                'user_id': usr['user_id'],
                'user_name': usr['user_name'],
                'entity_name': usr['entity_name'],
                'role_name': usr['role_name'],
                'status': usr['status'],
                'user_number': usr['user_number'],
                # Show payor_code as org_name
                'payor_code': usr['org_name'],
                'role_id': usr['role_id'],
                'user_email': usr['user_email'],
                'notes': usr['notes'],
                'org_name': usr['org_name'],
                'view_link': f"/administration/view-user-details/{usr['user_id']}",
                'edit_link': f"/administration/edit-user/{usr['user_id']}",
            }

        for user in user_content:
            context['page'].append(_set_user(user))

        return context


class UpdateSubmitterUserView(APCDAdminAccessAPIMixin, BaseAPIView):

    # Error handling
    def _err_msg(self, resp):
        if hasattr(resp, 'pgerror'):
            return resp.pgerror
        if isinstance(resp, Exception):
            return str(resp)
        return None

    # Updates the table with user changes
    def put(self, request, user_number):
        data = json.loads(request.body)
        errors = []
        user_response = update_user(data)
        if self._err_msg(user_response):
            errors.append(self._err_msg(user_response))
        if len(errors) != 0:
            logger.debug(print(errors))
            return JsonResponse({'message': 'Cannot edit user'}, status=500)

        return JsonResponse({'message': 'User updated successfully'})
