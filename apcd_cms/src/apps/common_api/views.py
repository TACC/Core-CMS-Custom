from django.http import JsonResponse, Http404
from apps.utils import apcd_database
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import title_case
from apps.base.base import BaseAPIView, APCDSubmitterAdminAccessAPIMixin, APCDGroupAccessAPIMixin
from datetime import datetime
import logging
import json

logger = logging.getLogger(__name__)


class EntitiesView(APCDGroupAccessAPIMixin, BaseAPIView):
    def get(self, request, *args, **kwargs):
        from_admin = json.loads(request.GET.get('from_admin', False))  # for admin submissions page, need all submitters, not just for requesting user
        if from_admin and not is_apcd_admin(request.user):
            return JsonResponse({'error': 'Unauthorized'}, status=403)
        user = request.user.username if not from_admin else None
        submitters = apcd_database.get_submitter_info(user)

        submitter_info_json = self.get_submitter_info_json(submitters)

        context = {**submitter_info_json}
        return JsonResponse({'response': context})

    def get_submitter_info_json(self, submitters):
        context = {}

        def _set_submitter(sub):
            return {
                "submitter_id": sub[0],
                "submitter_code": sub[1],
                "payor_code": sub[2],
                "user_name": sub[3],
                "entity_name": title_case(sub[4]),
                "org_name": sub[5]
            }

        context["submitters"] = []

        for submitter in submitters:
            checkForExistingCode = [submitter[2] == listed_submitter["payor_code"] for listed_submitter in context['submitters']]
            if not any(checkForExistingCode):  # grab unique payor codes
                context["submitters"].append(_set_submitter(submitter))

        return context


class cdlsView(APCDGroupAccessAPIMixin, BaseAPIView):
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


class DataPeriodsView(APCDSubmitterAdminAccessAPIMixin, BaseAPIView):
    '''
        Requires admin access to view data period for any given submitter.
    '''
    def get(self, request, *args, **kwargs):
        submitter_id = request.GET.get('submitter_id', None)
        if submitter_id is None:
            raise Http404("Submitter Id not provided")
        if not is_apcd_admin(request.user):
            # if user is not apcd admin, then submitter admin
            # should have access to the submitter
            submitters = apcd_database.get_submitter_info(request.user.username)
            if not any(submitter_id == str(submitter[0]) for submitter in submitters):
                return JsonResponse({'error': f'Unauthorized for submitter id {submitter_id}'}, status=403)

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
