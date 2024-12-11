from django.http import HttpResponseRedirect, JsonResponse, Http404
from django.views.generic import TemplateView
from apps.utils import apcd_database
from apps.utils.apcd_groups import has_apcd_group, is_apcd_admin
from apps.utils.utils import title_case
from datetime import datetime
import logging

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
            data_periods = _getApplicableDataPeriods(submitter[0])
            context["submitters"].append(_set_submitter(submitter, data_periods))

        return context


class cdlsView(TemplateView):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(cdlsView, self).dispatch(request, *args, **kwargs)

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


class DataPeriodsView(TemplateView):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return HttpResponseRedirect('/')
        return super(DataPeriodsView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        submitter_id = request.GET.get('submitter_id', None)
        if submitter_id is None:
            raise Http404("Submitter Id not provided")
        applicable_data_periods = _getApplicableDataPeriods(submitter_id)

        return JsonResponse({'response': {"data_periods": applicable_data_periods}})


def _getApplicableDataPeriods(submitter_id):
    def _get_applicable_data_period(value):
        try:
            return datetime.strptime(str(value), '%Y%m').strftime('%Y-%m')
        except Exception:
            return None

    data_periods = []
    applicable_data_periods = apcd_database.get_applicable_data_periods(submitter_id)
    for data_period_tuple in applicable_data_periods:
        for data_period in data_period_tuple:
            data_period = _get_applicable_data_period(data_period)
            expected_dates = apcd_database.get_current_exp_date(submitter_id=submitter_id, applicable_data_period=data_period.replace('-', ''))
            data_periods.append({
                'data_period': data_period,
                'expected_date': expected_dates[0][0] if expected_dates else ''
            })
    data_periods = sorted(data_periods, key=lambda x: x['data_period'], reverse=True)
    return data_periods