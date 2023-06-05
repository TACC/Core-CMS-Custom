from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_users
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import table_filter
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

        user_content = [
            (
                6,
                4,
                'Rob@arby.org',
                'Robert Smith',
                'UGT',
                '10/22/33',
                '11/22/23',
                'notes here',
                True,
                7,
                'submitter'

                    ),
        (
         6,
         4,
         'simon@arby.org',
         'Simon Gallup',
         'Dunstreet',
         '10/22/33',
         '11/22/23',
         'notes here',
         False,
         2,
         'admin'
 
     ),
     (
         6,
         4,
         'rog@arby.org',
         'Roger ODonnel',
         'Dunstreet',
         '10/22/33',
         '11/22/23',
         'notes here',
         True,
         3,
         'submitter'
 
     ),
     (
         6,
         4,
         'jace@arby.org',
         'Jason Cooper',
         'UGT',
         '10/22/33',
         '11/22/23',
         'notes here',
         False,
         6,
         'admin'
 
     ),
     (
         6,
         4,
         'rere@arby.org',
         'Reeves Gabrels',
         'P',
         '10/22/33',
         '11/22/23',
         'notes here',
         False,
         5,
         'admin'
 
     ),
 
        ]
        
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
                    'status': 'Active' if usr[8] else 'Inactive',
                    'user_number': usr[9],
                    'role_name': usr[10],
                    'org_name_no_parens': usr[4].replace("(", "").replace(")", ""),  # just for filtering purposes
                }

        context['header'] = ['User ID', 'Name', 'Organization', 'Role', 'Status', 'User Number', 'See More']
        context['rows'] = []
        context['filter_options'] = ['All']
        table_entries = []
        for user in user_content:
            table_entries.append(_set_user(user,))
            context['filter_options'].append(user[4])

        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')

        context['selected_status'] = None
        if status_filter is not None and status_filter !='All':
            context['selected_status'] = status_filter
            table_entries = table_filter(status_filter, table_entries, 'status')



        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            table_entries = table_filter(org_filter.replace("(", "").replace(")",""), table_entries, 'org_name_no_parens')

        context['rows'] = table_entries

        return context
