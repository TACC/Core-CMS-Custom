from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core.paginator import Paginator, EmptyPage
from django.views.generic.base import TemplateView
from django.template import loader
from apps.utils.apcd_database import get_all_extensions, update_extension 
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import table_filter
from apps.utils.utils import title_case
from src.apps.utils.extensions_data_formatting import _set_extension
from apps.components.paginator.paginator import paginator
from dateutil import parser
from datetime import datetime
from datetime import date as datetimeDate
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
        logger.info('get request received')
        extensions_content = get_all_extensions()

        #context = self.get_extension_list_json(extensions_content, *args, **kwargs)
        return JsonResponse({'response': "" })

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user): 
            return HttpResponseRedirect('/')
        return super(AdminExtensionsTable, self).dispatch(request, *args, **kwargs)

    def get_extension_list_json(self, extensions_content, *args, **kwargs):
        context = {}

        context['header'] = ['Created', 'Entity Organization', 'Requestor Name', 'Extension Type', 'Outcome', 'Status', 'Approved Expiration', 'Actions']
        context['status_options'] = ['All', 'Received', 'Processing', 'Complete']
        context['org_options'] = ['All']

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        def getDate(row):
            date = row[1]
            return date if date is not None else datetimeDate(1,1,1) # put 'None' date entries all together at end of listing w/ date 1-1-0001

        extensions_content = sorted(extensions_content, key=lambda row:getDate(row), reverse=True)  # sort extensions by newest to oldest

        extension_table_entries = []
        for extension in extensions_content:
            extension_table_entries.append(_set_extension(extension))
            org_name = extension[7]
            if org_name not in context['org_options']:
                context['org_options'].append(org_name)

        queryStr = ''
        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')

        context['selected_status'] = None
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            queryStr += f'&status={status_filter}'
            extension_table_entries = table_filter(status_filter, extension_table_entries, 'reg_status')

        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            queryStr += f'&org={org_filter}'
            extension_table_entries = table_filter(org_filter.replace("(", "").replace(")",""), extension_table_entries, 'biz_name')

        context['query_str'] = queryStr
        page_info = paginator(self.request, extension_table_entries)
        context['page'] = [{'biz_name': obj['biz_name'], 'year': obj['year'], 'type': obj['type'], 'location': obj['location'], 'reg_status': obj['reg_status'], 'reg_id': obj['reg_id']} for obj in page_info['page']]

        #context['page'] = list(page_info['page'].object_list.values())
        context['pagination_url_namespaces'] = 'administration:extension-table'
        return context

# function converts int value in the format YYYYMM to a string with abbreviated month and year
def _get_applicable_data_period(value):
    try:
        return datetime.strptime(str(value), '%Y%m').strftime('%b. %Y')
    except:
        return None