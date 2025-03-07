from django.core.paginator import Paginator
from django.http import JsonResponse
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_users, update_user
from apps.base.base import BaseAPIView, APCDAdminAccessAPIMixin, APCDAdminAccessTemplateMixin
import logging
import json

logger = logging.getLogger(__name__)


class ViewUsersTable(APCDAdminAccessTemplateMixin, TemplateView):
    template_name = 'view_users.html'


class ViewUsersApi(APCDAdminAccessAPIMixin, BaseAPIView):

    def get(self, request, *args, **kwargs):
        if 'options' in request.path:
            return self.get_options(request)
        
        status = request.GET.get('status', 'Active')
        org = request.GET.get('org', 'All')
        page_number = int(request.GET.get('page', 1))
        items_per_page = int(request.GET.get('limit', 50))

        try:
            user_content = get_users()
            filtered_users = self.filter_users(user_content, status, org)

            paginator = Paginator(filtered_users, items_per_page)
            page_info = paginator.get_page(page_number)

            context = self.get_view_users_json(list(page_info), selected_status=status, selected_org=org)
            context['page_num'] = page_info.number
            context['total_pages'] = paginator.num_pages

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
            user_content = get_users()
            user_list = sorted(list(set(user[4] if user[4] else 'None' for user in user_content)))
            org_options = ['All'] + user_list
            return JsonResponse({
                'status_options': status_options,
                'org_options': org_options
            })
        except Exception as e:
            logger.error("Error fetching options data: %s", e)
            return JsonResponse({'error': str(e)}, status=500)

    def filter_users(self, users, status, org):
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
            }

        user_list = [_set_user(user) for user in users]

        if status != 'All':
            user_list = [user for user in user_list if user['status'] == status]

        if org != 'All':
            org_no_parens = org.replace("(", "").replace(")", "")
            user_list = [user for user in user_list if user['entity_name_no_parens'] == org_no_parens]

        return user_list
    
    def get_view_users_json(self, user_content, selected_status='All', selected_org='All'):
        context = {
            'page': [],
            'selected_status': selected_status,
            'selected_org': selected_org,
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


class UpdateUserView(APCDAdminAccessAPIMixin, BaseAPIView):

    def _err_msg(self, resp):
        if hasattr(resp, 'pgerror'):
            return resp.pgerror
        if isinstance(resp, Exception):
            return str(resp)
        return None

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
