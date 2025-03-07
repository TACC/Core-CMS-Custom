from apps.utils.apcd_database import create_registration, create_registration_entity, create_registration_contact, get_registrations, get_registration_entities, get_registration_contacts
from apps.utils.apcd_groups import has_apcd_group
from apps.utils.registrations_data_formatting import _set_registration
from apps.submitter_renewals_listing.utils import get_submitter_codes
from apps.utils.apcd_groups import has_groups
from django.conf import settings
from django.http import JsonResponse
from django.views.generic import TemplateView
from apps.base.base import BaseAPIView, AuthenticatedUserTemplateMixin, AuthenticatedUserAPIMixin
from requests.auth import HTTPBasicAuth
import logging
import rt
import json

logger = logging.getLogger(__name__)

RT_HOST = getattr(settings, 'RT_HOST', '')
RT_UN = getattr(settings, 'RT_UN', '')
RT_PW = getattr(settings, 'RT_PW', '')
RT_QUEUE = getattr(settings, 'RT_QUEUE', '')


class RegistrationFormTemplate(AuthenticatedUserTemplateMixin, TemplateView):
    template_name = 'registration_form.html'


class RegistrationFormApi(AuthenticatedUserAPIMixin, BaseAPIView):

    def get(self, request):
        formatted_reg_data = []
        renew = False
        reg_id = request.GET.get('reg_id', None).rstrip('/')  # reg_id coming from renew has trailing slash appended, need to remove to pass correct request through
        # this is primarily used for renewal and restricted to admins
        if reg_id and (has_groups(request.user, ['APCD_ADMIN', 'SUBMITTER_ADMIN'])):
            response = get_submitter_codes(request.user)
            submitter_codes = json.loads(response.content)['submitter_codes']
            submitter_registrations = get_registrations(submitter_codes=submitter_codes)
            registration_content = [registration for registration in submitter_registrations if registration[0] == int(reg_id)][0]
            registration_entities = get_registration_entities(reg_id=reg_id)
            registration_contacts = get_registration_contacts(reg_id=reg_id)
            renew = True
            formatted_reg_data = _set_registration(registration_content, registration_entities, registration_contacts)

        if (request.user.is_authenticated and has_apcd_group(request.user)):
            context = {'registration_data': formatted_reg_data, 'renew': renew}
            return JsonResponse({'response': context})
        else: 
            return JsonResponse({'error': 'Unauthorized'}, status=403)

    def post(self, request):
        form = json.loads(request.body)
        entities = form['entities']
        contacts = form['contacts']
        renewal = False
        if 'reg_id' in form:
            renewal = True
        errors = []

        username = request.user.username
        email = request.user.email
        first_name = request.user.first_name
        last_name = request.user.last_name
        reg_resp = create_registration(form, renewal=renewal)
        if not _err_msg(reg_resp) and type(reg_resp) == int:
            for entity in entities:
                entity_resp = create_registration_entity(entity, reg_resp)
                if entity_resp: # only returns a value if error occurs
                    errors.append(str(entity_resp))
            for contact in contacts:
                contact_resp = create_registration_contact(contact, reg_resp)
                if contact_resp: # only returns a value if error occurs
                    errors.append(str(contact_resp))
        else:
            errors.append(str(reg_resp))

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
            response = JsonResponse({'status': 'error', 'errors': errors}, status=500)
        else:
            response = JsonResponse({'status': 'success', 'reg_id': reg_resp}, status=200)
        try:
            tracker.create_ticket(
                Queue=RT_QUEUE,
                Subject=subject,
                Text=description,
                Requestor=email
            )
        except Exception as err:
            msg = "Could not create ticket for new TX-APCD Registration Request"
            logger.exception(msg=msg)
            logger.error(err.args)
            errors.append(str(msg))
            response = JsonResponse({'status': 'error', 'errors': errors}, status=500)

        return response


def _err_msg(resp):
    if hasattr(resp, 'pgerror'):
        return resp.pgerror
    if isinstance(resp, Exception):
        return str(resp)
    return None
