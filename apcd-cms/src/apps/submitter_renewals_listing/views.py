from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.generic.base import TemplateView
from django.template import loader
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_submitter_info, get_registration_entities, create_submitter, update_registration, update_registration_contact, update_registration_entity
from apps.utils.apcd_groups import is_apcd_admin, is_submitter_admin
from apps.utils.utils import table_filter
from apps.components.paginator.paginator import paginator
import logging
import json
from dateutil import parser

logger = logging.getLogger(__name__)


class SubmittersTable(TemplateView):
    template_name = 'list_submitter_registrations.html'

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

    def get(self, request, *args, **kwargs):
        if is_submitter_admin(request.user):
            try:
                response = get_submitter_code(request.user)
                submitter_code = response.content
                data = json.loads(submitter_code)
                submitter_code = data['submitter_code'] 
                registrations_content = get_registrations(submitter_code=submitter_code)
                registrations_entities = get_registration_entities(submitter_code=submitter_code)
                registrations_contacts = get_registration_contacts(submitter_code=submitter_code)                
                context = super().get_context_data(registrations_content, registrations_entities, registrations_contacts, *args,**kwargs)
                template = loader.get_template(self.template_name)
                return HttpResponse(template.render(context, request))
            except:
                context = super(SubmittersTable, self).get_context_data(*args,**kwargs)
                template = loader.get_template('submitter_listing_error.html')
                return HttpResponse(template.render(context, request))
        return HttpResponseRedirect('/')

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return HttpResponseRedirect('/')
        return super(SubmittersTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, registrations_content, registrations_entities, registrations_contacts, *args, **kwargs):
        context = super(SubmittersTable, self).get_context_data(*args, **kwargs)
        context["submitter_code"] = get_submitter_code(self.request.user)

        def _set_registration(reg, reg_ents, reg_conts):
            org_types = {
                    'carrier': 'Insurance Carrier',
                    'tpa_aso': 'Plan Administrator¹ (TPA/ASO)',
                    'pbm': 'Pharmacy Benefit Manager (PBM)'
            }
            return {
                    'biz_name': reg[7],
                    'type': org_types[reg[6]] if (reg[6] and reg[6] in org_types.keys()) else None,
                    'location': '{city}, {state}'.format
                        (
                            city=reg[9],
                            state=reg[10]
                        ),
                    'reg_status': reg[5].title(),
                    'reg_id': reg[0],
                    'view_modal_content': _set_modal_content(reg, reg_ents, reg_conts, org_types)
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
                'fein': reg_ent[8] if reg_ent[8] else None,
                'plans_type': {
                    "Commercial": reg_ent[9],
                    "Medicare": reg_ent[10],
                    "Medicaid": reg_ent[11],
                },
                'files_type': {
                    "Eligibility/Enrollment": reg_ent[12],
                    "Provider": reg_ent[13],
                    "Medical": reg_ent[14],
                    "Pharmacy": reg_ent[15],
                    "Dental": reg_ent[16]
                }
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
                'email': reg_cont[6],
            }
        def _set_modal_content(reg, reg_ent, reg_cont, org_types):
            return {
                'biz_name': reg[7],
                'type': org_types[reg[6]] if (reg[6] and reg[6] in org_types.keys()) else None,
                'city': reg[9],
                'state': reg[10],
                'address': reg[8],
                'zip': reg[11],
                'for_self': reg[4],
                'entities': [_set_entities(ent) for ent in reg_ent],
                'contacts': [_set_contacts(cont) for cont in reg_cont],
                'org_types': org_types,
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
            }

        context['header'] = ['Business Name', 'Type', 'Location', 'Registration Status', 'Actions']
        context['status_options'] = ['All', 'Received', 'Processing', 'Complete']
        context['org_options'] = ['All']

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        def getDate(row):
            date = row[1]
            return date if date is not None else parser.parse('1-1-0001')  # put 'None' date entries all together at end of listing

        registrations_content = sorted(registrations_content, key=lambda row:getDate(row), reverse=True)  # sort registrations by newest to oldest

        registration_table_entries = []
        for registration in registrations_content:
            associated_entities = [ent for ent in registrations_entities if ent[1] == registration[0]]
            associated_contacts = [cont for cont in registrations_contacts if cont[1] == registration[0]]
            registration_table_entries.append(_set_registration(registration, associated_entities, associated_contacts))
            org_name = registration[7]
            if org_name not in context['org_options']:
                context['org_options'].append(org_name)

        queryStr = ''
        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')

        context['selected_status'] = None
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'
            registration_table_entries = table_filter(status_filter, registration_table_entries, 'reg_status')

        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            queryStr += f'&org={org_filter}'
            registration_table_entries = table_filter(org_filter.replace("(", "").replace(")",""), registration_table_entries, 'biz_name')

        context['query_str'] = queryStr
        context.update(paginator(self.request, registration_table_entries))
        context['pagination_url_namespaces'] = 'register:submitter_renewals_listing'
        return context
    
def get_submitter_code(request):
    submitter = get_submitter_info(str(request))
    for i in submitter:
        submitter_code =  i[1]
    return JsonResponse(({'submitter_code' : submitter_code } if submitter_code else ""), safe=False)
