from django.urls import path
from apps.exception.views import ExceptionFormView
from . import views
from apps.exception.views import ExceptionOtherFormView
from apps.exception.views import ExceptionThresholdFormView

app_name = 'exception'
urlpatterns = [
    path('exception/', ExceptionFormView.as_view(), name="index"),
    path('threshold-exception/', ExceptionThresholdFormView.as_view(), name="threshold-exception"),
    path('get-cdls/<str:file_type>', views.get_cdls, name='get-cdls'),
    path('other-exception/', ExceptionOtherFormView.as_view(), name="other-exception")
]
