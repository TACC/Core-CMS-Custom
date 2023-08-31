from django.urls import path
from apps.submissions.views import SubmissionsTable, check_submitter_role

app_name = 'submissions'
urlpatterns = [
    path('check-submitter-role/', check_submitter_role),
]
