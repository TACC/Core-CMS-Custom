from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from apps.utils.registrations_data_formatting import _set_registration
from apps.submitter_renewals_listing.views import get_submitter_code
from apps.utils.apcd_groups import has_groups
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.views.generic import View
from django.shortcuts import redirect
from requests.auth import HTTPBasicAuth
import logging
import rt
import json

logger = logging.getLogger(__name__)

RT_HOST = getattr(settings, 'RT_HOST', '')
RT_UN = getattr(settings, 'RT_UN', '')
RT_PW = getattr(settings, 'RT_PW', '')
RT_QUEUE = getattr(settings, 'RT_QUEUE', '')


class SubmissionFormView(View):
    def get(self, request):
        formatted_reg_data = []
        renew = False
        reg_id = request.GET.get('reg_id', None)
        if reg_id and (has_groups(request.user, ['APCD_ADMIN', 'SUBMITTER_ADMIN'])):
            try:
                response = get_submitter_code(request.user)
                submitter_code = json.loads(response.content)['submitter_code']
                submitter_registrations = apcd_database.get_registrations(submitter_code=submitter_code)
                registration_content = [registration for registration in submitter_registrations if registration[0] == int(reg_id)][0]
                registration_entities = apcd_database.get_registration_entities(reg_id=reg_id)
                registration_contacts = apcd_database.get_registration_contacts(reg_id=reg_id)
                renew = True
                formatted_reg_data = _set_registration(registration_content, registration_entities, registration_contacts)
            except Exception as exception:
                logger.error(exception)
                return redirect('/register/request-to-submit/')
        if (request.user.is_authenticated and has_apcd_group(request.user)):
            template = loader.get_template('submission_form/submission_form.html')
            return HttpResponse(template.render({'r': formatted_reg_data, 'renew': renew}, request))
        return HttpResponseRedirect('/')


    def post(self, request):
        form = request.POST.copy()
        old_reg_id = None
        renewal = False
        if 'reg_id' in form:
            old_reg_id = form['reg_id']
            renewal = True
        errors = []

        if (request.user.is_authenticated):
            username = request.user.username
            email = request.user.email
            first_name = request.user.first_name
            last_name = request.user.last_name
        else:
            return HttpResponseRedirect('/')

        reg_resp = apcd_database.create_registration(form, renewal=renewal)
        if not _err_msg(reg_resp) and type(reg_resp) == int:
            for iteration in range(1,6):
                contact_resp = apcd_database.create_registration_contact(form, reg_resp, iteration, old_reg_id=old_reg_id)
                entity_resp = apcd_database.create_registration_entity(form, reg_resp, iteration, old_reg_id=old_reg_id)
                if _err_msg(contact_resp):
                    errors.append(_err_msg(contact_resp))
                if _err_msg(entity_resp):
                    errors.append(_err_msg(entity_resp))
        else:
            errors.append(_err_msg(reg_resp))

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
                description += "{}\n".format(err_msg)
            template = loader.get_template('submission_form/submission_error.html')
            response = HttpResponse(template.render({}, request))
        else:
            context = {'reg_id': reg_resp}
            template = loader.get_template('submission_form/submission_success.html')
            response = HttpResponse(template.render(context, request))

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
