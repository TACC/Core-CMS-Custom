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

        submitters = [ (2, 'TESTGOLD', 10000001, 'gmunoz1', 'CHCD'), (3, 'TESTGOLD', 10000002, 'gmunoz1', 'CHCD'), (1, 'TESTGOLD', 10000000, 'gmunoz1', 'CHCD') ]

        file_type = self.request.GET.get('file_type')

        context['file_type'] = file_type


        self.request.session['submitters'] = submitters
        
        self.request.session['file_type'] = file_type

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

def get_cdls(self, request, file_type):
        # cdls = super(ExceptionThresholdFormView, self).get_cdls(file_type)
    # put the db call here, returning a static list for testing
    cdls =  [('CDLME001', 'Data Submitter Code', '100'),
('CDLME004', 'Member\nInsurance/Product\nCategory Code', '90'),
('CDLME005', 'Start Year of\nSubmission ', '100'),
('CDLME006', 'Start Month\nof Submission ', '100'),
('CDLME007', 'Insured Group or Policy Number', '80'),
('CDLME009', 'Medicaid AID Category ', '50'),
('CDLME011', 'Plan Specific Contract Number', '60'),
('CDLME012', 'Subscriber Last Name ', '100'),
('CDLME013', 'Subscriber First Name ', '100'),
('CDLME015', 'Sequence Number ', '100'),
('CDLME017', 'Individual Relationship\nCode', '90'),
('CDLME018', 'Member Gender ', '90'),
('CDLME019', 'Member Date of Birth ', '90'),
('CDLME020', 'Member Last Name ', '100'),
('CDLME021', 'Member First Name ', '100'),
('CDLME023', 'Member Street Address', '60'),
('CDLME024', 'Member City Name ', '60'),
('CDLME025', 'Member State or Province', '80'),
('CDLME026', 'Member ZIP Code ', '80'),
('CDLME036', 'Medical Coverage\nUnder This Plan', '90'),
('CDLME037', 'Pharmacy Coverage\nUnder This Plan', '90'),
('CDLME039', 'Behavioral Health\nCoverage Under This\nPlan', '90'),
('CDLME040', 'Primary Insurance Indicator', '100'),
('CDLME041', 'Coverage Type ', '50'),
('CDLME045', 'Group Name ', '60'),
('CDLME050', 'Plan Effective Date ', '90'),
('CDLME061', 'Carrier Specific Unique\nMember ID', '95'),
('CDLME062', 'Carrier Specific Unique\nSubscriber ID', '95'),
('CDLME064', 'High Deductible Plan Indicator', '50'),
('CDLME899', 'Record Type ', '100')]
        
    def _set_cdl(cdlCall):
        return {
            "field_list_code": cdlCall[0],
            "field_list_value": cdlCall[1],
            "threshold_value": cdlCall[2]
        }
# request.session['cdls'] = cdls
# request.session['file_type'] = file_type

    cdls['cdls'] = []

    for cdl in cdls:
        cdls['cdls'].append(_set_cdl(cdl))

    return cdls

def _err_msg(resp):
    if hasattr(resp, "pgerror"):
        return resp.pgerror
    if isinstance(resp, Exception):
        return str(resp)
    return None