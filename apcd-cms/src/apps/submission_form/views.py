from django.http import HttpResponse
from django.template import loader
from django.views.generic import View
from apps.submission_form import apcd_database
import logging
import json

logger = logging.getLogger(__name__)

class SubmissionFormView(View):
    def get(self, request):
        template = loader.get_template('submission_form/submission_form.test.html')
        return HttpResponse(template.render({}, request))
    
    def post(self, request):
        form = request.POST.copy()
        print(json.dumps(form))

        reg_id = apcd_database.create_registration(form)
        for iteration in range(1,6):
            apcd_database.create_registration_contact(form, reg_id, iteration)
            apcd_database.create_registration_entity(form, reg_id, iteration)

        template = loader.get_template('submission_form/submission_success.html')
        return HttpResponse(template.render({}, request))
