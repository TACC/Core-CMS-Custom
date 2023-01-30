from django.urls import path
from apps.submissions.views import SubmissionsTable

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', SubmissionsTable.as_view()),
]
