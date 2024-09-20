from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_all_submissions_and_logs
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import title_case, table_filter
from apps.components.paginator.paginator import paginator
import logging
from dateutil import parser

logger = logging.getLogger(__name__)

class AdminSubmissionsTable(TemplateView):

    template_name = 'list_admin_submissions.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user): 
            return HttpResponseRedirect('/')
        return super(AdminSubmissionsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):

        context = super(AdminSubmissionsTable, self).get_context_data(*args, **kwargs)

        submission_content = get_all_submissions_and_logs()

        context['status_options'] = ['All']
        for i in submission_content: 
            status = title_case(i['status']) if i['status'] else 'None'
            if status not in context['status_options']:
                context['status_options'].append(status)
        context['status_options'] = sorted(context['status_options'], key=lambda x: (x != 'All', x is None, x if x is not None else ''))

        queryStr = ''
        dateSort = self.request.GET.get('sort')
        status_filter = self.request.GET.get('status')

        def getDate(row):
            date = row['received_timestamp']
            return parser.parse(date) if date is not None else parser.parse('1-1-3005') # put 'None' date entries all together at top/bottom depending on direction of sort

        if dateSort is not None:
            context['selected_sort'] = dateSort
            queryStr += f'&sort={dateSort}'
            submission_content = sorted(submission_content, key=lambda row:getDate(row), reverse=(dateSort == 'newDate'))

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        context['selected_status'] = 'All'
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'
            submission_content = table_filter(status_filter, submission_content, 'status')

        limit = 50
        offset = limit * (page_num - 1)

        # modifies the object fields for display, only modifies a subset of entries that will be displayed 
        # on the current page using offset and limit
        for s in submission_content[offset:offset + limit]:
            s['status'] = title_case(s['status']) if s['status'] else None
            s['entity_name'] = title_case(s['entity_name']) if s['entity_name'] else None
            s['outcome'] = title_case(s['outcome']) if s['outcome'] else None
            s['received_timestamp'] = parser.parse(s['received_timestamp']) if s['received_timestamp'] else None
            s['updated_at'] = parser.parse(s['updated_at']) if s['updated_at'] else None
            s['view_modal_content'] = [{
                **t,
                'outcome': title_case(t['outcome']) if t['outcome'] else None
            } for t in (s['view_modal_content'] or [])]

        context['header'] = ['Received', 'Entity Organization', 'File Name', ' ', 'Outcome', 'Status', 'Last Updated', 'Actions']
        context['filter_options'] = ['All', 'In Process', 'Complete']
        context['sort_options'] = {'newDate': 'Newest Received', 'oldDate': 'Oldest Received'}

        context['query_str'] = queryStr
        context.update(paginator(self.request, submission_content, limit))
        context['pagination_url_namespaces'] = 'admin_submission:admin_submissions'
        return context
