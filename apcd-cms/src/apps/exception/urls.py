from django.urls import path
from apps.exception.views import ExceptionFormView
from apps.exception.views import ExceptionOtherFormView
from apps.exception.views import ExceptionThresholdFormView

app_name = 'exception'
urlpatterns = [
    path('exception/', ExceptionFormView.as_view(), name="index"),
    path('threshold-exception/', ExceptionThresholdFormView.as_view(), name="threshold-exception"),
    path('submissions/threshold-exception/<str:file_type>/', ExceptionThresholdFormView.as_view(), name='file_type'),
    path('other-exception/', ExceptionOtherFormView.as_view(), name="other-exception")
]
