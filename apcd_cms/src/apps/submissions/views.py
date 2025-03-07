from django.http import JsonResponse
from django.views.generic.base import TemplateView, View
from django.contrib.auth.decorators import login_required
from apps.utils.apcd_database import get_user_submissions_and_logs
from apps.utils.apcd_groups import has_apcd_group
from apps.utils.utils import title_case
from apps.admin_submissions.views import SubmissionsLogView
from apps.base.base import BaseAPIView, APCDGroupAccessAPIMixin, APCDGroupAccessTemplateMixin
from django.core.paginator import Paginator
import logging
from dateutil import parser

logger = logging.getLogger(__name__)


class SubmissionsTable(APCDGroupAccessTemplateMixin, TemplateView):
    template_name = 'list_submissions.html'


class SubmissionsView(APCDGroupAccessAPIMixin, BaseAPIView):

    def get(self, request, *args, **kwargs):
        if 'options' in request.path:
            return self.get_options(request)
        if 'view_log' in request.path:
            return SubmissionsLogView.get_log(request)

        status = request.GET.get('status', 'All')
        sort = request.GET.get('sort', 'Newest Received')
        submitter_id = request.GET.get('submitterId', 'All')
        payor_code = request.GET.get('payorCode', 'All')
        page_number = int(request.GET.get('page', 1))
        items_per_page = int(request.GET.get('limit', 50))

        submission_content = get_user_submissions_and_logs(request.user.username)
        filtered_submissions = self.filtered_submissions(submission_content, status, sort, submitter_id, payor_code)

        paginator = Paginator(filtered_submissions, items_per_page)
        page_info = paginator.get_page(page_number)
        context = self.get_view_submissions_json(list(page_info), selected_status=status, selected_sort=sort)
        context['page_num'] = page_info.number
        context['total_pages'] = paginator.num_pages
        return JsonResponse({'response': context})

    def get_options(self, request):
        try:
            status_options = ['All', 'In Process', 'Complete']            
            sort_options = [{'name': 'Newest Received', 'value': 'newDate'},
                            {'name': 'Oldest Received', 'value': 'oldDate'}]

            return JsonResponse({
                'status_options': status_options,
                'sort_options': sort_options,
            })
        except Exception as e:
            logger.error("Error fetching options data: %s", e)
            return JsonResponse({'error': str(e)}, status=500)

    def filtered_submissions(self, submission_content, status, sort, submitter_id, payor_code):
        def getDate(submission):
            date = submission['received_timestamp']
            return parser.parse(date) if date is not None else parser.parse('1-1-3005')
        
        if status != 'All':
            submission_content = [submission for submission in submission_content
                                  if submission['status'].lower() == status.lower()]
            
        if submitter_id != 'All':
            submission_content = [submission for submission in submission_content
                                  if submission['submitter_id'] == int(submitter_id)]
        if payor_code != 'All':
            submission_content = [submission for submission in submission_content
                                  if submission['payor_code'] == int(payor_code)]
        submission_content = sorted(
            submission_content,
            key=lambda row: getDate(row),
            reverse=(sort == 'Newest Received')
        )
        return submission_content
    
    def get_view_submissions_json(self, submission_content, selected_status='All', selected_sort='Newest Received', submission_id='All', payor_code='All'):
        context = {
            'page': [],
            'selected_status': selected_status,
            'selected_sort': selected_sort,
            'pagination_url_namespaces':'submissions:list_submissions'
        }
        
        def _set_submissions(submission):
            return {
                'submission_id': submission['submission_id'],
                'submitter_id': submission['submitter_id'],
                'file_name': submission['file_name'],
                'status': submission['status'],
                'outcome': title_case(submission['outcome']) if submission['outcome'] else None,
                'received_timestamp': submission['received_timestamp'],
                'updated_at': submission['updated_at'],
                'payor_code': submission['payor_code'],
                'org_name': submission['org_name'],
                'entity_name': submission['entity_name'],
                'view_modal_content': submission['view_modal_content'],
            }
        for submission in submission_content:
            context['page'].append(_set_submissions(submission))

        return context


@login_required
def check_submitter_role(request):
    logger.info("Checking submitter access for user: %s", request.user.username)

    return JsonResponse({"is_submitter": has_apcd_group(request.user)})
