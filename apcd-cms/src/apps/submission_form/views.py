from apps.submission_form import apcd_database
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

class SubmissionFormView(View):
    def get(self, request):
        if (request.user.is_authenticated):
            template = loader.get_template('submission_form/submission_form.html')
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

        reg_resp = apcd_database.create_registration(form)
        if not hasattr(reg_resp, 'pgerror') and type(reg_resp) == int:
            for iteration in range(1,6):
                contact_resp = apcd_database.create_registration_contact(form, reg_resp, iteration)
                entity_resp = apcd_database.create_registration_entity(form, reg_resp, iteration)
                if hasattr(contact_resp, 'pgerror'):
                    errors.append(contact_resp)
                if hasattr(entity_resp, 'pgerror'):
                    errors.append(contact_resp)
        else:
            errors.append(reg_resp)

        # ===> Create Ticket
        tracker = rt.Rt(RT_HOST, RT_UN, RT_PW, http_auth=HTTPBasicAuth(RT_UN, RT_PW))
        tracker.login()

        subject = "New TX-APCD Portal Registration"
        description = "APCD Registration Details\n"
        description += "=========================\n"
        description += "submitter_user:            {}\n".format(username)
        description += "submitter_user_email:      {}\n".format(email)
        description += "submitter_user_first_name: {}\n".format(first_name)
        description += "submitter_user_last_name:  {}\n".format(last_name)
        if len(errors):
            subject = "(ERROR): TX-APCD Portal Registration"
            description += "Error(s):\n"
            for err_msg in errors:
                if hasattr(err_msg, 'pgerror'):
                    description += "{}\n".format(err_msg.pgerror)
                else:
                    description += str(err_msg)
            response = HttpResponseRedirect('/error/page/goes/here')
        else:
            template = loader.get_template('submission_form/submission_success.html')
            response = HttpResponse(template.render({}, request))

        tracker.create_ticket(
            Queue=RT_QUEUE,
            Subject=subject,
            Text=description,
            Requestors=email
        )
        
        return response
