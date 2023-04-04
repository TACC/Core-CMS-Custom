from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.views.generic import TemplateView
from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from apps.utils.utils import title_case
import logging

logger = logging.getLogger(__name__)

class ExceptionFormView(TemplateView):
    template_name = "exception_submission_form/exception_selection_page.html"

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(ExceptionFormView, self).dispatch(request, *args, **kwargs)
class ExceptionThresholdFormView(TemplateView):
    def get_template_names(self):
        submitters = self.request.session.get("submitters")
        ## If no submitter_id for user, should not show form but show error page
        if all(submitter[0] is None for submitter in submitters):
            return ["exception_submission_form/exception_err_no_sub_id.html"]
        else:
            return ["exception_submission_form/exception_threshold_form.html"]

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(ExceptionThresholdFormView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):
        context = super(ExceptionThresholdFormView, self).get_context_data(*args, **kwargs)

        user = self.request.user.username

        submitters = apcd_database.get_submitter_for_extend_or_except(user)

        file_type = self.request.GET.get('file_type')

        context['file_type'] = file_type


        cdls = apcd_database.get_cdl_exceptions(file_type)

        self.request.session['submitters'] = submitters
        self.request.session['cdls'] = cdls
        self.request.session['file_type'] = file_type

        def _set_submitter(sub):
            return {
                "submitter_id": sub[0],
                "submitter_code": sub[1],
                "payor_code": sub[2],
                "user_name": sub[3],
                "org_name": title_case(sub[4])
            }

        def _set_cdl(file_type):
            return {
                "field_list_code": file_type[0],
                "field_list_value": file_type[1],
                "threshold_value": file_type[2]
            }

        context["submitters"] = []

        for submitter in submitters:
            context["submitters"].append(_set_submitter(submitter))

        context["cdls"] = []

        for cdl in cdls:
            context['cdls'].append(_set_cdl(cdl))

        return context

    def post(self, request):
        if (request.user.is_authenticated) and has_apcd_group(request.user):

            form = request.POST.copy()
            errors = []
            submitters = request.session.get('submitters')

            submitter = next(submitter for submitter in submitters if int(submitter[0]) == int(form['business-name']))
            if _err_msg(submitter):
                errors.append(_err_msg(submitter))       
            
            except_response = apcd_database.create_threshold_exception(form, submitter)
            if _err_msg(except_response):
                errors.append(_err_msg(except_response))

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
            return HttpResponseRedirect('/')
class ExceptionOtherFormView(TemplateView):
    def get_template_names(self):
        submitters = self.request.session.get("submitters")
        ## If no submitter_id for user should not show form but show error page
        if all(submitter[0] is None for submitter in submitters):
            return ["exception_submission_form/exception_err_no_sub_id.html"]
        else:
            return ["exception_submission_form/exception_other_form.html"]

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(ExceptionOtherFormView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):
        context = super(ExceptionOtherFormView, self).get_context_data(*args, **kwargs)

        user = self.request.user.username

        submitters = apcd_database.get_submitter_for_extend_or_except(user)
        
        self.request.session['submitters'] = submitters

        def _set_submitter(sub):
            return {
                "submitter_id": sub[0],
                "submitter_code": sub[1],
                "payor_code": sub[2],
                "user_name": sub[3],
                "org_name": title_case(sub[4])
            }

        context["submitters"] = []

        for submitter in submitters:
            context["submitters"].append(_set_submitter(submitter))

        return context

    def post(self, request):
        if (request.user.is_authenticated) and has_apcd_group(request.user):

            form = request.POST.copy()
            errors = []
            submitters = request.session.get('submitters')

            submitter = next(submitter for submitter in submitters if int(submitter[0]) == int(form['business-name']))
            
            if _err_msg(submitter):
                errors.append(_err_msg(submitter))

            except_response = apcd_database.create_other_exception(form, submitter)
            if _err_msg(except_response):
                errors.append(_err_msg(except_response))

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
            return HttpResponseRedirect('/')

def _err_msg(resp):
    if hasattr(resp, "pgerror"):
        return resp.pgerror
    if isinstance(resp, Exception):
        return str(resp)
    return None