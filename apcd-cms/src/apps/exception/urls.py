from django.urls import path
from apps.exception.views import ExceptionFormView
from apps.exception.views import ExceptionOtherFormView
from apps.exception.views import ExceptionThresholdFormView

app_name = 'exception'
urlpatterns = [
    path('exception-request/', ExceptionFormView.as_view(), name="index"),
]
