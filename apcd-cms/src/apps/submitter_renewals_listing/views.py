from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.generic.base import TemplateView
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
            data = json.loads(submitter_code)
            submitter_code = data['submitter_code']
            registrations_content = get_registrations(submitter_code=submitter_code)
            registrations_entities = get_registration_entities(submitter_code=submitter_code)
            registrations_contacts = get_registration_contacts(submitter_code=submitter_code)            
            context = self.get_context_data(registrations_content, registrations_entities, registrations_contacts, *args,**kwargs)
            template = loader.get_template(self.template_name)
            return HttpResponse(template.render(context, request))
        except:
            context = super(RegistrationsTable, self).get_context_data(*args, **kwargs)
            template = loader.get_template('submitter_listing_error.html')
            return HttpResponse(template.render(context, request))

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not (get_user_role(request.user.username) in ['APCD_ADMIN', 'SUBMITTER_ADMIN']):
            return HttpResponseRedirect('/')
        return super(SubmittersTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, registrations_content, registrations_entities, registrations_contacts, *args, **kwargs):
        context = super().get_context_data(registrations_content, registrations_entities, registrations_contacts, *args, **kwargs)
        context['header'] = ['Business Name', 'Year', 'Type', 'Location', 'Registration Status', 'Actions']
        context['pagination_url_namespaces'] = 'register:submitter_regis_table'
        return context
    
def get_submitter_code(request):
    submitter = get_submitter_info(str(request))
    for i in submitter:
        submitter_code =  i[1]
    return JsonResponse(({'submitter_code' : submitter_code } if submitter_code else ""), safe=False)
