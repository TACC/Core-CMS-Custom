from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_registrations
import logging

logger = logging.getLogger(__name__)


class RegistrationsTable(TemplateView):
    template_name = 'list_registrations.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or \
           not request.user.groups.filter(name='APCD_ADMIN').exists():
            return HttpResponseRedirect('/')

    def get_context_data(self, *args, **kwargs):
        context = super(RegistrationsTable, self).get_context_data(*args, **kwargs)
        actions = 'View'
        registrations_content = get_registrations()


        def _set_registration(reg):
            return {
                    'biz_name': reg[13],
                    'type': reg[12].title(),
                    'location': '{city}, {state}'.format
                        (
                            city=reg[15],
                            state=reg[16]
                        ),
                    'files_type': [
                        "Medical" if reg[4] else None,
                        "Provider" if reg[5] else None,
                        "Eligibility/Enrollment" if reg[6] else None,
                        "Pharmacy" if reg[7] else None,
                        "Dental" if reg[8] else None
                    ],
                    'sub_method': reg[10],
                    'reg_status': reg[11].title(),
                    'actions': actions
                }

        context['header'] = ['Business Name', 'Type', 'Location', 'Submission Method', 'Registration Status', 'Files to Submit', 'Actions']
        context['rows'] = []
        for registration in registrations_content:
            context['rows'].append(_set_registration(registration))
        context['modal_content'] = 'This is modal content'
        return context