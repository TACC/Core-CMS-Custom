from django.urls import path
from apps.submissions.views import SubmissionsTable, SubmissionsView, check_submitter_role

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', SubmissionsTable.as_view(), name="list_submissions"),
    path('list-submissions/api/', SubmissionsView.as_view(), name="list_submissions_api"),
    path('list-submissions/api/options', SubmissionsView.as_view(), name="list_submissions_api_options"),
    path('view_log', SubmissionsView.as_view(), name='submission-view-log'),
    path('check-submitter-role/', check_submitter_role),
]