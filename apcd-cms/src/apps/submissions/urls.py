from django.urls import path
from apps.submissions.views import SubmissionsTable, check_submitter_role

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', SubmissionsTable.as_view(), name="list_submissions"),
    path(r'list-submissions/?filter=(?P<filter>)/', SubmissionsTable.as_view(), name="list_submissions"),
    path(r'list-submissions/?sort=(?P<sort>)/', SubmissionsTable.as_view(), name="list_submissions"),
    path(r'list-submissions/?filter=(?P<filter>)&sort=(?P<sort>)/', SubmissionsTable.as_view(), name="list_submissions"),
    path('check-submitter-role/', check_submitter_role),
]
