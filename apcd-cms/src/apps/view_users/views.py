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
        #if not request.user.is_authenticated or not is_apcd_admin(request.user):
           #return HttpResponseRedirect('/')
        return super(ViewUsersTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, user_content=user_content, *args, **kwargs):
        context = super(ViewUsersTable, self).get_context_data(*args, **kwargs)
        actions = 'View'

        user_content = [
            (
                6,
                3,
                'aw@heck.org',
                'Arnold Mathers',
                'UHC & Nop',
                'no create',
                'none update',
                'no notes',
                't',
                11,
                'submitter'

            ),
            (
                5,
                2,
                'aw@heck.org',
                'Jon Heck',
                't and (t)',
                'no create',
                'none update',
                'no notes',
                't',
                10,
                'submitter'

            ),
             (
                 5,
                 4,
                'aw@heck.org',
                'Penny Lago',
                'UHC',
                'no create',
                'none update',
                'no notes',
                't',
                9,
                'submitter'
            ),           
            
        ]



        def _set_user(usr):
            return {
                    'view_modal_content': _set_modal_content(usr),
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

        def _set_modal_content(usr):
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
        
        

        context['header'] = ['User ID', 'Name', 'Organization', 'Role', 'Active', 'Number', 'Action']
        context['rows'] = []
        for user in user_content:
            user_view = [usr for usr in user_content if usr[1] == user[0]]
            context['rows'].append(_set_user(user,))

        return context