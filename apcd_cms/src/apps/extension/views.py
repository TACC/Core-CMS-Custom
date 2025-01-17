from django.http import JsonResponse, HttpResponseRedirect
from django.views.generic.base import TemplateView
from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from apps.utils.utils import title_case
from datetime import datetime
import logging
import json

logger = logging.getLogger(__name__)


class ExtensionFormView(TemplateView):

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(ExtensionFormView, self).dispatch(request, *args, **kwargs)


    def post(self, request):
        """
        Handle form submission and return JSON response for success/failure
        """
        if request.user.is_authenticated and has_apcd_group(request.user):
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
        else:
            return HttpResponseRedirect('/')

    def _err_msg(self, resp):
        """
        Helper function to extract error messages
        """
        if hasattr(resp, 'pgerror'):
            return resp.pgerror
        if isinstance(resp, Exception):
            return str(resp)
        return None