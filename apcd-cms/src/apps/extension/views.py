from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.views.generic.base import TemplateView
from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from apps.utils.utils import title_case
import logging

logger = logging.getLogger(__name__)


class ExtensionFormView(TemplateView):

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(ExtensionFormView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):
        context = super(ExtensionFormView, self).get_context_data(*args, **kwargs)
        
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
            context['submitters'].append(_set_submitter(submitter))
        return context

    def get_template_names(self):
        submitters = self.request.session.get("submitters")
   
        ## If no submitter_id for user should not show form but show error page
        if submitters and all((submitter[0] is not None for submitter in submitters)):
            del self.request.session['submitters']
            return ["extension_submission_form/extension_submission_form.html"]
        else:
            del self.request.session['submitters']
            return ["extension_submission_form/extension_err_no_sub_id.html"]

    def post(self, request):
        if (request.user.is_authenticated) and has_apcd_group(request.user):
            
            form = request.POST.copy()
            errors= []
            submitters = request.session.get('submitters')
            

            submitter = next(submitter for submitter in submitters if int(submitter[0]) == int(form['business-name']))

            max_iterations = 1
            
            for i in range(2, 6):
                if form.get('current-expected-date_{}'.format(i)):
                    max_iterations += 1
                else:
                    break

            for iteration in range(max_iterations):
                exten_resp = apcd_database.create_extension(form, iteration + 1, submitter)
                if _err_msg(exten_resp):
                    errors.append(_err_msg(exten_resp))

            if len(errors):
                template = loader.get_template('extension_submission_form/extension_submission_error.html')
                response = HttpResponse(template.render({}, request))
            else:
                template = loader.get_template('extension_submission_form/extension_form_success.html')
                response = HttpResponse(template.render({}, request))

            del request.session['submitters']
            return response
        else:
            del request.session['submitters']
            return HttpResponseRedirect('/')


def _err_msg(resp):
    if hasattr(resp, 'pgerror'):
        return resp.pgerror
    if isinstance(resp, Exception):
        return str(resp)
    return None
