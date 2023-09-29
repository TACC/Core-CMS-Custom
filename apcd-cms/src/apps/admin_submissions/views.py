from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_all_submissions_and_logs, get_api_submissions
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import title_case, table_filter
from apps.components.paginator.custom_api_paginator import paginator
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
        """
        Important notes:
            queryStr: must always be set in order for paginator.html to maintain status across a new page selection
            custom_api_paginator.paginator: only pages one page, total items are also pages, which allows paginator to work correctly
        """

        context = super(AdminSubmissionsTable, self).get_context_data(*args, **kwargs)

        queryStr = ''
        dateSort = self.request.GET.get('sort')
        status_filter = self.request.GET.get('status')
        print(f"Status is: {status_filter}, dateSort is: {dateSort}")

        if dateSort is not None:
            context['selected_sort'] = dateSort
            queryStr += f'&order={dateSort}'

        context['selected_status'] = None
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        limit = 5
        api_content = get_api_submissions(page_num, limit, status_filter, dateSort )

        print(f"API Content: Total Items Found: {api_content['total_count']} -- "
              f"API Total Pages: {api_content['total_pages']} -- "
              f"API Current Page: {api_content['current_page']} -- "
              f"API Current Count: {api_content['current_count']}")

        # modifies the object fields for display, only modifies a subset of entries that will be displayed
        # on the current page using offset and limit
        # for s in submission_content[offset:offset + limit]:
        #     s['status'] = title_case(s['status'])
        #     s['outcome'] = title_case(s['outcome'])
        #     s['received_timestamp'] = parser.parse(s['received_timestamp']) if s['received_timestamp'] else None
        #     s['updated_at'] = parser.parse(s['updated_at']) if s['updated_at'] else None
        #     s['view_modal_content'] = [{
        #         **t,
        #         'outcome': title_case(t['outcome'])
        #     } for t in (s['view_modal_content'] or [])]

        context['header'] = ['Received', 'Organization', 'File Name', ' ', 'Outcome', 'Status', 'Last Updated', 'Actions']
        context['filter_options'] = ['All', 'In Process', 'Complete']
        context['sort_options'] = {'desc': 'Newest Received', 'asc': 'Oldest Received'}

        context['query_str'] = queryStr
        print(f"Query String is: {queryStr}")
        context.update(paginator(self.request, api_content, limit))

        context['pagination_url_namespaces'] = 'admin_submission:admin_submissions'
        return context
