from django.urls import path
from apps.submissions.views import SubmissionsTable
from apps.exception.views import ExceptionFormView, ExceptionThresholdFormView, ExceptionOtherFormView

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', SubmissionsTable.as_view()),
]
