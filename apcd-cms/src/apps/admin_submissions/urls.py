from django.urls import path
from django.views.generic import TemplateView
from apps.admin_submissions.views import AdminSubmissionsTable

app_name = 'administration'
urlpatterns = [
    path('list-submissions/', TemplateView.as_view(template_name='list_admin_submissions.html'), name="admin_submissions"),
    path(r'list-submissions/api/', AdminSubmissionsTable.as_view(), name="admin_submissions_api"),
    path(r'list-submissions/api/?status=(?P<status>)/', AdminSubmissionsTable.as_view(), name="admin_submissions_api"),
    path(r'list-submissions/api/?sort=(?P<sort>)/', AdminSubmissionsTable.as_view(), name="admin_submissions_api"),
    path(r'list-submissions/api/?sort=(?P<sort>)&filter=(?P<status>)/', AdminSubmissionsTable.as_view(), name="admin_submissions_api"),
]
