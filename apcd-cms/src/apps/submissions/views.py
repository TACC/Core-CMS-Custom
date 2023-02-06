from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.views.generic import View
from requests.auth import HTTPBasicAuth
import logging
from django.views.generic.base import TemplateView
import rt
from apps.utils.apcd_database import get_submissions, get_submission_logs
from apps.utils.apcd_groups import is_apcd_admin
import datetime


logger = logging.getLogger(__name__)

RT_HOST = getattr(settings, 'RT_HOST', '')
RT_UN = getattr(settings, 'RT_UN', '')
RT_PW = getattr(settings, 'RT_PW', '')
RT_QUEUE = getattr(settings, 'RT_QUEUE', '')

class SubmissionsTable(TemplateView):

    template_name = 'list_submissions.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
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
                'status': submission[8],
                'outcome': submission[9],
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
                    'outcome': submission_log[5]
                })
            
            return modal_content


        context['header'] = ['Received','Submission ID', 'File Name', ' ', 'Outcome', 'Status', 'Last Updated', 'Actions']
        context['rows'] = [] 

        for submission in submission_content:
            submission_logs = get_submission_logs(submission[0])
            context['rows'].append(_set_submissions(submission, submission_logs))

        return context
