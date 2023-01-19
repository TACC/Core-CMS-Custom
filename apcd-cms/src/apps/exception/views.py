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

    def _err_msg(resp):
        if hasattr(resp, "pgerror"):
            return resp.pgerror
        if isinstance(resp, Exception):
            return str(resp)
        return None


class ExceptionThresholdFormView(View):

    """threshold_fields_pv = apcd_database.get_fields_and_thresholds_pv()
    threshold_fields_dc = apcd_database.get_fields_and_thresholds_dc()
    threshold_fields_mc = apcd_database.get_fields_and_thresholds_mc()
    threshold_fields_me = apcd_database.get_fields_and_thresholds_me()
    threshold_fields_pc = apcd_database.get_fields_and_thresholds_pc()"""

    def get(self, request):
        if request.user.is_authenticated and has_apcd_group(request.user):
            template = loader.get_template(
                "exception_submission_form/exception_threshold_form.html"
            )
            return HttpResponse(template.render({}, request))
        return HttpResponseRedirect("/")

    def post(self, request):
        submitter_cont = apcd_database.get_submitter_for_exception(
            request.user.username
        )

        def _err_msg(resp):
            if hasattr(resp, "pgerror"):
                return resp.pgerror
            if isinstance(resp, Exception):
                return str(resp)
            return None

        form = request.POST.copy()
        errors = []
        sub_data = [sub for sub in submitter_cont if sub[3] == request.user.username][0]
        if not _err_msg(sub_data):
            excep_resp = apcd_database.create_threshold_exception(form, sub_data)
        else:
            errors.append(_err_msg(excep_resp))

        # ===> Create Ticket

        if request.user.is_authenticated:
            username = request.user.username
            email = request.user.email
            first_name = request.user.first_name
            last_name = request.user.last_name
        else:
            return HttpResponseRedirect("/")

        tracker = rt.Rt(RT_HOST, RT_UN, RT_PW, http_auth=HTTPBasicAuth(RT_UN, RT_PW))
        tracker.login()

        subject = "New TX-APCD Portal Exception Submission"
        description = "APCD Exception Request Details\n"
        description += "=========================\n"
        description += "submitter_user:            {}\n".format(username)
        description += "submitter_user_email:      {}\n".format(email)
        description += "submitter_user_first_name: {}\n".format(first_name)
        description += "submitter_user_last_name:  {}\n".format(last_name)
        if len(errors):
            subject = "(ERROR): TX-APCD Portal Exception Submission"
            description += "Error(s):\n"
            for err_msg in errors:
                description += "{}\n".format(err_msg)
            template = loader.get_template(
                "exception_submission_form/exception_submission_error.html"
            )
            response = HttpResponse(template.render({}, request))
        else:
            template = loader.get_template(
                "exception_submission_form/exception_form_success.html"
            )
            response = HttpResponse(template.render({}, request))

        tracker.create_ticket(
            Queue=RT_QUEUE, Subject=subject, Text=description, Requestors=email
        )

        return response

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return HttpResponseRedirect("/")
        return super(ExceptionThresholdFormView, self).dispatch(
            request, *args, **kwargs
        )

    def get_context_data(self, submitter_cont, *args, **kwargs):
        context = super(ExceptionThresholdFormView, self).get_context_data(
            *args, **kwargs
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


"""  def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not apcd_groups.is_apcd_admin(request.user):
            return HttpResponseRedirect('/')
        return super(ExceptionThresholdFormView, self).dispatch(request, *args, **kwargs)
    
    def get_field_data(self, threshold_fields_pv=threshold_fields_pv, threshold_fields_dc=threshold_fields_dc,
        threshold_fields_mc=threshold_fields_mc, threshold_fields_me=threshold_fields_me, threshold_fields_pc=threshold_fields_pc, *args, **kwargs):
        context = super(ExceptionThresholdFormView, self).get_field_data(*args, **kwargs)

        def _set_select_options(excep, excep_type):
            return {
                _set_threshold_values(threshold_fields_dc if excep_type.file_type == 'dc' else None,
                threshold_fields_mc if excep_type.file_type == 'mc' else None,
                threshold_fields_me if excep_type.file_type == 'me' else None,
                threshold_fields_pv if excep_type.file_type == 'pv' else None,
                threshold_fields_pc if excep_type.file_type == 'pc' else None)
            }
        def _set_threshold_values(excep_type):
            return {
                'field_code': excep_type[0],
                'field_name': excep_type[1],
                'field_threshold': excep_type[2]
            }
        context['option'] = []
        for fields in excep:
            context['option'].append(_set_select_options(fields, fields_per_file))
        
        return context """


class ExceptionOtherFormView(View):
    def get(self, request):
        if request.user.is_authenticated and has_apcd_group(request.user):
            template = loader.get_template(
                "exception_submission_form/exception_other_form.html"
            )
            return HttpResponse(template.render({}, request))
        return HttpResponseRedirect("/")

    def post(self, request):
        def _err_msg(resp):
            if hasattr(resp, "pgerror"):
                return resp.pgerror
            if isinstance(resp, Exception):
                return str(resp)
            return None

        submitter_cont = apcd_database.get_submitter_for_exception(
            request.user.username
        )
        if _err_msg(submitter_cont):
            errors.append(_err_msg(submitter_cont))
        form = request.POST.copy()
        errors = []
        sub_data = [sub for sub in submitter_cont if sub[3] == request.user.username][0]
        if _err_msg(sub_data):
            errors.append(_err_msg(sub_data))

        if request.user.is_authenticated:
            username = request.user.username
            email = request.user.email
            first_name = request.user.first_name
            last_name = request.user.last_name
        else:
            return HttpResponseRedirect("/")

        excep_resp = apcd_database.create_other_exception(form, sub_data)
        if _err_msg(excep_resp):
            errors.append(_err_msg(excep_resp))

        # ===> Create Ticket
        tracker = rt.Rt(RT_HOST, RT_UN, RT_PW, http_auth=HTTPBasicAuth(RT_UN, RT_PW))
        tracker.login()

        subject = "New TX-APCD Portal Exception Submission"
        description = "APCD Exception Request Details\n"
        description += "=========================\n"
        description += "submitter_user:            {}\n".format(username)
        description += "submitter_user_email:      {}\n".format(email)
        description += "submitter_user_first_name: {}\n".format(first_name)
        description += "submitter_user_last_name:  {}\n".format(last_name)
        if len(errors):
            subject = "(ERROR): TX-APCD Portal Exception Submission"
            description += "Error(s):\n"
            for err_msg in errors:
                description += "{}\n".format(err_msg)
            template = loader.get_template(
                "exception_submission_form/exception_submission_error.html"
            )
            response = HttpResponse(template.render({}, request))
        else:
            template = loader.get_template(
                "exception_submission_form/exception_form_success.html"
            )
            response = HttpResponse(template.render({}, request))

        tracker.create_ticket(
            Queue=RT_QUEUE, Subject=subject, Text=description, Requestors=email
        )

        return response

    def get_context_data(self, submitter_cont, *args, **kwargs):
        context = super(ExceptionOtherFormView, self).get_context_data(*args, **kwargs)

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
