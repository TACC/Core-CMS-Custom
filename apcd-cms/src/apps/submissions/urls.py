from django.urls import path
from apps.submissions.views import SubmissionsTable, check_submit_access

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', SubmissionsTable.as_view()),
    path('check-access/', check_submit_access, name='submit'),
]
