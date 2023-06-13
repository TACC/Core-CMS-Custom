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
import datetime
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

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user): 
            return HttpResponseRedirect('/')
        return super(AdminExtensionsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):

        context = super(AdminExtensionsTable, self).get_context_data(*args, **kwargs)
        extension_content  = get_all_extensions()


        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        def _set_extensions(extension):
            return {
                'extension_id': extension[0],
                'submitter_id': extension[1],
                'current_expected_date': extension[2],
                'requested_target_date': extension[3],
                'approved_expiration_date': extension[4],
                # to separate small carrier into two words
                'extension_type': title_case(extension[5].replace('_', ' ')) if extension[6] else None,
                'applicable_data_period': _get_applicable_data_period(extension[6]) if extension[6] else None,
                'status': title_case(extension[7]) if extension[7] else None,
                'outcome': title_case(extension[8]) if extension[8] else None,
                'created_at': extension[9],
                'updated_at': extension[10],
                'submitter_code': extension[11],
                'payor_code': extension[12],
                'user_id': extension[13],
                'requestor_name': title_case(extension[14]) if extension[14] else None,
                'requestor_email': extension[15],
                'explanation_justification': extension[16],
                'notes': extension[17],
                'org_name': extension[18]
            }

        context['header'] = ['Created', 'Organization', 'Requestor Name', 'Extension Type', 'Outcome', 'Status', 'Approved Expiration', 'Actions']
        context['status_options'] = ['All']
        context['org_options'] = ['All']
        context['outcome_options'] = []
        context['extensions'] = []



        def getDate(row):
            date = row[1]
            return date if date is not None else parser.parse('1-1-0001')

        extension_content = sorted(extension_content, key=lambda row:getDate(row), reverse=True)  # sort extensions by newest to oldest
        extension_table_entries = []       
        for extension in extension_content:
            # to be used by paginator
            extension_table_entries.append(_set_extensions(extension))
            # to be able to access any extension in a template
            context['extensions'].append(_set_extensions(extension))
            org_name = title_case(extension[18])
            status = title_case(extension[7])
            outcome = title_case(extension[8])
            if org_name not in context['org_options']:
                context['org_options'].append(org_name)
                context['org_options'] = sorted(context['org_options'])
            if status not in context['status_options']:
                context['status_options'].append(status)
                context['status_options'] = sorted(context['status_options'])
            if outcome not in context['outcome_options']:
                context['outcome_options'].append(outcome)
                context['outcome_options'] = context['outcome_options']

        
        context['selected_status'] = None
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            extension_table_entries = table_filter(status_filter, extension_table_entries, 'status')

        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            extension_table_entries = table_filter(org_filter.replace("(", "").replace(")",""), extension_table_entries, 'org_name')


        queryStr = '?'
        if len(self.request.META['QUERY_STRING']) > 0:
            queryStr = queryStr + self.request.META['QUERY_STRING'].replace(f'page={page_num}', '') + ('&' if self.request.GET.get('page') is None else '')
        context['query_str'] = queryStr
        context.update(paginator(self.request, extension_table_entries))
        context['pagination_url_namespaces'] = 'admin_extension:list_extensions'

        p = Paginator(extension_table_entries, 10)

        try:
            page = p.page(page_num)
        except EmptyPage:
            page = p.page(1)

        context['page'] = page
        context['page_num'] = int(page_num)
        context['num_pages'] = range(1, p.num_pages + 1)
        context['extensions'].append(extension_table_entries)

        return context

# function converts int value in the format YYYYMM to a string with abbreviated month and year
def _get_applicable_data_period(value):
    try: 
        return datetime.strptime(str(value), '%Y%m').strftime('%b. %Y')
    except:
        return None