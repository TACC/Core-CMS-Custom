from curses.ascii import HT
from django.http import HttpResponse
from django.conf import settings
from django.template import loader
from django.views.generic.base import TemplateView


class RegistrationsTable(TemplateView):
    template_name = 'list_registrations.html'

    def get_context_data(self, **kwargs):
        ctx = super(RegistrationsTable, self).get_context_data(**kwargs)
        actions = 'View'
        ctx['header'] = ['Business Name', 'Type', 'City, State', 'Files to Submit', 'Submission Method', 'Registration Status', 'Actions']
        ctx['rows'] = [
            {'biz_name': 'charlie1', 'type': 'Insurance Carrier', 'location': 'Austin, TX', 'files_type': 'Eligibility/Enrollment', 'sub_method': 'HTTPS', 'reg_status': 'Active', 'actions': actions},
            {'biz_name': 'charlie1', 'type': 'Insurance Carrier', 'location': 'Austin, TX', 'files_type': 'Eligibility/Enrollment', 'sub_method': 'HTTPS', 'reg_status': 'Active', 'actions': actions},
            {'biz_name': 'charlie1', 'type': 'Insurance Carrier', 'location': 'Austin, TX', 'files_type': 'Eligibility/Enrollment', 'sub_method': 'HTTPS', 'reg_status': 'Active', 'actions': actions},
            {'biz_name': 'charlie1', 'type': 'Insurance Carrier', 'location': 'Austin, TX', 'files_type': 'Eligibility/Enrollment', 'sub_method': 'HTTPS', 'reg_status': 'Active', 'actions': actions},
            {'biz_name': 'charlie1', 'type': 'Insurance Carrier', 'location': 'Austin, TX', 'files_type': 'Eligibility/Enrollment', 'sub_method': 'HTTPS', 'reg_status': 'Active', 'actions': actions}
        ]
        ctx['modal_content'] = 'This is modal content'
        return ctx

