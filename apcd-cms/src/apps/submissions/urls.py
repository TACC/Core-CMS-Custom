from django.urls import path
from apps.submissions.views import SubmissionsTable
from apps.admin_regis_table.urls import RegistrationsTable

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', SubmissionsTable.as_view()),
]