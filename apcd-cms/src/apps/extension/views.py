from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.views.generic import View
import logging

logger = logging.getLogger(__name__)

class ExtensionFormView(View):
    submitter = apcd_database.get_submitter_for_extend_or_except()
    def get(self, request):
        if (request.user.is_authenticated and has_apcd_group(request.user)):
            template = loader.get_template('extension_submission_form/extension_submission_form.html')
            return HttpResponse(template.render({}, request))
        return HttpResponseRedirect('/')
   
    def get_context_data(self, submitter=submitter, *args, **kwargs):
            context = super(ExtensionFormView, self).get_context_data(*args, **kwargs)

            def _set_submitter(sub):
                return {
                    "submitter_id": sub[0],
                    "submitter_code": sub[1],
                    "payor_code": sub[2],
                    "user_name": sub[3],
                }

            context["submitter"] = []
            for sub_data, value in submitter.items():
                context["submitter"].append(_set_submitter(sub_data))
                context = [sub for sub in context if sub[3] == self.request.user.username][0]
            return context      


    def post(self, request, submitter = submitter):
        if (request.user.is_authenticated) and has_apcd_group(request.user):
            
            form = request.POST.copy()
            errors= []

            for iteration in range(1,6):
                exten_resp = apcd_database.create_extension(form, iteration, submitter)
                if _err_msg(exten_resp):
                    errors.append(_err_msg(exten_resp))

            if len(errors):
                template = loader.get_template('extension_submission_form/extension_submission_error.html')
                response = HttpResponse(template.render({}, request))
            else:
                template = loader.get_template('extension_submission_form/extension_form_success.html')
                response = HttpResponse(template.render({}, request))

            return response
        else:
            return HttpResponseRedirect('/')


def _err_msg(resp):
    if hasattr(resp, 'pgerror'):
        return resp.pgerror
    if isinstance(resp, Exception):
        return str(resp)
    return None
