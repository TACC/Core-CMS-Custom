from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_users
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import table_filter
from apps.components.paginator.paginator import paginator
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
                    'status': 'Active' if usr[8] else 'Inactive',
                    'user_number': usr[9],
                    'role_name': usr[10],
                    'org_name_no_parens': usr[4].replace("(", "").replace(")", ""),  # just for filtering purposes
                }

        context['header'] = ['User ID', 'Name', 'Organization', 'Role', 'Status', 'User Number', 'See More']
        context['status_options'] = ['All', 'Active', 'Inactive']
        context['filter_options'] = ['All']
        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1        
        table_entries = []
        for user in user_content:
            table_entries.append(_set_user(user,))
            org_name = user[4]
            if org_name not in context['filter_options']:  # prevent duplicates
                context['filter_options'].append(user[4])

        queryStr = ''
        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')

        context['selected_status'] = None
        if status_filter is not None and status_filter !='All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'
            table_entries = table_filter(status_filter, table_entries, 'status', False)



        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            queryStr += f'&org={org_filter}'
            table_entries = table_filter(org_filter.replace("(", "").replace(")",""), table_entries, 'org_name_no_parens')

        context['query_str'] = queryStr
        context.update(paginator(self.request, table_entries, 2))
        context['pagination_url_namespaces'] = 'administration:view_users'

        return context
