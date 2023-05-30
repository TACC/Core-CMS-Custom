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

        filter = self.request.GET.get('filter')
        dateSort = self.request.GET.get('sort')

        def getDate(row):
            date = row['received_timestamp']
            return parser.parse(date) if date is not None else parser.parse('1-1-3005') # put 'None' date entries all together at top/bottom depending on direction of sort

        if dateSort is not None:
            context['selected_sort'] = dateSort
            submission_content = sorted(submission_content, key=lambda row:getDate(row), reverse=(dateSort == 'newDate'))

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        context['selected_filter'] = None
        if filter is not None and filter != 'All':
            context['selected_filter'] = filter
            submission_content = table_filter(filter, submission_content, 'status')

        limit = 50
        offset = limit * (page_num - 1)

        # modifies the object fields for display, only modifies a subset of entries that will be displayed 
        # on the current page using offset and limit
        for s in submission_content[offset:offset + limit]:
            s['status'] = title_case(s['status'])
            s['outcome'] = title_case(s['outcome'])
            s['received_timestamp'] = parser.parse(s['received_timestamp']) if s['received_timestamp'] else None
            s['updated_at'] = parser.parse(s['updated_at']) if s['updated_at'] else None
            s['view_modal_content'] = [{
                **t,
                'outcome': title_case(t['outcome'])
            } for t in (s['view_modal_content'] or [])]

        context['header'] = ['Received', 'Organization', 'File Name', ' ', 'Outcome', 'Status', 'Last Updated', 'Actions']
        context['filter_options'] = ['All', 'In Process', 'Complete']
        context['sort_options'] = {'newDate': 'Newest Received', 'oldDate': 'Oldest Received'}

        queryStr = '?'
        if len(self.request.META['QUERY_STRING']) > 0:
            queryStr = queryStr + self.request.META['QUERY_STRING'].replace(f'page={page_num}', '') + ('&' if self.request.GET.get('page') is None else '')
        context['query_str'] = queryStr
        context.update(paginator(self.request, submission_content, limit))
        context['pagination_url_namespaces'] = 'admin_submission:admin_submissions'
        return context
