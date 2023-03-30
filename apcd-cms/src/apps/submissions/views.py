from django.http import HttpResponseRedirect, JsonResponse
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required
from apps.utils.apcd_database import get_user_submissions_and_logs
from apps.utils.apcd_groups import has_apcd_group
from apps.utils.utils import title_case
from apps.components.paginator.paginator import paginator
import logging
from dateutil import parser

logger = logging.getLogger(__name__)


class SubmissionsTable(TemplateView):

    template_name = 'list_submissions.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super(SubmissionsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):

        context = super(SubmissionsTable, self).get_context_data(*args, **kwargs)

        user = self.request.user.username

        submission_content = get_user_submissions_and_logs(user)

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        limit = 50
        offset = limit * (page_num - 1)

        # modifies the object fields for display, only modifies a subset of entries that will be displayed 
        # on the current page using offset and limit
        for s in submission_content[offset:offset + limit]:
            s['status'] = title_case(s['status'])
            s['outcome'] = title_case(s['outcome'])
            s['received_timestamp'] = parser.parse(s['received_timestamp']) if s['received_timestamp'] else None
            s['updated_at'] = parser.parse(s['updated_at']) if s['updated_at'] else None
            s['view_modal_content'] = [{
                **t,
                'outcome': title_case(t['outcome'])
            } for t in (s['view_modal_content'] or [])]


        context['header'] = ['Received', 'File Name', ' ', 'Outcome', 'Status', 'Last Updated', 'Actions']

        context.update(paginator(self.request, submission_content))
        context['pagination_url_namespaces'] = 'submissions:list_submissions'

        return context


@login_required
def check_submitter_role(request):
    logger.info("Checking submitter access for user: %s", request.user.username)

    return JsonResponse({"is_submitter": has_apcd_group(request.user)})
