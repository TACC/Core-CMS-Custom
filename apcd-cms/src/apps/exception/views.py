from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from django.views.generic import TemplateView
from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from apps.utils.utils import title_case
import logging
import json

logger = logging.getLogger(__name__)

class ExceptionFormView(TemplateView):
    def post(self, request):
        logger.debug("Am I here" * 10)
        if (request.user.is_authenticated) and has_apcd_group(request.user):
            form = request.POST.copy()
            logger.debug(print(form))
            errors = []
            submitters = apcd_database.get_submitter_info(request.user.username)
            # To create counter of exception requests and corresponding fields
            max_iterations = 1
            for i in range(2, 6):
                if form.get('field-threshold-exception_{}'.format(i)):
                    max_iterations += 1
                else:
                    break

            for iteration in range(max_iterations):
                submitter = next(submitter for submitter in submitters if int(submitter[0]) == int(form['business-name_{}'.format(iteration + 1)]))
                if _err_msg(submitter):
                    errors.append(_err_msg(submitter))
                except_response = apcd_database.create_threshold_exception(form, iteration + 1, submitter)
                if _err_msg(except_response):
                    errors.append(_err_msg(except_response))

            if errors:
                return JsonResponse({'status': 'error', 'errors': errors}, status=400)
            else:
                return JsonResponse({'status': 'success'}, status=200)

        else:
            return HttpResponseRedirect('/')

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(ExceptionFormView, self).dispatch(request, *args, **kwargs)

def _err_msg(resp):
    if hasattr(resp, "pgerror"):
        return resp.pgerror
    if isinstance(resp, Exception):
        return str(resp)
    return None
