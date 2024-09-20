from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.base import TemplateView
from django.template import loader
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_registration_entities, update_registration, update_registration_contact, update_registration_entity
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import table_filter
from apps.utils.registrations_data_formatting import _set_registration
from apps.components.paginator.paginator import paginator
import logging
from datetime import date as datetimeDate

logger = logging.getLogger(__name__)


class RegistrationsTable(TemplateView):
    template_name = 'list_registrations.html'

    def post(self, request):

        form = request.POST.copy()
        reg_id = int(form['reg_id'])

        reg_data = get_registrations(reg_id)[0]
        reg_entities = get_registration_entities(reg_id)
        reg_contacts = get_registration_contacts(reg_id)
        
        def _err_msg(resp):
            if hasattr(resp, 'pgerror'):
                return resp.pgerror
            if isinstance(resp, Exception):
                return str(resp)
            return None
                
        def _edit_registration(form, reg_entities=reg_entities, reg_contacts=reg_contacts):
            errors = []
            reg_resp = update_registration(form, reg_id)
            if not _err_msg(reg_resp) and type(reg_resp) == int:
                for iteration in range(1, 6):
                    contact_resp = update_registration_contact(form, reg_id, iteration, len(reg_contacts))
                    entity_resp = update_registration_entity(form, reg_id, iteration, len(reg_entities))
                    if _err_msg(contact_resp):
                        errors.append(_err_msg(contact_resp))
                    if _err_msg(entity_resp):
                        errors.append(_err_msg(entity_resp))
                if len(errors) != 0:
                    template = loader.get_template('edit_registration_error.html')
                template = loader.get_template('edit_registration_success.html')
            else:
                errors.append(_err_msg(reg_resp))
                template = loader.get_template('edit_registration_error.html')
            return template

        if 'edit-registration-form' in form:
            template = _edit_registration(form)
        return HttpResponse(template.render({}, request))

    def get(self, request, *args, **kwargs):
        registrations_content = get_registrations()
        registrations_entities = get_registration_entities()
        registrations_contacts = get_registration_contacts()   

        context = self.get_context_data(registrations_content, registrations_entities, registrations_contacts, *args,**kwargs)
        template = loader.get_template(self.template_name)
        return HttpResponse(template.render(context, request))

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return HttpResponseRedirect('/')
        return super(RegistrationsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, registrations_content, registrations_entities, registrations_contacts, *args, **kwargs):
        context = super(RegistrationsTable, self).get_context_data(*args, **kwargs)

        context['header'] = ['Business Name', 'Year', 'Type', 'Location', 'Registration Status', 'Actions']
        context['status_options'] = ['All', 'Received', 'Processing', 'Complete', 'Withdrawn']
        context['status_options'] = sorted(context['status_options'], key=lambda x: (x != 'All', x is None, x if x is not None else ''))
        context['org_options'] = ['All']

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        def getDate(row):
            date = row[1]
            return date if date is not None else datetimeDate(1,1,1)  # put 'None' date entries all together at end of listing w/ date 1-1-0001

        registrations_content = sorted(registrations_content, key=lambda row:getDate(row), reverse=True)  # sort registrations by newest to oldest

        registration_table_entries = []
        for registration in registrations_content:
            associated_entities = [ent for ent in registrations_entities if ent[1] == registration[0]]
            associated_contacts = [cont for cont in registrations_contacts if cont[1] == registration[0]]
            registration_table_entries.append(_set_registration(registration, associated_entities, associated_contacts))
            org_name = registration[5]
            if org_name not in context['org_options']:
                context['org_options'].append(org_name)
                context['org_options'] = sorted(context['org_options'],key=lambda x: (x != 'All', x is None, x if x is not None else ''))

        queryStr = ''
        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')

        context['selected_status'] = 'All'
        if status_filter and status_filter != 'All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'
            registration_table_entries = table_filter(status_filter, registration_table_entries, 'reg_status')

        context['selected_org'] = 'All'
        if org_filter and org_filter != 'All':
            context['selected_org'] = org_filter
            queryStr += f'&org={org_filter}'
            registration_table_entries = table_filter(org_filter.replace("(", "").replace(")",""), registration_table_entries, 'biz_name')

        context['query_str'] = queryStr
        context.update(paginator(self.request, registration_table_entries))
        context['pagination_url_namespaces'] = 'admin_regis_table:admin_regis_table'
        return context
