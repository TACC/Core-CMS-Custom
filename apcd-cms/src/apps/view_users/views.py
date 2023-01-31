from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_users
from apps.utils.apcd_groups import is_apcd_admin
import logging

logger = logging.getLogger(__name__)


class ViewUsersTable(TemplateView):
    template_name = 'view_users.html'
    user_content = get_users()

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
           return HttpResponseRedirect('/')
        return super(ViewUsersTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):
        context = super(ViewUsersTable, self).get_context_data(*args, **kwargs)
        actions = 'View'
        import datetime
        user_content = get_users()




        def _set_user(usr):
            return {
                    'user_id': usr[0],
                    'user_email': usr[1],
                    'user_name': usr[2],
                    'org_name': usr[3],
                    'role_id': usr[4],
                    'created_at': usr[5],
                    'updated_at': usr[6],
                    'notes': usr[7],
                    
                }

        def _set_modal_content(usr):
            return {
                'notes': usr[7],
                
            }
        
        

        context['header'] = ['User ID', 'Email', 'Name', 'Organization', 'RoleId', 'Created', 'Updated', 'Notes']
        context['rows'] = []
        for user in user_content:
            user_view = [usr for usr in user_content if usr[1] == user[0]]
            context['rows'].append(_set_user(user,))

        return context