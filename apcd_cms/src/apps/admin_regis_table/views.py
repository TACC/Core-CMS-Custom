from django.http import HttpResponseRedirect, JsonResponse
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
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import table_filter
from apps.utils.registrations_data_formatting import (
    _set_registration,
    _set_registration_for_listing,
)
from apps.components.paginator.paginator import paginator
from apps.base.base import BaseAPIView, APCDAdminAccessAPIMixin
import logging
from datetime import date as datetimeDate
import json

logger = logging.getLogger(__name__)


class RegistrationsTable(TemplateView):
    template_name = 'list_registrations.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return HttpResponseRedirect('/')
        return super(RegistrationsTable, self).dispatch(request, *args, **kwargs)


class RegistrationsApi(APCDAdminAccessAPIMixin, BaseAPIView):
    def _get_first_registration_entry(self, reg_id):
        registrations = get_registrations(reg_id=reg_id)
        if len(registrations) > 0:
            return registrations[0]
        else:
            raise Exception(f'Registration not found {reg_id}')

    def post(self, request, reg_id):
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
            context = RegistrationsApi.get_registration_list_json(registrations_content, request.GET.get('status'),
                                                                  request.GET.get('org'), page_num, *args, **kwargs)
            return JsonResponse({'response': context})        

    @staticmethod
    def get_registration_list_json(registrations_content, status_filter, org_filter, page_num, *args, **kwargs):
        context = {}

        context['header'] = ['Business Name', 'Year', 'Type', 'Location', 'Registration Status', 'Actions']
        context['status_options'] = ['All', 'Received', 'Processing', 'Complete', 'Withdrawn']
        context['org_options'] = ['All']

        def getDate(row):
            date = row[1]
            return date if date is not None else datetimeDate(1, 1, 1)  # put 'None' date entries all together at end of listing w/ date 1-1-0001

        registrations_content = sorted(registrations_content, key=lambda row: getDate(row), reverse=True)  # sort registrations by newest to oldest

        registration_table_entries = []
        for registration in registrations_content:
            registration_table_entries.append(_set_registration_for_listing(registration))
            org_name = registration[5]
            if org_name not in context['org_options']:
                context['org_options'].append(org_name)

        queryStr = ''

        context['selected_status'] = None
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'
            registration_table_entries = table_filter(status_filter, registration_table_entries, 'reg_status')

        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            queryStr += f'&org={org_filter}'
            registration_table_entries = table_filter(org_filter.replace("(", "").replace(")", ""), registration_table_entries, 'biz_name')

        context['query_str'] = queryStr
        page_info = paginator(page_num, registration_table_entries)
        context['page'] = [
            {
                'biz_name': obj['biz_name'],
                'year': obj['year'],
                'type': obj['type'],
                'location': obj['location'],
                'reg_status': obj['reg_status'],
                'reg_id': obj['reg_id'],
            }
            for obj in page_info['page']
        ]
        context['page_num'] = page_num
        context['total_pages'] = page_info['page'].paginator.num_pages
        context['pagination_url_namespaces'] = 'administration:admin_regis_table'
        return context
