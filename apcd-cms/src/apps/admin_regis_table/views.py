from curses.ascii import HT
from django.http import HttpResponse
from django.conf import settings
from django.template import loader
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_registrations


class RegistrationsTable(TemplateView):
    template_name = 'list_registrations.html'

    def get_context_data(self, **kwargs):
        ctx = super(RegistrationsTable, self).get_context_data(**kwargs)
        actions = 'View'
        registrations_content = get_registrations()
        ctx['header'] = ['Business Name', 'Type', 'City, State', 'Files to Submit', 'Submission Method', 'Registration Status', 'Actions']
        ctx['rows'] = [
            {'biz_name': registrations_content[0][13], 'type': registrations_content[0][12], 'location': '{city}, {state}'.format(city=registrations_content[0][14],state=registrations_content[0][15]), 'files_type': registrations_content[0][4:9], 'sub_method': registrations_content[0][10], 'reg_status': registrations_content[0][11], 'actions': actions},
            {'biz_name': registrations_content[1][13], 'type': registrations_content[1][12], 'location': '{city}, {state}'.format(city=registrations_content[1][14],state=registrations_content[1][15]), 'files_type': registrations_content[1][4:9], 'sub_method': registrations_content[1][10], 'reg_status': registrations_content[1][11], 'actions': actions},
            {'biz_name': registrations_content[2][13], 'type': registrations_content[2][12], 'location': '{city}, {state}'.format(city=registrations_content[2][14],state=registrations_content[2][15]), 'files_type': registrations_content[2][4:9], 'sub_method': registrations_content[2][10], 'reg_status': registrations_content[2][11], 'actions': actions},
            {'biz_name': registrations_content[3][13], 'type': registrations_content[3][12], 'location': '{city}, {state}'.format(city=registrations_content[3][14],state=registrations_content[3][15]), 'files_type': registrations_content[3][4:9], 'sub_method': registrations_content[3][10], 'reg_status': registrations_content[3][11], 'actions': actions},
            {'biz_name': registrations_content[4][13], 'type': registrations_content[4][12], 'location': '{city}, {state}'.format(city=registrations_content[4][14],state=registrations_content[4][15]), 'files_type': registrations_content[4][4:9], 'sub_method': registrations_content[4][10], 'reg_status': registrations_content[4][11], 'actions': actions},
        ]
        ctx['modal_content'] = 'This is modal content'
        return ctx

