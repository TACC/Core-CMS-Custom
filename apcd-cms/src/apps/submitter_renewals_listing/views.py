from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_user_role, get_submitter_info, get_registration_entities
from apps.admin_regis_table.views import RegistrationsTable
import logging
import json

logger = logging.getLogger(__name__)


class SubmittersTable(RegistrationsTable):
    template_name = 'list_submitter_registrations.html'

    def get(self, request, *args, **kwargs):
        try:
            response = get_submitter_code(request.user)
            submitter_code = response.content
            submitter_code = json.loads(response.content)['submitter_code']
            registrations_content = []
            registrations_entities = []
            registrations_contacts = []
            registration_list = get_registrations(submitter_code=submitter_code)
            for registration in registration_list:
                registrations_content.append(registration)
            context = self.get_context_data(registrations_content, registrations_entities, registrations_contacts, *args,**kwargs)
            template = loader.get_template(self.template_name)
            return HttpResponse(template.render(context, request))
        except Exception as e:
            logger.error("An error occurred: %s", str(e))
            context = super(RegistrationsTable, self).get_context_data(*args, **kwargs)
            template = loader.get_template('submitter_listing_error.html')
            return HttpResponse(template.render(context, request))

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not (get_user_role(request.user.username) in ['APCD_ADMIN', 'SUBMITTER_ADMIN']):
            return HttpResponseRedirect('/')
        return super(SubmittersTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, registrations_content, registrations_entities, registrations_contacts, *args, **kwargs):
        registrations_entities = []
        registrations_contacts = []
        try:
            for registration in registrations_content:
                reg_id = registration[0]
                contacts = get_registration_contacts(reg_id=reg_id)
                entity = get_registration_entities(reg_id=reg_id)
                for c in contacts:
                    registrations_contacts.append(c)
                for e in entity:                 
                    registrations_entities.append(e) 
            context = super().get_context_data(registrations_content, registrations_entities, registrations_contacts, *args, **kwargs)
            context['header'] = ['Business Name', 'Year', 'Type', 'Location', 'Registration Status', 'Actions']
            context['pagination_url_namespaces'] = 'register:submitter_regis_table'
            return context
        except Exception as e:
            logger.error("A context error occurred: %s", str(e))
            context = super(RegistrationsTable, self).get_context_data(*args, **kwargs)
            return context


def get_submitter_code(request):
    submitter = get_submitter_info(str(request))
    submitter_codes = []
    for i in submitter:
        submitter_codes.append(i[1])
    return JsonResponse({'submitter_code' : submitter_codes} if submitter_codes else [], safe=False)
