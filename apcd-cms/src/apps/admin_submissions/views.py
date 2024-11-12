from django.http import HttpResponseRedirect, JsonResponse
from django.core.paginator import Paginator
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_all_submissions_and_logs
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import title_case
from django.template import loader
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
        if 'modal' in request.path:
            return self.get_modals(request, kwargs['modal_type'])
        
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
    
    def get_modals(self, request, modal_type):
        if modal_type == 'view':
            modal_template = 'view_users_modal.html'
        else:
            return JsonResponse({'error': 'Invalid modal type'}, status=400)
        
        modal_content = loader.render_to_string(modal_template)
        return JsonResponse({'content': modal_content})

    def filtered_submissions(self, submission_content, status, sort):
        def getDate(submission):
            date = submission['received_timestamp']
            return parser.parse(date) if date is not None else parser.parse('1-1-3005')
        # Filter by status if not 'All'
        if status != 'All':
            submission_list = [submission for submission in submission_content 
                            if submission['status'].lower() == status.lower()]
        
        # Sort submissions
        submission_list = sorted(
            submission_content,
            key=lambda row: getDate(row),
            reverse=(sort == 'Newest Received')
        )
        return submission_list

        #context['selected_status'] = 'All'
        #if status_filter is not None and status_filter != 'All':
        #    context['selected_status'] = status_filter
        #    queryStr += f'&status={status_filter}'
        #    submission_content = table_filter(status_filter, submission_content, 'status')

        #limit = 50
        #offset = limit * (page_num - 1)

        ## modifies the object fields for display, only modifies a subset of entries that will be displayed 
        ## on the current page using offset and limit
        #for s in submission_content[offset:offset + limit]:
        #    s['status'] = title_case(s['status'])
        #    s['entity_name'] = title_case(s['entity_name'])
        #    s['outcome'] = title_case(s['outcome'])
        #    s['received_timestamp'] = parser.parse(s['received_timestamp']) if s['received_timestamp'] else None
        #    s['updated_at'] = parser.parse(s['updated_at']) if s['updated_at'] else None
        #    s['view_modal_content'] = [{
        #        **t,
        #        'outcome': title_case(t['outcome'])
        #    } for t in (s['view_modal_content'] or [])]

        #context['header'] = ['Received', 'Entity Organization', 'File Name', 'Outcome', 'Status', 'Last Updated', 'Actions']
        #context['status_options'] = ['All', 'In Process', 'Complete']
        #context['sort_options'] = [
        #    {'name': '', 'value': ''},
        #    {'name': 'Newest Received', 'value': 'newDate'},
        #    {'name': 'Oldest Received', 'value': 'oldDate'}
        #]

        #context['query_str'] = queryStr
        #page_info = paginator(self.request, submission_content, limit)

        #context['page'] = [{
        #    'submission_id': obj['submission_id'],
        #    'status': obj['status'],
        #    'entity_name': obj['entity_name'],
        #    'file_name': obj['file_name'],
        #    'outcome': obj['outcome'],
        #    'received_timestamp': obj['received_timestamp'],
        #    'updated_at': obj['updated_at'],
        #    'view_modal_content': obj['view_modal_content'],
        #} for obj in page_info['page']]

        #context['page_num'] = page_num
        #context['total_pages'] = page_info['page'].paginator.num_pages

        #context['pagination_url_namespaces'] = 'admin_submission:admin_submissions'
        #return context
    
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
    
