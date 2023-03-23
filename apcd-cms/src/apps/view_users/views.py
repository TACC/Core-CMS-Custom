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

    def get_context_data(self, user_content=user_content, *args, **kwargs):
        context = super(ViewUsersTable, self).get_context_data(*args, **kwargs)

        def _set_user(usr):
            return {
                   
                    'role_id': usr[0],
                    'user_id': usr[1],
                    'user_email': usr[2],
                    'user_name': usr[3],
                    'org_name': usr[4],
                    'created_at': usr[5],
                    'updated_at': usr[6],
                    'notes': usr[7],
                    'active': usr[8],
                    'user_number': usr[9],
                    'role_name': usr[10],
                }



        context['header'] = ['User ID', 'Name', 'Organization', 'Role', 'Active', 'User Number', 'See More']
        context['rows'] = []
        for user in user_content:
            context['rows'].append(_set_user(user,))

        return context
