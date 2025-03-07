from django.http import JsonResponse
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import (
    delete_registration_entity,
    delete_registration_contact,
    get_registrations,
    get_registration_contacts,
    get_registration_entities,
    update_registration,
    update_registration_contact,
    update_registration_entity,
)
from apps.utils.registrations_data_formatting import (
    _set_registration,
)
from apps.submitter_renewals_listing.utils import get_submitter_codes
from apps.utils.apcd_groups import is_apcd_admin
from apps.admin_regis_table.utils import get_registration_list_json
from apps.base.base import (
    BaseAPIView,
    APCDAdminAccessAPIMixin,
    APCDAdminAccessTemplateMixin,
    APCDSubmitterAdminAccessAPIMixin,
)
import logging
import json

logger = logging.getLogger(__name__)


class RegistrationsTable(APCDAdminAccessTemplateMixin, TemplateView):
    template_name = 'list_registrations.html'


class RegistrationsPostApi(APCDSubmitterAdminAccessAPIMixin, BaseAPIView):
    def post(self, request, reg_id):
        # Important: This POST api handles both admin and submitter admin
        # Check if the registration id is allowed for submitter admin access.
        if not is_apcd_admin(request.user):
            response = get_submitter_codes(request.user)
            submitter_codes = json.loads(response.content)['submitter_codes']
            registrations = get_registrations(submitter_codes=submitter_codes, reg_id=reg_id)
            if len(registrations) == 0:
                logger.error(f'Registration not found {reg_id}')
                return JsonResponse({'error': 'NotFound'}, status=404)

        form = json.loads(request.body)
        reg_entities = form['entities']
        reg_contacts = form['contacts']

        # Find the associated contacts and entities that were deleted.
        updated_entity_ids = {reg['entity_id'] for reg in reg_entities if 'entity_id' in reg and reg['entity_id'] >= 0}
        updated_contact_ids = {con['contact_id'] for con in reg_contacts if 'contact_id' in con and con['contact_id'] >= 0}
        # Retrieve existing IDs
        existing_entity_ids = {reg[3] for reg in get_registration_entities(reg_id)}
        existing_contact_ids = {contact[0] for contact in get_registration_contacts(reg_id)}
        # Find the deleted ones.
        entity_ids_to_delete = existing_entity_ids - updated_entity_ids
        contact_ids_to_delete = existing_contact_ids - updated_contact_ids

        def _err_msg(resp):
            if hasattr(resp, 'pgerror'):
                return resp.pgerror
            if isinstance(resp, Exception):
                return str(resp)
            return None

        reg_resp = update_registration(form, reg_id)
        errors = []
        if not _err_msg(reg_resp):
            for id in entity_ids_to_delete:
                delete_resp = delete_registration_entity(reg_id, id)
                if _err_msg(delete_resp):
                    errors.append(str(delete_resp))

            for id in contact_ids_to_delete:
                delete_resp = delete_registration_contact(reg_id, id)
                if _err_msg(delete_resp):
                    errors.append(str(delete_resp))

            for entity in reg_entities:
                entity_resp = update_registration_entity(entity, reg_resp)
                if _err_msg(entity_resp):
                    errors.append(str(entity_resp))
            for contact in reg_contacts:
                contact_resp = update_registration_contact(contact, reg_resp)
                if _err_msg(contact_resp):
                    errors.append(str(contact_resp))
        else:
            errors.append(str(reg_resp))

        if len(errors):
            description = "Error(s):\n"
            for err_msg in errors:
                description += "{}\n".format(err_msg)
            response = JsonResponse({'status': 'error', 'errors': description}, status=400)
        else:
            response = JsonResponse({'status': 'success', 'reg_id': reg_id}, status=200)

        return response


class RegistrationsApi(APCDAdminAccessAPIMixin, BaseAPIView):
    def _get_first_registration_entry(self, reg_id):
        registrations = get_registrations(reg_id=reg_id)
        if len(registrations) > 0:
            return registrations[0]
        else:
            raise Exception(f'Registration not found {reg_id}')

    def get(self, request, *args, **kwargs):
        if request.GET.get('reg_id'):
            reg_id = int(request.GET.get('reg_id'))
            registration = self._get_first_registration_entry(reg_id)
            registrations_entities = get_registration_entities(reg_id=reg_id)
            registrations_contacts = get_registration_contacts(reg_id=reg_id)
            return JsonResponse({'response': _set_registration(registration, registrations_entities, registrations_contacts)})
        else:
            registrations_content = get_registrations()
            try:
                page_num = int(request.GET.get('page'))
            except:
                page_num = 1
            context = get_registration_list_json(registrations_content, request.GET.get('status'),
                                                 request.GET.get('org'), page_num, *args, **kwargs)
            return JsonResponse({'response': context})        


