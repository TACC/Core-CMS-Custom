from django.http import JsonResponse
from django.views.generic import TemplateView
from apps.utils import apcd_database
from apps.base.base import BaseAPIView, APCDGroupAccessAPIMixin, APCDGroupAccessTemplateMixin
import logging
import json

logger = logging.getLogger(__name__)


class ExceptionFormTemplate(APCDGroupAccessTemplateMixin, TemplateView):
    template_name = 'exception_submission_form.html'


class ExceptionFormApi(APCDGroupAccessAPIMixin, BaseAPIView):

    def post(self, request):
        form = json.loads(request.body)
        errors = []
        exception_type = form['exceptionType'].lower()
        # Though type other exceptions don't have the need to submit multiple exception requests in one form,
        # passing in exceptions object so the shared functionality of formik form fields can be used on 
        # the front end for both threshold and other exceptions for validation schemas
        exceptions = form['exceptions']
        if exception_type == 'threshold':
            submitters = apcd_database.get_submitter_info(request.user.username)
            for exception in exceptions:
                submitter = next(submitter for submitter in submitters if int(submitter[0] == int(exception['businessName'])))
                exception_response = apcd_database.create_threshold_exception(form, exception, submitter)
                if self._err_msg(exception_response):
                    errors.append(self._err_msg(exception_response))
            if len(errors) != 0:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Failed to process exceptions',
                    'errors': errors, # Will display in response what field failed to post in DB
                    'code': 'THRESHOLD_EXCEPTION_DB_ERROR'
                }, status=500)
            return JsonResponse({'status': 'success', 'message': 'Exception submission successful'}, status=200)
        
        if exception_type == 'other':
            submitters = apcd_database.get_submitter_info(request.user.username)
            for exception in exceptions:
                submitter = next(submitter for submitter in submitters if int(submitter[0] == int(exception['businessName'])))
                other_exception_response = apcd_database.create_other_exception(form, exception, submitter)
                if self._err_msg(other_exception_response):
                    errors.append(self._err_msg(other_exception_response))
            if len(errors) != 0:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Failed to process exceptions',
                    'errors': errors, # Will display in response what field failed to post in DB
                    'code': 'OTHER_EXCEPTION_DB_ERROR'
                }, status=500)
            return JsonResponse({'status': 'success', 'message': 'Exception submission successful'}, status=200)
        
    def _err_msg(self, resp):
        if hasattr(resp, 'pgerror'):
            return resp.pgerror
        if isinstance(resp, Exception):
            return str(resp)
        return None
