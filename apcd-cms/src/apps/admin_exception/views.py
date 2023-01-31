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
from apps.utils.apcd_database import get_all_exceptions
from apps.utils.apcd_groups import is_apcd_admin


logger = logging.getLogger(__name__)

RT_HOST = getattr(settings, 'RT_HOST', '')
RT_UN = getattr(settings, 'RT_UN', '')
RT_PW = getattr(settings, 'RT_PW', '')
RT_QUEUE = getattr(settings, 'RT_QUEUE', '')

class AdminExceptionsTable(TemplateView):

    template_name = 'list_admin_exception.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user): 
            return HttpResponseRedirect('/')
        return super(AdminExceptionsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):

        context = super(AdminExceptionsTable, self).get_context_data(*args, **kwargs)

        exception_content = get_all_exceptions()

        def _set_exceptions(exception):
            return {
                'exception_id': exception[0],
                'submitter_id': exception[1],
                'requestor_name': exception[2],
                'request_type': exception[3],
                'explanation_justification': exception[4],
                'outcome': exception[5],
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
                'status': exception[19],
                'notes': exception[20],
                'org_name': exception[21]
            }

        context['header'] = ['Created', 'Organization', 'Requestor Name', 'Request Type', 'Outcome', 'Status', 'Actions']
        exceptions = []

        for exception in exception_content:
            exceptions.append(_set_exceptions(exception))

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        p = Paginator(exceptions, 10)

        try:
            page = p.page(page_num)
        except EmptyPage:
            page = p.page(1)

        context['page'] = page
        context['page_num'] = int(page_num)
        context['num_pages'] = range(1, p.num_pages + 1)

        return context