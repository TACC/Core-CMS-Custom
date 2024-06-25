from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core.paginator import Paginator, EmptyPage
from django.views.generic.base import TemplateView
from django.template import loader
from apps.utils.apcd_database import get_all_extensions, update_extension 
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import table_filter
from apps.utils.utils import title_case
from apps.components.paginator.paginator import paginator
from dateutil import parser
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class AdminExtensionsTable(TemplateView):

    template_name = 'list_admin_extension.html'
    def post(self, request):

        form = request.POST.copy()

        def _err_msg(resp):
            if hasattr(resp, 'pgerror'):
                return resp.pgerror
            if isinstance(resp, Exception):
                return str(resp)
            return None

        def _edit_extension(form):
            errors = []
            extension_response = update_extension(form)
            if _err_msg(extension_response):
                errors.append(_err_msg(extension_response))
            if len(errors) != 0:
                logger.debug(print(errors))
                template = loader.get_template('edit_extension_error.html')
            else:
                logger.debug(print("success"))
                template = loader.get_template('edit_extension_success.html')
            return template

        template = _edit_extension(form)
        return HttpResponse(template.render({}, request))
    def get(self, request, *args, **kwargs):
        extension_content = get_all_extensions()

        #context = self.get_context_data(extension_content, *args,**kwargs)
        #template = loader.get_template(self.template_name)
        #return HttpResponse(template.render(context, request))
        context = self.get_extensions_list_json(extension_content, *args, **kwargs)
        return JsonResponse({'response': context})

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user): 
            return HttpResponseRedirect('/')
        return super(AdminExtensionsTable, self).dispatch(request, *args, **kwargs)

    def get_extensions_list_json(self, extensions, *args, **kwargs):
        context = {}

        context['header'] = ['Created', 'Entity Organization', 'Requestor Name', 'Extension Type', 'Outcome', 'Status', 'Approved Expiration', 'Actions']
        context['status_options'] = ['All']
        context['org_options'] = ['All']
        context['outcome_options'] = []
        context['extensions'] = []
        context['action_options'] = ['Select Action', 'View Record', 'Edit Record']

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        def getDate(row):
            date = row[2]
            return date if date is not None else datetimeDate(1,1,1) # put 'None' date entries all together at end of listing w/ date 1-1-0001

        extensions = sorted(extensions, key=lambda row:getDate(row), reverse=True)

        extensions_table_entries = []

        for extension in extensions:
            extensions_table_entries.append(self._set_extension(extension))
            context['extensions'].append(self._set_extension(extension))

            entity_name = title_case(extension[18])
            status = title_case(extension[7])
            outcome = title_case(extension[8])
            if entity_name not in context['org_options']:
                context['org_options'].append(entity_name)
                context['org_options'] = sorted(context['org_options'], key=lambda x: (x != 'All', x))
                # Remove empty strings
                context['org_options'] = [option for option in context['org_options'] if option != '']
            if status not in context['status_options']:
                context['status_options'].append(status)
                context['status_options'] = sorted(context['status_options'], key=lambda x: (x != 'All', x))
            if outcome not in context['outcome_options']:
                context['outcome_options'].append(outcome)
                context['outcome_options'] = sorted(context['outcome_options'], key=lambda x: (x is not None, x))

        queryStr = ''
        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')

        context['selected_status'] = None
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'
            extensions_table_entries = table_filter(status_filter, extensions_table_entries, 'ext_status')

        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            queryStr += f'&org={org_filter}'
            extensions_table_entries = table_filter(org_filter.replace("(", "").replace(")",""), extensions_table_entries, 'org_name')

        context['query_str'] = queryStr
        page_info = paginator(self.request, extensions_table_entries)
        context['page'] = [{'org_name': obj['org_name'], 'created': obj['created'], 'type': obj['type'], 'requestor': obj['requestor'], 'ext_outcome': obj['ext_outcome'], 'ext_status': obj['ext_status'], 'ext_id': obj['ext_id'], 'submitter_id': obj['submitter_id'], 'approved_expiration_date': obj['approved_expiration_date']} for obj in page_info['page']]

        #context['page'] = list(page_info['page'].object_list.values())
        context['pagination_url_namespaces'] = 'administration:admin_extension'
        return context

    def _set_extension(self, ext):
        return {
            'org_name': ext[18],
            'created': ext[9],
            'type': title_case(ext[5].replace('_', ' ')) if ext[5] else None,
            'requestor': title_case(ext[14]),
            'ext_outcome': title_case(ext[8]) if ext[8] else "None",
            'ext_status': title_case(ext[7]),
            'ext_id': ext[0],
            'submitter_id': ext[1],
            'approved_expiration_date': ext[4] if ext[4] else "None",
        }

    def get_context_data(self, extension_content, *args, **kwargs):
        context = super(AdminExtensionsTable, self).get_context_data(*args, **kwargs)
        def _set_extensions(extension):
            return {
                'extension_id': extension[0],
                'submitter_id': extension[1],
                'current_expected_date': extension[2],
                'requested_target_date': extension[3],
                'approved_expiration_date': extension[4],
                # to separate small carrier into two words
                'extension_type': title_case(extension[5].replace('_', ' ')) if extension[5] else None,
                'applicable_data_period': _get_applicable_data_period(extension[6]),
                'status': title_case(extension[7]),
                'outcome': title_case(extension[8]),
                'created_at': extension[9],
                'updated_at': extension[10],
                'submitter_code': extension[11],
                'payor_code': extension[12],
                'user_id': extension[13],
                'requestor_name': title_case(extension[14]),
                'requestor_email': extension[15],
                'explanation_justification': extension[16],
                'notes': extension[17],
                'entity_name': extension[18]
            }
        context['header'] = ['Created', 'Entity Organization', 'Requestor Name', 'Extension Type', 'Outcome', 'Status', 'Approved Expiration', 'Actions']
        context['status_options'] = ['All']
        context['org_options'] = ['All']
        context['outcome_options'] = []
        context['extensions'] = []

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        def getDate(row):
            date = row[9]
            return date if date is not None else parser.parse('1-1-0001')

        extension_content = sorted(extension_content, key=lambda row:getDate(row), reverse=True)  # sort extensions by newest to oldest

        extension_table_entries = []       
        for extension in extension_content:
            # to be used by paginator
            extension_table_entries.append(_set_extensions(extension))
            # to be able to access any extension in a template
            context['extensions'].append(_set_extensions(extension))
            entity_name = title_case(extension[18])
            status = title_case(extension[7])
            outcome = title_case(extension[8])
            if entity_name not in context['org_options']:
                context['org_options'].append(entity_name)
                context['org_options'] = sorted(context['org_options'], key=lambda x: (x != 'All', x))
                # Remove empty strings
                context['org_options'] = [option for option in context['org_options'] if option != '']
            if status not in context['status_options']:
                context['status_options'].append(status)
                context['status_options'] = sorted(context['status_options'], key=lambda x: (x != 'All', x))
            if outcome not in context['outcome_options']:
                context['outcome_options'].append(outcome)
                context['outcome_options'] = sorted(context['outcome_options'], key=lambda x: (x is not None, x))

        queryStr = ''
        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')

        context['selected_status'] = None
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'
            extension_table_entries = table_filter(status_filter, extension_table_entries, 'status')

        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            queryStr += f'&org={org_filter}'
            extension_table_entries = table_filter(org_filter.replace("(", "").replace(")",""), extension_table_entries, 'entity_name')

        context['query_str'] = queryStr
        context.update(paginator(self.request, extension_table_entries))
        context['pagination_url_namespaces'] = 'admin_extension:list_extensions'

        return context

# function converts int value in the format YYYYMM to a string with abbreviated month and year
def _get_applicable_data_period(value):
    try:
        return datetime.strptime(str(value), '%Y%m').strftime('%b. %Y')
    except:
        return None
