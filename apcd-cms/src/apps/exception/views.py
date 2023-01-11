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


class ExceptionFormView(View):
    def get(self, request):
        if (request.user.is_authenticated and has_apcd_group(request.user)):
            template = loader.get_template('exception_submission_form/exception_other_form.html')
            return HttpResponse(template.render({}, request))
        return HttpResponseRedirect('/')

    def post(self, request):
        form = request.POST.copy()
        response = HttpResponse(form, request)



def _err_msg(resp):
    if hasattr(resp, 'pgerror'):
        return resp.pgerror
    if isinstance(resp, Exception):
        return str(resp)
    return None

class ExceptionThresholdFormView(View):
    def get(self, request):
        if (request.user.is_authenticated and has_apcd_group(request.user)):
            template = loader.get_template('exception_submission_form/exception_threshold_form.html')
            return HttpResponse(template.render({}, request))
        return HttpResponseRedirect('/')


    def post(self, request):
        form = request.POST.copy()
        errors = []

        if (request.user.is_authenticated):
            username = request.user.username
            email = request.user.email
            first_name = request.user.first_name
            last_name = request.user.last_name
        else:
            return HttpResponseRedirect('/')

        reg_resp = apcd_database.create_exception(form)
        if not _err_msg(reg_resp) and type(reg_resp) == int:
            for iteration in range(1,6):
                contact_resp = apcd_database.create_exception_contact(form, reg_resp, iteration)
                entity_resp = apcd_database.create_registration_entity(form, reg_resp, iteration)
                if _err_msg(contact_resp):
                    errors.append(_err_msg(contact_resp))
                if _err_msg(entity_resp):
                    errors.append(_err_msg(entity_resp))
        else:
            errors.append(_err_msg(reg_resp))

        # ===> Create Ticket
        tracker = rt.Rt(RT_HOST, RT_UN, RT_PW, http_auth=HTTPBasicAuth(RT_UN, RT_PW))
        tracker.login()

        subject = "New TX-APCD Portal Exception Submission"
        description = "APCD Exception Request Details\n"
        description += "=========================\n"
        description += "submitter_user:            {}\n".format(username)
        description += "submitter_user_email:      {}\n".format(email)
        description += "submitter_user_first_name: {}\n".format(first_name)
        description += "submitter_user_last_name:  {}\n".format(last_name)
        if len(errors):
            subject = "(ERROR): TX-APCD Portal Exception Submission"
            description += "Error(s):\n"
            for err_msg in errors:
                description += "{}\n".format(err_msg)
            template = loader.get_template('exception_submission_form/exception_submission_error.html')
            response = HttpResponse(template.render({}, request))
        else:
            template = loader.get_template('exception_submission_form/exception_form_success.html')
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

class ExceptionOtherFormView(View):
    def get(self, request):
        if (request.user.is_authenticated and has_apcd_group(request.user)):
            template = loader.get_template('exception_submission_form/exception_submission_form.html')
            return HttpResponse(template.render({}, request))
        return HttpResponseRedirect('/')


    def post(self, request):
        form = request.POST.copy()
        errors = []

        if (request.user.is_authenticated):
            username = request.user.username
            email = request.user.email
            first_name = request.user.first_name
            last_name = request.user.last_name
        else:
            return HttpResponseRedirect('/')

        reg_resp = apcd_database.create_exception(form)
        if not _err_msg(reg_resp) and type(reg_resp) == int:
            for iteration in range(1,6):
                contact_resp = apcd_database.create_exception_contact(form, reg_resp, iteration)
                entity_resp = apcd_database.create_registration_entity(form, reg_resp, iteration)
                if _err_msg(contact_resp):
                    errors.append(_err_msg(contact_resp))
                if _err_msg(entity_resp):
                    errors.append(_err_msg(entity_resp))
        else:
            errors.append(_err_msg(reg_resp))

        # ===> Create Ticket
        tracker = rt.Rt(RT_HOST, RT_UN, RT_PW, http_auth=HTTPBasicAuth(RT_UN, RT_PW))
        tracker.login()

        subject = "New TX-APCD Portal Exception Submission"
        description = "APCD Exception Request Details\n"
        description += "=========================\n"
        description += "submitter_user:            {}\n".format(username)
        description += "submitter_user_email:      {}\n".format(email)
        description += "submitter_user_first_name: {}\n".format(first_name)
        description += "submitter_user_last_name:  {}\n".format(last_name)
        if len(errors):
            subject = "(ERROR): TX-APCD Portal Exception Submission"
            description += "Error(s):\n"
            for err_msg in errors:
                description += "{}\n".format(err_msg)
            template = loader.get_template('exception_submission_form/exception_submission_error.html')
            response = HttpResponse(template.render({}, request))
        else:
            template = loader.get_template('exception_submission_form/exception_form_success.html')
            response = HttpResponse(template.render({}, request))

        tracker.create_ticket(
            Queue=RT_QUEUE,
            Subject=subject,
            Text=description,
            Requestors=email
        )
        
        return response