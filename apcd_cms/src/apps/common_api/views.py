from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from django.views.generic import TemplateView
from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group
from apps.utils.utils import title_case
from datetime import datetime
import logging
import json

logger = logging.getLogger(__name__)

class EntitiesView(TemplateView):
    def get(self, request, *args, **kwargs):
        submitters = apcd_database.get_submitter_info(request.user.username)

        submitter_info_json = self.get_submitter_info_json(submitters)

        context = {**submitter_info_json}
        return JsonResponse({'response': context})

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(EntitiesView, self).dispatch(request, *args, **kwargs)

    def get_submitter_info_json(self, submitters):
        context = {}

        def _get_applicable_data_period(value):
            try:
                return datetime.strptime(str(value), '%Y%m').strftime('%Y-%m')
            except Exception:
                return None

        def _set_submitter(sub, data_periods):
            return {
                "submitter_id": sub[0],
                "submitter_code": sub[1],
                "payor_code": sub[2],
                "user_name": sub[3],
                "entity_name": title_case(sub[4]),
                "data_periods": data_periods
            }

        context["submitters"] = []

        for submitter in submitters:
            data_periods = []
            submitter_id = submitter[0]
            applicable_data_periods = apcd_database.get_applicable_data_periods(submitter[0])
            for data_period_tuple in applicable_data_periods:
                for data_period in data_period_tuple:
                    data_period = _get_applicable_data_period(data_period)
                    expected_dates = apcd_database.get_current_exp_date(submitter_id=submitter_id, applicable_data_period=data_period.replace('-', ''))
                    data_periods.append({
                        'data_period': data_period,
                        'expected_date': expected_dates[0][0] if expected_dates else ''
                    })
            data_periods = sorted(data_periods, key=lambda x: x['data_period'], reverse=True)
            context["submitters"].append(_set_submitter(submitter, data_periods))

        return context

class cdlsView(TemplateView):
    def get(self, request, *args, **kwargs):
        file_type = kwargs.get('file_type')
        
        cdls = apcd_database.get_cdl_exceptions(file_type)
        
        cdls_response = []

        def _set_cdls(cdl):
            return {
                "field_list_code": cdl[0],
                "field_list_value": cdl[1],
                "threshold_value": cdl[2],
            }

        for cdl in cdls:
            cdls_response.append(_set_cdls(cdl))

        return JsonResponse({"cdls": cdls_response})
