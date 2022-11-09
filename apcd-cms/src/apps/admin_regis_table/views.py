from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
<<<<<<< HEAD
from django.shortcuts import render
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_registration_entities
import logging

logger = logging.getLogger(__name__)
=======
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_registration_entities
>>>>>>> Update view with util functions for context data to be passed to modal template


class RegistrationsTable(TemplateView):
    template_name = 'list_registrations.html'

    def get_context_data(self, *args, **kwargs):
        context = super(RegistrationsTable, self).get_context_data(*args, **kwargs)
        actions = 'View'
        registrations_content = get_registrations()
        registrations_entities = get_registration_entities()
        registrations_contacts = get_registration_contacts()


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
