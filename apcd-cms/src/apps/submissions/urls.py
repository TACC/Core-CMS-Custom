from django.urls import path
from apps.submissions.views import SubmissionsTable, submit_file_view

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', SubmissionsTable.as_view()),
    path('submit-file/', submit_file_view, name='submit'),
    # path('submit-file/', SubmissionsView.as_view()),
]
