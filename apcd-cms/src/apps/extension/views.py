from django.http import JsonResponse, HttpResponseRedirect
from django.views.generic.base import TemplateView
from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from apps.utils.utils import title_case
from datetime import datetime
import logging
import json

logger = logging.getLogger(__name__)


class ExtensionFormView(TemplateView):

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(ExtensionFormView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        """
        Handle GET request to return form data as JSON
        """
        user = request.user.username
        submitters = apcd_database.get_submitter_info(user)
        
        # Prepare context data for JSON response
        context = {
            "submitters": [],
            "applicable_data_periods": []
        }

        # Build context data
        for submitter in submitters: 
            context['submitters'].append(self._set_submitter(submitter))
            applicable_data_periods = apcd_database.get_applicable_data_periods(submitter[0])
            for data_period_tuple in applicable_data_periods:
                for data_period in data_period_tuple:
                    data_period = self._get_applicable_data_period(data_period)
                    context['applicable_data_periods'].append(data_period)

        context['applicable_data_periods'] = sorted(context['applicable_data_periods'], reverse=True)
        return JsonResponse(context)

    def post(self, request):
        """
        Handle form submission and return JSON response for success/failure
        """
        if request.user.is_authenticated and has_apcd_group(request.user):
            form = json.loads(request.body)
            extensions = form['extensions']
            errors = []
            submitters = apcd_database.get_submitter_info(request.user.username)
            for extension in extensions:
                submitter = next(submitter for submitter in submitters if int(submitter[0] == int(extension['businessName'])))
                exten_resp = apcd_database.create_extension(form, extension, submitter)
                if self._err_msg(exten_resp):
                    errors.append(self._err_msg(exten_resp))

            # Return success or error as JSON
            if errors:
                logger.error("Extension request failed. Errors: %s", errors)
                return JsonResponse({'status': 'error', 'errors': errors}, status=400)
            else:
                return JsonResponse({'status': 'success'}, status=200)
        else:
            return HttpResponseRedirect('/')

    def _set_submitter(self, sub):
        """
        Helper function to structure the submitter info 
        """
        return {
            "submitter_id": sub[0],
            "submitter_code": sub[1],
            "payor_code": sub[2],
            "user_name": sub[3],
            "entity_name": title_case(sub[4])
        }

    def _get_applicable_data_period(self, value):
        """
        Helper function to convert date format
        """
        try:
            return datetime.strptime(str(value), '%Y%m').strftime('%Y-%m')
        except Exception:
            return None

    def _err_msg(self, resp):
        """
        Helper function to extract error messages
        """
        if hasattr(resp, 'pgerror'):
            return resp.pgerror
        if isinstance(resp, Exception):
            return str(resp)
        return None

def get_expected_date(request):
    """
    Handle AJAX request to get expected date based on submitter and applicable data period
    """
    applicable_data_period = request.GET.get('applicable_data_period')
    submitter_id = request.GET.get('submitter_id')
    expected_date = apcd_database.get_current_exp_date(submitter_id=submitter_id, applicable_data_period=applicable_data_period)

    return JsonResponse(expected_date, safe=False)
