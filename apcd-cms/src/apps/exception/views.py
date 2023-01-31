from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group, is_apcd_admin
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.views.generic import View
from requests.auth import HTTPBasicAuth
import logging
import rt

logger = logging.getLogger(__name__)

RT_HOST = getattr(settings, "RT_HOST", "")
RT_UN = getattr(settings, "RT_UN", "")
RT_PW = getattr(settings, "RT_PW", "")
RT_QUEUE = getattr(settings, "RT_QUEUE", "")


class ExceptionFormView(View):
    def get(self, request):
        if request.user.is_authenticated and has_apcd_group(request.user):
            template = loader.get_template(
                "exception_submission_form/exception_selection_page.html"
            )
            return HttpResponse(template.render({}, request))
        return HttpResponseRedirect("/")

class ExceptionThresholdFormView(View):
    submitter = apcd_database.get_submitter_for_extend_or_except()
    def get(self, request):
        if request.user.is_authenticated and has_apcd_group(request.user):
            template = loader.get_template(
                "exception_submission_form/exception_threshold_form.html"
            )
            return HttpResponse(template.render({}, request))
        return HttpResponseRedirect("/")

    def post(self, request, submitter_cont= submitter):


        form = request.POST.copy()
        errors = []
        sub_data = [sub for sub in submitter_cont if sub[3] == request.user.username][0]
        if not _err_msg(sub_data):
            excep_resp = apcd_database.create_threshold_exception(form, sub_data)
        else:
            errors.append(_err_msg(excep_resp))

        if len(errors):
            template = loader.get_template(
                "exception_submission_form/exception_submission_error.html"
            )
            response = HttpResponse(template.render({}, request))
        else:
            template = loader.get_template(
                "exception_submission_form/exception_form_success.html"
            )
            response = HttpResponse(template.render({}, request))

        return response

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return HttpResponseRedirect("/")
        return super(ExceptionThresholdFormView, self).dispatch(
            request, *args, **kwargs
        )

    def get_context_data(self, request, *args, **kwargs):
        context = super(ExceptionThresholdFormView, self).get_context_data(
            *args, **kwargs
        )
        submitter_cont =  apcd_database.get_submitter_for_exception(
            request.user.username
        )

        def _set_submitter(sub):
            return {
                "submitter_id": sub[0],
                "submitter_code": sub[1],
                "payor_code": sub[2],
                "user_name": sub[3],
            }

        context["submitter"] = []
        for submitter, value in submitter_cont.items():
            context["submitter"].append(_set_submitter(submitter))
        return context

class ExceptionOtherFormView(View):
    submitter = apcd_database.get_submitter_for_extend_or_except()
    def get(self, request):
        if request.user.is_authenticated and has_apcd_group(request.user):
            template = loader.get_template(
                "exception_submission_form/exception_other_form.html"
            )
            return HttpResponse(template.render({}, request))
        return HttpResponseRedirect("/")

    def post(self, request, submitter_cont=submitter):
        if request.user.is_authenticated and has_apcd_group(request.user):

            if _err_msg(submitter_cont):
                errors.append(_err_msg(submitter_cont))
            form = request.POST.copy()
            errors = []
            sub_data = [sub for sub in submitter_cont if sub[3] == request.user.username][0]
            if _err_msg(sub_data):
                errors.append(_err_msg(sub_data))

            excep_resp = apcd_database.create_other_exception(form, sub_data)
            if _err_msg(excep_resp):
                errors.append(_err_msg(excep_resp))

            if len(errors):
                template = loader.get_template(
                    "exception_submission_form/exception_submission_error.html"
                )
                response = HttpResponse(template.render({}, request))
            else:
                template = loader.get_template(
                    "exception_submission_form/exception_form_success.html"
                )
                response = HttpResponse(template.render({}, request))

            return response
        else:
            return HttpResponseRedirect("/")

    def get_context_data(self, request, *args, **kwargs):
        context = super(ExceptionOtherFormView, self).get_context_data(*args, **kwargs)
        submitter_cont =  apcd_database.get_submitter_for_exception(
            request.user.username
        )
        def _set_submitter(sub):
            return {
                "submitter_id": sub[0],
                "submitter_code": sub[1],
                "payor_code": sub[2],
                "user_name": sub[3],
            }

        context["submitter"] = []
        for submitter, value in submitter_cont.items():
            context["submitter"].append(_set_submitter(submitter))
        return context

def _err_msg(resp):
    if hasattr(resp, "pgerror"):
        return resp.pgerror
    if isinstance(resp, Exception):
        return str(resp)
    return None