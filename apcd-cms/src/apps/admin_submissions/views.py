from django.http import HttpResponseRedirect, JsonResponse
from django.core.paginator import Paginator
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_all_submissions_and_logs
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import title_case
import logging
from dateutil import parser

logger = logging.getLogger(__name__)

class AdminSubmissionsTable(TemplateView):

    template_name = 'list_admin_submissions.html'
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user): 
            return HttpResponseRedirect('/')
        return super(AdminSubmissionsTable, self).dispatch(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        if 'options' in request.path:
            return self.get_options(request)
        
        status = request.GET.get('status', 'All')
        sort = request.GET.get('sort', 'Newest Received')
        page_number = int(request.GET.get('page', 1))
        items_per_page = int(request.GET.get('limit', 50))
        try: 
            submission_content = get_all_submissions_and_logs()
            filtered_submissions = self.filtered_submissions(submission_content, status, sort)

            paginator = Paginator(filtered_submissions, items_per_page)
            page_info = paginator.get_page(page_number)

            context= self.get_view_submissions_json(list(page_info), selected_status=status, selected_sort=sort)
            context['page_num'] = page_info.number
            context['total_pages'] = paginator.num_pages
            return JsonResponse({'response': context})
        except Exception as e:
            logger.error("Error fetching filtered user data: %s", e)
            return JsonResponse({'error': str(e)}, status=500)

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

    def filtered_submissions(self, submission_content, status, sort):
        def getDate(submission):
            date = submission['received_timestamp']
            return parser.parse(date) if date is not None else parser.parse('1-1-3005')
        
        ## Initial API response sort
        submission_list = sorted(
            submission_content,
            key=lambda row: getDate(row),
            reverse=(sort == 'Newest Received')
        )
        if status != 'All':
            submission_list = [submission for submission in submission_content 
                            if submission['status'].lower() == status.lower()]
        ## Sorts filtered list 
        submission_list = sorted(
            submission_list,
            key=lambda row: getDate(row),
            reverse=(sort == 'Newest Received')
        )
        return submission_list
    
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
            'view_modal_content': submission['view_modal_content'],
            }
        for submission in submission_content:
            context['page'].append(_set_submissions(submission))

        return context
    
