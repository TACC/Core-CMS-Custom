from django.urls import path, re_path
from apps.admin_submissions.views import AdminSubmissionsTable

app_name = 'administration'
urlpatterns = [
    path('list-submissions/', AdminSubmissionsTable.as_view(), name="admin_submissions"),
    re_path(r'list-submissions/?status=(?P<status>)/', AdminSubmissionsTable.as_view(), name="admin_submissions"),
    re_path(r'list-submissions/?sort=(?P<sort>)/', AdminSubmissionsTable.as_view(), name="admin_submissions"),
    re_path(r'list-submissions/?sort=(?P<sort>)&filter=(?P<status>)/', AdminSubmissionsTable.as_view(), name="admin_submissions"),
]
