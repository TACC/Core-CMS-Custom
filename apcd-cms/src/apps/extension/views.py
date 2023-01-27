from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.views.generic import View
from requests.auth import HTTPBasicAuth
import logging
import rt

logger = logging.getLogger(__name__)

RT_HOST = getattr(settings, 'RT_HOST', '')
RT_UN = getattr(settings, 'RT_UN', '')
RT_PW = getattr(settings, 'RT_PW', '')
RT_QUEUE = getattr(settings, 'RT_QUEUE', '')


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
            logger.error(context)
            return context      


    def post(self, request, submitter = submitter):
        def _err_msg(resp):
            if hasattr(resp, 'pgerror'):
                return resp.pgerror
            if isinstance(resp, Exception):
                return str(resp)
            return None

        if (request.user.is_authenticated):
            username = request.user.username
            email = request.user.email
            first_name = request.user.first_name
            last_name = request.user.last_name
        else:
            return HttpResponseRedirect('/')

        form = request.POST.copy()
        errors= []

        if not _err_msg(submitter):
            for iteration in range(1,6):
                exten_resp = apcd_database.create_extension(form, iteration, submitter)
                if _err_msg(exten_resp):
                    errors.append(_err_msg(exten_resp))
        else:
            errors.append(_err_msg(exten_resp))

        # ===> Create Ticket
        tracker = rt.Rt(RT_HOST, RT_UN, RT_PW, http_auth=HTTPBasicAuth(RT_UN, RT_PW))
        tracker.login()

        subject = "New TX-APCD Portal Extension Submission"
        description = "APCD Extension Request Details\n"
        description += "=========================\n"
        description += "submitter_user:            {}\n".format(username)
        description += "submitter_user_email:      {}\n".format(email)
        description += "submitter_user_first_name: {}\n".format(first_name)
        description += "submitter_user_last_name:  {}\n".format(last_name)
        if len(errors):
            subject = "(ERROR): TX-APCD Portal Extension Submission"
            description += "Error(s):\n"
            for err_msg in errors:
                description += "{}\n".format(err_msg)
            template = loader.get_template('extension_submission_form/extension_submission_error.html')
            response = HttpResponse(template.render({}, request))
        else:
            template = loader.get_template('extension_submission_form/extension_form_success.html')
            response = HttpResponse(template.render({}, request))

        tracker.create_ticket(
            Queue=RT_QUEUE,
            Subject=subject,
            Text=description,
            Requestors=email
        )
        return response


def _err_msg(resp):
    if hasattr(resp, 'pgerror'):
        return resp.pgerror
    if isinstance(resp, Exception):
        return str(resp)
    return None
