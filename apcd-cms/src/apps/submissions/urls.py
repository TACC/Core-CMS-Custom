from django.urls import path
from django.views.generic import TemplateView
from apps.submissions.views import SubmissionsTable, check_submitter_role

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', TemplateView.as_view(template_name='list_submissions.html'), name="list_submissions"),
    path(r'list-submissions/api/', SubmissionsTable.as_view(), name="list_submissions_api"),
    path(r'list-submissions/api/?status=(?P<status>)/', SubmissionsTable.as_view(), name="list_submissions_api"),
    path(r'list-submissions/api/?sort=(?P<sort>)/', SubmissionsTable.as_view(), name="list_submissions_api"),
    path(r'list-submissions/api/?sort=(?P<sort>)&filter=(?P<status>)/', SubmissionsTable.as_view(), name="list_submissions_api"),
]
