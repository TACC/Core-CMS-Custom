from django.http import JsonResponse, Http404, HttpResponse
from django.core.paginator import Paginator
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_all_submissions_and_logs, get_user_submission_log
from apps.utils.utils import title_case
from apps.base.base import BaseAPIView, APCDAdminAccessAPIMixin, APCDAdminAccessTemplateMixin
import logging
from dateutil import parser

logger = logging.getLogger(__name__)


class AdminSubmissionsTable(APCDAdminAccessTemplateMixin, TemplateView):
    template_name = 'list_admin_submissions.html'


class AdminSubmissionsApi(APCDAdminAccessAPIMixin, BaseAPIView):
  
    def get(self, request, *args, **kwargs):
        if 'options' in request.path:
            return self.get_options(request)
        if 'view_log' in request.path:
            return SubmissionsLogView.get_log(request, is_admin=True)
        
        status = request.GET.get('status', 'In Process')
        sort = request.GET.get('sort', 'Newest Received')
        submitter_id = request.GET.get('submitterId', 'All')
        payor_code = request.GET.get('payorCode', 'All')
        page_number = int(request.GET.get('page', 1))
        items_per_page = int(request.GET.get('limit', 50))
        submission_content = get_all_submissions_and_logs()
        filtered_submissions = self.filtered_submissions(submission_content, status, sort, submitter_id, payor_code)

        paginator = Paginator(filtered_submissions, items_per_page)
        page_info = paginator.get_page(page_number)

        context = self.get_view_submissions_json(list(page_info), selected_status=status, selected_sort=sort)
        context['page_num'] = page_info.number
        context['total_pages'] = paginator.num_pages
        return JsonResponse({'response': context})

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(self.get_view_submissions_json(get_all_submissions_and_logs()))
        return context

    def get_options(self, request):
        try:
            status_options = ['All', 'In Process', 'Complete']            
            sort_options = [ {'name': 'Newest Received', 'value': 'newDate'},
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
    
    def get_view_submissions_json(self, submission_content, selected_status='All', selected_sort='Newest Received'):
        context = {
            'page': [],
            'selected_status': selected_status,
            'selected_sort': selected_sort,
            'pagination_url_namespaces':'admin_submission:admin_submissions'
        }
        
        def _set_submissions(submission):
            return {
            'submission_id': submission['submission_id'],
            'status': submission['status'],
            'entity_name': submission['entity_name'],
            'file_name': submission['file_name'],
            'outcome': title_case(submission['outcome']) if submission['outcome'] else None,
            'received_timestamp': submission['received_timestamp'],
            'updated_at': submission['updated_at'],
            'payor_code': submission['payor_code'],
            'org_name': submission['org_name'],
            'view_modal_content': submission['view_modal_content'],
            }
        for submission in submission_content:
            context['page'].append(_set_submissions(submission))

        return context
    

class SubmissionsLogView():
    @classmethod
    def get_required_param(cls, request, param_name, default=None):
        value = request.GET.get(param_name, default)
        if value is None:
            raise Http404(f"Missing required query parameter: {param_name}")
        return value

    @classmethod
    def get_log(cls, request, is_admin=False):
        try:
            log_type = SubmissionsLogView.get_required_param(request, 'log_type', default='html')
            log_id = SubmissionsLogView.get_required_param(request, 'log_id')

            user = None if is_admin else request.user.username
            results = get_user_submission_log(log_id, log_type, user)
            if not results:
                raise Http404("Log not found or empty.")

            file_path = results[0][1]
            file_name = file_path.split('/')[-1] if '/' in file_path else file_path

            content_types = {
                'html': "text/html",
            }

            if log_type not in content_types:
                raise Http404("Unsupported log type requested.")
        
            response = HttpResponse(str(results[0][0]), content_type=content_types[log_type])
            response['Content-Disposition'] = f'attachment; filename="{file_name}"'
            return response

        except Http404 as e:
            logger.warning("Log not found or unsupported log type: %s", e)
            raise
        except Exception as e:
            logger.error("Error fetching log data: %s", e)
            return JsonResponse({'error': 'Internal error fetching log.'}, status=500)