from django.urls import path
from django.views.generic import TemplateView
from apps.submissions.views import SubmissionsTable, check_submitter_role

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', TemplateView.as_view(template_name='list_submissions.html'), name="list_submissions"),
    path('list-submissions/api/', SubmissionsTable.as_view(), name="list_submissions_api"),
    path('list-submissions/api/options', SubmissionsTable.as_view(), name="list_submissions_api_options"),
    path('view_log', SubmissionsTable.as_view(), name='submission-view-log'),
    path('check-submitter-role/', check_submitter_role),
]