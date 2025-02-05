from django.http import HttpResponseRedirect, JsonResponse
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_submitter_info, get_registration_entities
from apps.utils.apcd_groups import has_groups
from django.views.generic.base import TemplateView
from apps.admin_regis_table.views import RegistrationsApi
from apps.base.base import BaseAPIView
from apps.utils.registrations_data_formatting import _set_registration
import logging
import json

logger = logging.getLogger(__name__)


class SubmittersTable(TemplateView):
    template_name = 'list_submitter_registrations.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not (has_groups(request.user, ['APCD_ADMIN', 'SUBMITTER_ADMIN'])):
            return HttpResponseRedirect('/')
        return super(SubmittersTable, self).dispatch(request, *args, **kwargs)


class SubmittersApi(BaseAPIView):

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not (has_groups(request.user, ['APCD_ADMIN', 'SUBMITTER_ADMIN'])):
            return JsonResponse({'error': 'Unauthorized'}, status=403)
        return super(SubmittersApi, self).dispatch(request, *args, **kwargs)

    def _get_first_registration_entry(self, submitter_code, reg_id):
        registrations = get_registrations(submitter_code=submitter_code, reg_id=reg_id)
        if len(registrations) > 0:
            return registrations[0]
        else:
            raise Exception(f'Registration not found {reg_id}')

    def get(self, request, *args, **kwargs):
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
            try:
                page_num = int(request.GET.get('page'))
            except:
                page_num = 1
            response_json = RegistrationsApi.get_registration_list_json(registrations_content, request.GET.get('status'),
                                                                        request.GET.get('org'), page_num, *args, **kwargs)
            return JsonResponse({'response': response_json})

    def get_registration_list_json(self, registrations_content, *args, **kwargs):
        reg_data = super().get_registration_list_json(registrations_content, *args, **kwargs)
        reg_data['header'] = ['Business Name', 'Year', 'Type', 'Location', 'Registration Status', 'Actions']
        reg_data['pagination_url_namespaces'] = 'register:submitter_regis_table'
        return reg_data


def get_submitter_code(request):
    submitter = get_submitter_info(str(request))
    submitter_codes = []
    for i in submitter:
        submitter_codes.append(i[1])
    return JsonResponse({'submitter_code': submitter_codes} if submitter_codes else [], safe=False)
