from django.urls import path
from apps.submissions.views import SubmissionsTable

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', SubmissionsTable.as_view()),
    path('exception/', ExceptionFormView.as_view(), name="exception"),
    path('threshold-exception/', ExceptionThresholdFormView.as_view(), name="threshold-exception"),
    path('other-exception/', ExceptionOtherFormView.as_view(), name="other-exception")
]
