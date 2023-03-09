from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
from apps.utils.apcd_database import get_all_submissions_and_logs
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import title_case
from apps.components.paginator.paginator import paginator
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class AdminSubmissionsTable(TemplateView):

    template_name = 'list_admin_submissions.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user): 
            return HttpResponseRedirect('/')
        return super(AdminSubmissionsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):

        context = super(AdminSubmissionsTable, self).get_context_data(*args, **kwargs)

        submission_content = get_all_submissions_and_logs()

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        limit = 50
        offset = limit * (page_num - 1)

        # modifies the object fields for display, only modifies a subset of entries that will be displayed 
        # on the current page using offset and limit
        submission_content_updated = [{
            **s,
            'status': title_case(s['status']),
            'outcome': title_case(s['outcome']),
            'received_timestamp': datetime.strptime(s['received_timestamp'], '%Y-%m-%dT%H:%M:%S.%f'),
            'updated_at': datetime.strptime(s['updated_at'], '%Y-%m-%dT%H:%M:%S.%f'),
            'view_modal_content': [{
                **t,
                'outcome': title_case(t['outcome'])
            } for t in s['view_modal_content']]
        } for s in submission_content[offset:offset + limit]]

        if page_num == 1:
            submission_content = submission_content_updated + submission_content[offset + limit:]
        else: 
            submission_content = submission_content[0:offset] + submission_content_updated + submission_content[offset + limit:]

        context['header'] = ['Received', 'Organization', 'File Name', ' ', 'Outcome', 'Status', 'Last Updated', 'Actions']

        context.update(paginator(self.request, submission_content))
        context['pagination_url_namespaces'] = 'admin_submission:admin_submissions'
        return context
