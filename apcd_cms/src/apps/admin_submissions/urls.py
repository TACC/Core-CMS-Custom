from django.urls import path
from apps.admin_submissions.views import AdminSubmissionsTable, AdminSubmissionsApi

app_name = 'administration'
urlpatterns = [
    path('list-submissions/', AdminSubmissionsTable.as_view(), name="admin_submissions"),
    path('list-submissions/api/', AdminSubmissionsApi.as_view(), name="admin_submissions_api"),
    path('list-submissions/api/options', AdminSubmissionsApi.as_view(), name='admin_submissions_api_options'),
    path('view_log', AdminSubmissionsApi.as_view(), name='admin-submissions-view-log'),

]
