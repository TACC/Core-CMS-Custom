from django.contrib.auth import authenticate
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.views.generic import View
from apps.submission_form import apcd_database
import logging
import json

logger = logging.getLogger(__name__)


class SubmissionFormView(View):
    def get(self, request):
        user = authenticate(request)
        if user:
            template = loader.get_template('submission_form/submission_form.html')
            return HttpResponse(template.render({}, request))
        else:
            return HttpResponseRedirect('/')
    
    def post(self, request):
        form = request.POST.copy()

        reg_id = apcd_database.create_registration(form)
        apcd_database.create_registration_contact(form, reg_id)
        apcd_database.create_registration_entity(form, reg_id)

        template = loader.get_template('submission_form/submission_success.html')
        return HttpResponse(template.render({}, request))
