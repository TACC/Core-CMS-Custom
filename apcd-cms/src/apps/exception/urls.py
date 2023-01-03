from django.urls import path
from apps.exception.views import ExceptionFormView

app_name = 'exception'
urlpatterns = [
    path('exception-request/', ExceptionFormView.as_view(), name='index')
]
