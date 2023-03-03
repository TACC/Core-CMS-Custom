from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.base import TemplateView
from django.template import loader
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_registration_entities, create_submitter, update_registration, update_registration_contact, update_registration_entity
from apps.utils.apcd_groups import is_apcd_admin
import logging

logger = logging.getLogger(__name__)


class RegistrationsTable(TemplateView):
    template_name = 'list_registrations.html'

    def post(self, request):

        form = request.POST.copy()
        reg_id = int(form['reg_id'])

        reg_content = get_registrations(reg_id)[0]
        reg_entities = get_registration_entities(reg_id)
        reg_contacts = get_registration_contacts(reg_id)
        
        def _err_msg(resp):
            if hasattr(resp, 'pgerror'):
                return resp.pgerror
            if isinstance(resp, Exception):
                return str(resp)
            return None
        
        def _new_submitter(form, reg_data=reg_content):
            errors = []
            
            sub_resp = create_submitter(form, reg_data)
            template = loader.get_template('create_submitter_success.html')
            if _err_msg(sub_resp) or type(sub_resp) != int:
                errors.append(_err_msg(sub_resp))
                template = loader.get_template('create_submitter_error.html')

            return template
        
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

        if 'create-submitter-form' in form:
            template = _new_submitter(form)
        elif 'edit-registration-form' in form:
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

        def _set_registration(reg, reg_ents, reg_conts):
            return {
                    'biz_name': reg[13],
                    'type': reg[12].title() if reg[12] else None,
                    'location': '{city}, {state}'.format
                        (
                            city=reg[15],
                            state=reg[16]
                        ),
                    'files_type': [
                        "Medical" if reg[6] else None,
                        "Provider" if reg[5] else None,
                        "Eligibility/Enrollment" if reg[4] else None,
                        "Pharmacy" if reg[7] else None,
                        "Dental" if reg[8] else None
                    ],
                    'sub_method': reg[10],
                    'reg_status': reg[11].title(),
                    'reg_id': reg[0],
                    'view_modal_content': _set_modal_content(reg, reg_ents, reg_conts)
                }
        def _set_entities(reg_ent):
            return {
                'claim_val': reg_ent[0],
                'ent_id': reg_ent[3],
                'claim_and_enc_vol': reg_ent[2],
                'license': reg_ent[4] if reg_ent[4] else None,
                'naic': reg_ent[5] if reg_ent[5] else None,
                'no_covered': reg_ent[6],
                'ent_name': reg_ent[7],
                'fein': reg_ent[8] if reg_ent[8] else None
            }
        def _set_contacts(reg_cont):

            def format_phone_number(num):
                formatted_num_list = list(reversed(num))
                last_four_digits = 3
                last_seven_digits = 7
                all_ten_digits = 11
                placement_corrector = 1 #To add formatting chars in correct places
                for curr_position in range(len(formatted_num_list) + 1):
                    placement_position = curr_position + placement_corrector
                    if curr_position == last_four_digits or curr_position == last_seven_digits:
                        formatted_num_list.insert(placement_position,'-')
                    if curr_position == all_ten_digits and len(num) > 10:
                        formatted_num_list.insert(placement_position,' ')
                        formatted_num_list.append('+')
                return ''.join(reversed(formatted_num_list))

            return {
                'cont_id': reg_cont[0],
                'notif': reg_cont[2],
                'role': reg_cont[3],
                'name': reg_cont[4],
                'phone': format_phone_number(reg_cont[5]),
                'email': reg_cont[6]
            }
        def _set_modal_content(reg, reg_ent, reg_cont):
            return {
                'biz_name': reg[13],
                'type': reg[12].title() if reg[12] else None,
                'city': reg[15],
                'state': reg[16],
                'address': reg[14],
                'zip': reg[17],
                'files_type': {
                        "Eligibility/Enrollment": reg[4],
                        "Provider": reg[5],
                        "Medical": reg[6],
                        "Pharmacy": reg[7],
                        "Dental": reg[8]
                },
                'for_self': reg[9],
                'sub_method': reg[10],
                'entities': [_set_entities(ent) for ent in reg_ent],
                'contacts': [_set_contacts(cont) for cont in reg_cont],
                'org_types': {
                    'Insurance Carrier': 'Insurance Carrier', 
                    'Plan Administrator': 'Plan Administrator¹ (TPA/ASO)',
                    'Pbm': 'Pharmacy Benefit Manager (PBM)'
                },
                'us_state_list': [
                    'AL - Alabama',
                    'AK - Alaska',
                    'AS - American Samoa',
                    'AR - Arkansas',
                    'AZ - Arizona',
                    'CA - California',
                    'CO - Colorado',
                    'CT - Connecticut',
                    'DE - Delaware',
                    'DC - District of Columbia',
                    'FL - Florida',
                    'GA - Georgia',
                    'GU - Guam',
                    'HI - Hawaii',
                    'ID - Idaho',
                    'IL - Illinois',
                    'IN - Indiana',
                    'IA - Iowa',
                    'KS - Kansas',
                    'KY - Kentucky',
                    'LA - Louisiana',
                    'ME - Maine',
                    'MD - Maryland',
                    'MA - Massachusetts',
                    'MI - Michigan',
                    'MN - Minnesota',
                    'MS - Mississippi',
                    'MO - Missouri',
                    'MT - Montana',
                    'NE - Nebraska',
                    'NH - New Hampshire',
                    'NJ - New Jersey',
                    'NM - New Mexico',
                    'NV - Nevada',
                    'NY - New York',
                    'NC - North Carolina',
                    'ND - North Dakota',
                    'MP - Northern Mariana Islands',
                    'OH - Ohio',
                    'OK - Oklahoma',
                    'OR - Oregon',
                    'PA - Pennsylvania',
                    'RI - Rhode Island',
                    'SC - South Carolina',
                    'SD - South Dakota',
                    'TN - Tennessee',
                    'TX - Texas',
                    'UT - Utah',
                    'VT - Vermont',
                    'VA - Virginia',
                    'VI - Virgin Islands',
                    'WA - Washington',
                    'WV - West Virginia',
                    'WI - Wisconsin',
                    'WY - Wyoming'
                ],
                'sub_methods': {
                    'sftp': 'SFTP',
                    'https': 'HTTPS',
                    'usb': 'Encrypted USB Drive'
                }
            }

        context['header'] = ['Business Name', 'Type', 'Location', 'Submission Method', 'Registration Status', 'Files to Submit', 'Actions']
        context['rows'] = []
        for registration in registrations_content:
            associated_entities = [ent for ent in registrations_entities if ent[1] == registration[0]]
            associated_contacts = [cont for cont in registrations_contacts if cont[1] == registration[0]]
            context['rows'].append(_set_registration(registration, associated_entities, associated_contacts))

        return context
