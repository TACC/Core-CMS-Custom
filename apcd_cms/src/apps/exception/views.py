from django.http import HttpResponseRedirect, JsonResponse
from django.views.generic import TemplateView
from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from apps.base.base import BaseAPIView, APCDGroupAccessAPIMixin
import logging
import json

logger = logging.getLogger(__name__)


class ExceptionFormTemplate(TemplateView):
    template_name = 'exception_submission_form.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(ExceptionFormTemplate, self).dispatch(request, *args, **kwargs)


class ExceptionFormApi(APCDGroupAccessAPIMixin, BaseAPIView):

    def post(self, request):
        form = json.loads(request.body)
        exception_type = form['exceptionType']
        if exception_type == 'threshold':
            exceptions = form['exceptions']
            errors = []
            submitters = apcd_database.get_submitter_info(request.user.username)
            for exception in exceptions:
                submitter = next(submitter for submitter in submitters if int(submitter[0] == int(exception['businessName'])))
                exception_response = apcd_database.create_threshold_exception(form, exception, submitter)
            if exception_response:
                errors.append(exception_response)
            if errors:
                return JsonResponse({'status': 'error', 'errors': errors}, status=500)
            return JsonResponse({'status': 'success'}, status=200)
        
        if exception_type == 'other':
            errors = []
            submitters = apcd_database.get_submitter_info(request.user.username)
            submitter = next(submitter for submitter in submitters if int(submitter[0] == int(form['otherExceptionBusinessName'])))
            other_exception_response = apcd_database.create_other_exception(form, submitter)
            if other_exception_response:
                errors.append(other_exception_response)
            if errors:
                return JsonResponse({'status': 'error', 'errors': errors}, status=500)
            return JsonResponse({'status': 'success'}, status=200)
