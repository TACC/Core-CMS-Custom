from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_submitter_info, get_registration_entities
from apps.utils.apcd_groups import has_groups
from django.views.generic.base import TemplateView
from apps.admin_regis_table.views import RegistrationsTable
from apps.utils.registrations_data_formatting import _set_registration
import logging
import json

logger = logging.getLogger(__name__)


class SubmittersTable(RegistrationsTable):
    template_name = 'list_submitter_registrations.html'

    def _get_first_registration_entry(self, submitter_code, reg_id):
        registrations = get_registrations(submitter_code=submitter_code, reg_id=reg_id)
        if len(registrations) > 0:
            return registrations[0]
        else:
            raise Exception(f'Registration not found {reg_id}')

    def get(self, request, *args, **kwargs):
        try:
            response = get_submitter_code(request.user)
            submitter_code = json.loads(response.content)['submitter_code']
            registrations_content = []
            registrations_entities = []
            registrations_contacts = []
            if request.GET.get('reg_id'):
                reg_id = int(request.GET.get('reg_id'))
                registration = self._get_first_registration_entry(submitter_code=submitter_code, reg_id=reg_id)
                registrations_entities = get_registration_entities(reg_id=reg_id)
                registrations_contacts = get_registration_contacts(reg_id=reg_id)
                return JsonResponse({'response': _set_registration(registration, registrations_entities, registrations_contacts)})
            else:
                registration_list = get_registrations(submitter_code=submitter_code)
                for registration in registration_list:
                    registrations_content.append(registration)
                response_json = self.get_registration_list_json(registrations_content, *args, **kwargs)
                return JsonResponse({'response': response_json})
        except Exception as e:
            logger.error("An error occurred in submitter registration GET request: %s", str(e))
            return JsonResponse({
                'status': 'error',
                'message': 'Internal server error',
            }, status=500)

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not (has_groups(request.user, ['APCD_ADMIN', 'SUBMITTER_ADMIN'])):
            return HttpResponseRedirect('/')
        return super(RegistrationsTable, self).dispatch(request, *args, **kwargs)

    def get_registration_list_json(self, registrations_content, *args, **kwargs):
        try:
            reg_data = super().get_registration_list_json(registrations_content, *args, **kwargs)
            reg_data['header'] = ['Business Name', 'Year', 'Type', 'Location', 'Registration Status', 'Actions']
            reg_data['pagination_url_namespaces'] = 'register:submitter_regis_table'
            return reg_data
        except Exception as e:
            logger.error("A data loading error occurred: %s", str(e))
            reg_data = super(RegistrationsTable, self).get_registration_list_json(*args, **kwargs)
            return reg_data


def get_submitter_code(request):
    submitter = get_submitter_info(str(request))
    submitter_codes = []
    for i in submitter:
        submitter_codes.append(i[1])
    return JsonResponse({'submitter_code': submitter_codes} if submitter_codes else [], safe=False)
