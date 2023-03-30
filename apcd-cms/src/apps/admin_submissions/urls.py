from django.urls import path
from apps.admin_submissions.views import AdminSubmissionsTable

app_name = 'administration'
urlpatterns = [
    path('list-submissions/', AdminSubmissionsTable.as_view(), name="admin_submissions"),
]
