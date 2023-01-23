from django.urls import path
from apps.submissions.views import SubmissionsTable
from apps.admin_regis_table.urls import RegistrationsTable
from apps.exception.views import ExceptionFormView, ExceptionThresholdFormView, ExceptionOtherFormView

app_name = 'submissions'
urlpatterns = [
    path('list-submissions/', SubmissionsTable.as_view()),
    path('exception/', ExceptionFormView.as_view(), name="exception"),
    path('threshold-exception/', ExceptionThresholdFormView.as_view(), name="threshold-exception"),
    path('other-exception/', ExceptionOtherFormView.as_view(), name="other-exception")
]
