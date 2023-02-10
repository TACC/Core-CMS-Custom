from django.http import HttpResponseRedirect
from django.core.paginator import Paginator, EmptyPage
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_submission_logs, get_all_submissions
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import title_case
import logging

logger = logging.getLogger(__name__)

class AdminSubmissionsTable(TemplateView):

    template_name = 'list_admin_submissions.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user): 
            return HttpResponseRedirect('/')
        return super(AdminSubmissionsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):

        context = super(AdminSubmissionsTable, self).get_context_data(*args, **kwargs)

        submission_content = get_all_submissions()

        def _set_submissions(submission, submission_logs):
            return {
                'submission_id': submission[0],
                'apcd_id': submission[1],
                'submitter_id': submission[2],
                'file_name': submission[3],
                'status': title_case(submission[4]),
                'outcome': title_case(submission[5]),
                'received_timestamp': submission[6],
                'updated_at': submission[7],
                'org_name': submission[8],
                'view_modal_content': _set_submission_logs(submission_logs)
            }

        def _set_submission_logs(submission_logs):

            modal_content = []
            for submission_log in submission_logs:
                modal_content.append({
                    'log_id': submission_log[0],
                    'submitter_id': submission_log[1],
                    'file_type': submission_log[2],
                    'validation_suite': submission_log[3],
                    'outcome': title_case(submission_log[5]),
                    'file_type_name': submission_log[6]
                })
            
            return modal_content


        context['header'] = ['Received', 'Organization', 'File Name', ' ', 'Outcome', 'Status', 'Last Updated', 'Actions']
        context['rows'] = [] 
        submission_with_logs = []

        for submission in submission_content:
            submission_logs = get_submission_logs(submission[0])
            submission_with_logs.append(_set_submissions(submission, submission_logs))

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        p = Paginator(submission_with_logs, 50)

        try:
            page = p.page(page_num)
        except EmptyPage:
            page = p.page(1)

        context['page'] = page
        context['page_num'] = int(page_num)

        return context
