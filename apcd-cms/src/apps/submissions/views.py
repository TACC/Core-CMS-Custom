from django.http import HttpResponseRedirect, JsonResponse
#from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required
#from apps.utils.apcd_database import get_submissions, get_submission_logs
from apps.utils.apcd_groups import has_apcd_group
#from apps.utils.utils import title_case
import logging

logger = logging.getLogger(__name__)


class SubmissionsTable(TemplateView):

    template_name = 'list_submissions.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(SubmissionsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):

        context = super(SubmissionsTable, self).get_context_data(*args, **kwargs)

        user = self.request.user.username

        submission_content = get_submissions(user)

        def _set_submissions(submission, submission_logs):
            return {
                'received_timestamp': submission[4],
                'submission_id': submission[0],
                'submitter_id': submission[2],
                'file_name': submission[3],
                'status': title_case(submission[8]),
                'outcome': title_case(submission[9]),
                'updated_at': submission[14],
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

        context['header'] = ['Received', 'File Name', ' ', 'Outcome', 'Status', 'Last Updated', 'Actions']
        context['rows'] = []

        for submission in submission_content:
            submission_logs = get_submission_logs(submission[0])
            context['rows'].append(_set_submissions(submission, submission_logs))

        return context


@login_required
def check_submitter_role(request):
    logger.info("Checking submitter access for user: %s", request.user.username)

    return JsonResponse({"is_submitter": has_apcd_group(request.user)})
