from django.http import JsonResponse
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_registration_entities
from django.views.generic.base import TemplateView
from apps.admin_regis_table.utils import get_registration_list_json
from apps.base.base import BaseAPIView, APCDSubmitterAdminAccessAPIMixin, APCDSubmitterAdminAccessTemplateMixin
from apps.utils.registrations_data_formatting import _set_registration
from apps.submitter_renewals_listing.utils import get_submitter_codes
import logging
import json

logger = logging.getLogger(__name__)


class SubmittersTable(APCDSubmitterAdminAccessTemplateMixin, TemplateView):
    template_name = 'list_submitter_registrations.html'


class SubmittersApi(APCDSubmitterAdminAccessAPIMixin, BaseAPIView):

    def _get_first_registration_entry(self, submitter_codes, reg_id):
        registrations = get_registrations(submitter_codes=submitter_codes, reg_id=reg_id)
        if len(registrations) > 0:
            return registrations[0]
        else:
            raise Exception(f'Registration not found {reg_id}')

    def get(self, request, *args, **kwargs):
        response = get_submitter_codes(request.user)
        submitter_codes = json.loads(response.content)['submitter_codes']
        registrations_content = []
        registrations_entities = []
        registrations_contacts = []
        if request.GET.get('reg_id'):
            reg_id = int(request.GET.get('reg_id'))
            registration = self._get_first_registration_entry(submitter_codes=submitter_codes, reg_id=reg_id)
            registrations_entities = get_registration_entities(reg_id=reg_id)
            registrations_contacts = get_registration_contacts(reg_id=reg_id)
            return JsonResponse({'response': _set_registration(registration, registrations_entities, registrations_contacts)})
        else:
            registration_list = get_registrations(submitter_codes=submitter_codes)
            for registration in registration_list:
                registrations_content.append(registration)
            try:
                page_num = int(request.GET.get('page'))
            except:
                page_num = 1
            response_json = get_registration_list_json(registrations_content, request.GET.get('status'),
                                                       request.GET.get('org'), page_num, *args, **kwargs)
            response_json['header'] = ['Business Name', 'Year', 'Type', 'Location', 'Registration Status', 'Actions']
            response_json['pagination_url_namespaces'] = 'register:submitter_regis_table'
            return JsonResponse({'response': response_json})

