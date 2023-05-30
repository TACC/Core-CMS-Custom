from django.urls import path
from apps.admin_submissions.views import AdminSubmissionsTable

app_name = 'administration'
urlpatterns = [
    path('list-submissions/', AdminSubmissionsTable.as_view(), name="admin_submissions"),
    path(r'list-submissions/?filter=(?P<filter>)/', AdminSubmissionsTable.as_view(), name="admin_submissions"),
    path(r'list-submissions/?sort=(?P<sort>)/', AdminSubmissionsTable.as_view(), name="admin_submissions"),
    path(r'list-submissions/?filter=(?P<filter>)&sort=(?P<sort>)/', AdminSubmissionsTable.as_view(), name="admin_submissions"),
]
