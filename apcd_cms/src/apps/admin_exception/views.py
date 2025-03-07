from django.http import JsonResponse
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_all_exceptions, update_exception
from apps.utils.utils import title_case, table_filter
from apps.components.paginator.paginator import paginator
from dateutil import parser
from apps.base.base import BaseAPIView, APCDAdminAccessAPIMixin, APCDAdminAccessTemplateMixin
import logging
import json

logger = logging.getLogger(__name__)


class AdminExceptionsTable(APCDAdminAccessTemplateMixin, TemplateView):
    template_name = 'list_admin_exception.html'


class AdminExceptionsApi(APCDAdminAccessAPIMixin, BaseAPIView):

    def get(self, *args, **kwargs):
        exception_content = get_all_exceptions()

        context = self.get_exception_list_json(exception_content, *args, **kwargs)
        return JsonResponse({'response': context})

    def get_exception_list_json(self, exception_content, *args, **kwargs):
        context = {}

        context['header'] = ['Created', 'Entity Organization', 'Requestor Name', 'Exception Type', 'Outcome', 'Status', 'Actions']
        context['status_options'] = ['All']
        context['org_options'] = ['All']
        context['outcome_modal_options'] = ['None', 'Granted', 'Denied', 'Withdrawn']
        context['status_modal_options'] = ['None', 'Complete', 'Pending']
        context['exceptions'] = []
        context['action_options'] = ['Select Action', 'View Record', 'Edit Record']

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        queryStr = ''
        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')
        def _set_exception(exception): 
            return {
                'exception_id': exception[0],
                'submitter_id': exception[1],
                'requestor_name': exception[2],
                'request_type': title_case(exception[3]) if exception[3] else None, # to make sure if val doesn't exist, utils don't break page
                'explanation_justification': exception[4],
                'outcome': title_case(exception[5]) if exception[5] else 'None',
                'outcome': title_case(exception[5]) if exception[5] else 'None',
                'created_at': exception[6],
                'updated_at': exception[7],
                'submitter_code': exception[8],
                'payor_code': exception[9],
                'user_id': exception[10],
                'requestor_email': exception[11],
                'data_file': exception[12],
                'field_number': exception[13],
                'required_threshold': exception[14],
                'requested_threshold': exception[15],
                'requested_expiration_date': exception[16],
                'approved_threshold': exception[17],
                'approved_expiration_date': exception[18],
                'status': title_case(exception[19]) if exception[19] else 'None',
                'status': title_case(exception[19]) if exception[19] else 'None',
                'notes': exception[20],
                'entity_name': exception[21],
                'data_file_name': exception[22],
                'view_modal_content': {
                    'exception_id': exception[0],
                    'created_at':  exception[6],
                    'requestor_name': exception[2],
                    'requestor_email': exception[11],
                    'request_type': title_case(exception[3]) if exception[3] else None,
                    'status': title_case(exception[19]) if exception[3] else None,
                    'outcome': title_case(exception[5]) if exception[3] else None,
                    'data_file_name': exception[22],
                    'field_number': exception[13],
                    'required_threshold': exception[14],
                    'requested_threshold': exception[15],
                    'approved_threshold': exception[17],
                    'requested_expiration_date': exception[16],
                    'approved_expiration_date': exception[18],
                    'explanation_justification': exception[4],
                    'notes': exception[20],
                    'entity_name': exception[21],
                    'updated_at': exception[7],
                }
            }
        def getDate(row):
            date = row[6]
            return date if date is not None else parser.parse('1-1-0001')

        # sort exceptions by newest to oldest
        exception_content = sorted(exception_content, key=lambda row:getDate(row), reverse=True) 

        limit = 50
        offset = limit * (page_num - 1)

        exception_table_entries = []       
        for exception in exception_content:
            # to be used by paginator
            exception_table_entries.append(_set_exception(exception))
            # to be able to access any exception in a template using exceptions var in the future
            context['exceptions'].append(_set_exception(exception))
            entity_name = title_case(exception[21])
            status = title_case(exception[19]) if exception[19] else 'None'
            outcome = title_case(exception[5]) if exception[5] else 'None'
            if entity_name not in context['org_options']:
                context['org_options'].append(entity_name)
                # to make sure All is first in the dropdown filter options after sorting alphabetically
                context['org_options'] = sorted(context['org_options'], key=lambda x: (x != 'All', x))
                # Remove empty strings
                context['org_options'] = [option for option in context['org_options'] if option != '']
            if status not in context['status_options']:
                if status != None:
                    context['status_options'].append(status)
                    # to make sure All is first in the dropdown filter options after sorting alphabetically
                    context['status_options'] = sorted(context['status_options'], key=lambda x: (x != 'Pending', x))

        context['selected_status'] = None
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'
            exception_table_entries = table_filter(status_filter, exception_table_entries, 'status')

        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            queryStr += f'&org={org_filter}'
            exception_table_entries = table_filter(org_filter.replace("(", "").replace(")",""), exception_table_entries, 'entity_name')

        context['query_str'] = queryStr
        page_info = paginator(page_num, exception_table_entries, limit)
        context['page'] = [{'entity_name': obj['entity_name'], 'created_at': obj['created_at'], 'request_type': obj['request_type'], 
                            'requestor_name': obj['requestor_name'], 'outcome': obj['outcome'], 'status': obj['status'], 
                            'approved_threshold': obj['approved_threshold'],'approved_expiration_date': obj['approved_expiration_date'], 
                            'notes': obj['notes'], 'exception_id': obj['exception_id'], 'view_modal_content': obj['view_modal_content'],
                            'requested_threshold': obj['requested_threshold'],} 
                            for obj in page_info['page']]

        context['page_num'] = page_num
        context['total_pages'] = page_info['page'].paginator.num_pages

        context['pagination_url_namespaces'] = 'admin_submission:admin_submissions'

        return context


class UpdateExceptionApi(APCDAdminAccessAPIMixin, BaseAPIView):
    def _err_msg(self, resp):
        if hasattr(resp, 'pgerror'):
            return resp.pgerror
        if isinstance(resp, Exception):
            return str(resp)
        return None

    def put(self, request, exception_id):
        data = json.loads(request.body)
        errors = []
        exception_response = update_exception(data)
        if self._err_msg(exception_response):
            errors.append(self._err_msg(exception_response))
        if len(errors) != 0:
            logger.debug(print(errors))
            return JsonResponse({'message': 'Cannot edit exception'}, status=500)

        return JsonResponse({'message': 'Exception updated successfully'})
