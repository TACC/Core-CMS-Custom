from django.http import HttpResponseRedirect, JsonResponse
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

    def get(self, request, *args, **kwargs):
        submission_content = get_all_submissions_and_logs()
        context = self.get_submission_list_json(submission_content, *args, **kwargs)

        return JsonResponse({'response': context})


    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user): 
            return HttpResponseRedirect('/')
        return super(AdminSubmissionsTable, self).dispatch(request, *args, **kwargs)

    def get_submission_list_json(self, submission_content, *args, **kwargs):

        context = {}
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
            s['status'] = title_case(s['status'])
            s['entity_name'] = title_case(s['entity_name'])
            s['outcome'] = title_case(s['outcome'])
            s['received_timestamp'] = parser.parse(s['received_timestamp']) if s['received_timestamp'] else None
            s['updated_at'] = parser.parse(s['updated_at']) if s['updated_at'] else None
            s['view_modal_content'] = [{
                **t,
                'outcome': title_case(t['outcome'])
            } for t in (s['view_modal_content'] or [])]

        context['header'] = ['Received', 'Entity Organization', 'File Name', 'Outcome', 'Status', 'Last Updated', 'Actions']
        context['status_options'] = ['All', 'In Process', 'Complete']
        context['sort_options'] = [
            {'name': '', 'value': ''},
            {'name': 'Newest Received', 'value': 'newDate'},
            {'name': 'Oldest Received', 'value': 'oldDate'}
        ]

        context['query_str'] = queryStr
        page_info = paginator(self.request, submission_content, limit)

        context['page'] = [{
            'submission_id': obj['submission_id'],
            'status': obj['status'],
            'entity_name': obj['entity_name'],
            'file_name': obj['file_name'],
            'outcome': obj['outcome'],
            'received_timestamp': obj['received_timestamp'],
            'updated_at': obj['updated_at'],
            'view_modal_content': obj['view_modal_content'],
        } for obj in page_info['page']]

        context['page_num'] = page_num
        context['total_pages'] = page_info['page'].paginator.num_pages

        context['pagination_url_namespaces'] = 'admin_submission:admin_submissions'
        return context
