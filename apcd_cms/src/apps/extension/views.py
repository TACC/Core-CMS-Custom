from django.http import JsonResponse
from django.views.generic.base import TemplateView
from apps.utils import apcd_database
from apps.base.base import BaseAPIView, APCDGroupAccessAPIMixin, APCDGroupAccessTemplateMixin
import logging
import json

logger = logging.getLogger(__name__)


class ExtensionFormTemplate(APCDGroupAccessTemplateMixin, TemplateView):
    template_name = 'extension_submission_form/extension_submission_form.html'


class ExtensionFormApi(APCDGroupAccessAPIMixin, BaseAPIView):

    def post(self, request):
        """
        Handle form submission and return JSON response for success/failure
        """
        form = json.loads(request.body)
        extensions = form['extensions']
        errors = []
        submitters = apcd_database.get_submitter_info(request.user.username)
        for extension in extensions:
            submitter = next(submitter for submitter in submitters if int(submitter[0] == int(extension['businessName'])))
            exten_resp = apcd_database.create_extension(form, extension, submitter)
            if self._err_msg(exten_resp):
                errors.append(self._err_msg(exten_resp))

        # Return success or error as JSON
        if errors:
            logger.error("Extension request failed. Errors: %s", errors)
            return JsonResponse({'status': 'error', 'errors': errors}, status=400)
        else:
            return JsonResponse({'status': 'success'}, status=200)

    def _err_msg(self, resp):
        """
        Helper function to extract error messages
        """
        if hasattr(resp, 'pgerror'):
            return resp.pgerror
        if isinstance(resp, Exception):
            return str(resp)
        return None
