from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_registration_entities
from apps.utils.apcd_groups import is_apcd_admin
import logging

logger = logging.getLogger(__name__)


class RegistrationsTable(TemplateView):
    template_name = 'list_registrations.html'

    def dispatch(self, request, *args, **kwargs):
        #if not request.user.is_authenticated or not is_apcd_admin(request.user):
        #    return HttpResponseRedirect('/')
        return super(RegistrationsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):
        context = super(RegistrationsTable, self).get_context_data(*args, **kwargs)
        actions = 'View'
        import datetime
        registrations_content = [
        (
         1,                                  #registration_id
         datetime.date(2022, 8, 3),          #posted_date
         12023,                              #applicable_period_start
         122023,                             #applicable_period_end
         True,                               #file_me
         True,                               #file_pv
         True,                               #file_mc
         True,                               #file_pc
         False,                              #file_dc
         True,                               #submitting_for_self
         'SFTP',                             #submission_method
         'active',                           #registration_status
         'insurance carrier',                #org_type
         'Golden Rule Insurance Company',    #business_name
         '7440 Woodland Drive',              #mail_address
         'Indianpolis',                      #city
         'IN',                               #state
         '46278     '                        #zip
        ),
        (
         2,                                  #registration_id
         datetime.date(2022, 8, 3),          #posted_date
         12023,                              #applicable_period_start
         122023,                             #applicable_period_end
         True,                               #file_me
         True,                               #file_pv
         True,                               #file_mc
         True,                               #file_pc
         False,                              #file_dc
         True,                               #submitting_for_self
         'SFTP',                             #submission_method
         'active',                           #registration_status
         'insurance carrier',                #org_type
         'Golden Rule Insurance Company',    #business_name
         '7440 Woodland Drive',              #mail_address
         'Indianpolis',                      #city
         'IN',                               #state
         '46278     '                        #zip
        )
        ]
        registrations_entities = [
        (
         5, 1, 5, 46, 11111, 0, 5, 'Garretts Test Business 2', '11-0001111'
        ),
        (
         5, 2, 50000, 47, 1010, 1101, 1, 'A Second Test Entity', '00-0000000'
        )
        ]
        registrations_contacts = [
        (
         52,
         1,
         False,
         'Test Role',
         'Garrett Test Tester',
         '2222222222',
         'notarealemail@emailplace.email'
        ),
        (
         53,
         1,
         False,
         'A 2nd Test Role',
         'Test Garrett 2 Test',
         '5555555555',
         'testemail@testemail.emailtest'
        ),
        (
         54,
         2,
         True,
         'A 3rd and final test role',
         'Test 3rd Role Name Garrett',
         '0000000000',
         None
        )
        ]


        def _set_registration(reg, reg_ents, reg_conts):
            return {
                    'biz_name': reg[13],
                    'type': reg[12].title(),
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
                    'actions': actions,
                    'view_modal_content': _set_modal_content(reg, reg_ents, reg_conts)
                }
        def _set_entities(reg_ent):
            return {
                'claim_val': reg_ent[0],
                'claim_and_enc_vol': reg_ent[2],
                'license': reg_ent[4],
                'naic': reg_ent[5],
                'no_covered': reg_ent[6],
                'ent_name': reg_ent[7],
                'fein': reg_ent[8]
            }
        def _set_contacts(reg_cont):
            return {
                'notif': reg_cont[2],
                'role': reg_cont[3],
                'name': reg_cont[4],
                'phone': reg_cont[5],
                'email': reg_cont[6]
            }
        def _set_modal_content(reg, reg_ent, reg_cont):
            return {
                'biz_name': reg[13],
                'type': reg[12].title(),
                'city': reg[15],
                'state': reg[16],
                'address': reg[14],
                'zip': reg[17],
                'files_type': [
                        "Medical" if reg[6] else None,
                        "Provider" if reg[5] else None,
                        "Eligibility/Enrollment" if reg[4] else None,
                        "Pharmacy" if reg[7] else None,
                        "Dental" if reg[8] else None
                ],
                'for_self': reg[9],
                'sub_method': reg[10],
                'entities': [_set_entities(ent) for ent in reg_ent],
                'contacts': [_set_contacts(cont) for cont in reg_cont]
            }

        context['header'] = ['Business Name', 'Type', 'Location', 'Submission Method', 'Registration Status', 'Files to Submit', 'Actions']
        context['rows'] = []
        for registration in registrations_content:
            associated_entities = [ent for ent in registrations_entities if ent[1] == registration[0]]
            associated_contacts = [cont for cont in registrations_contacts if cont[1] == registration[0]]
            context['rows'].append(_set_registration(registration, associated_entities, associated_contacts))

        return context