from apps.utils import apcd_database
from apps.utils.apcd_groups import is_apcd_admin
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.views.generic import View
from django.core.paginator import Paginator, EmptyPage
from requests.auth import HTTPBasicAuth
import logging
from django.views.generic.base import TemplateView
import rt
from apps.utils.apcd_database import get_all_extensions
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import title_case


logger = logging.getLogger(__name__)

RT_HOST = getattr(settings, 'RT_HOST', '')
RT_UN = getattr(settings, 'RT_UN', '')
RT_PW = getattr(settings, 'RT_PW', '')
RT_QUEUE = getattr(settings, 'RT_QUEUE', '')

class AdminExtensionsTable(TemplateView):

    template_name = 'list_admin_extension.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user): 
            return HttpResponseRedirect('/')
        return super(AdminExtensionsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):

        context = super(AdminExtensionsTable, self).get_context_data(*args, **kwargs)

        extension_content = get_all_extensions()

        def _set_extensions(extension):
            return {
                'extension_id': extension[0],
                'submitter_id': extension[1],
                'current_expected_date': extension[2],
                'requested_target_date': extension[3],
                'approved_expiration_date': extension[4],
                'extension_type': title_case(extension[5]),
                'applicable_data_period': extension[6].date() if extension[6] else None,
                'status': title_case(extension[7]),
                'outcome': title_case(extension[8]),
                'created_at': extension[9],
                'updated_at': extension[10],
                'submitter_code': extension[11],
                'payor_code': extension[12],
                'user_id': extension[13],
                'requestor_name': extension[14],
                'requestor_email': extension[15],
                'explanation_justification': extension[16],
                'notes': extension[17],
                'org_name': extension[18]
            }

        context['header'] = ['Created', 'Organization', 'Requestor Name', 'Extension Type', 'Outcome', 'Status', 'Actions']
        extensions = []

        for extension in extension_content:
            extensions.append(_set_extensions(extension))

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        p = Paginator(extensions, 10)

        try:
            page = p.page(page_num)
        except EmptyPage:
            page = p.page(1)

        context['page'] = page
        context['page_num'] = int(page_num)
        context['num_pages'] = range(1, p.num_pages + 1)

        return context