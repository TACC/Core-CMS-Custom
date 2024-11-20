from django.urls import path, re_path
from apps.submissions.views import SubmissionsTable, check_submitter_role

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', SubmissionsTable.as_view(), name="list_submissions"),
    re_path(r'list-submissions/?status=(?P<status>)/', SubmissionsTable.as_view(), name="list_submissions"),
    re_path(r'list-submissions/?sort=(?P<sort>)/', SubmissionsTable.as_view(), name="list_submissions"),
    re_path(r'list-submissions/?sort=(?P<sort>)&status=(?P<status>)/', SubmissionsTable.as_view(), name="list_submissions"),
    path('check-submitter-role/', check_submitter_role),
]
