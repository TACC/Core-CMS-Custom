from django.urls import path
from apps.exception.views import ExceptionFormTemplate, ExceptionFormApi


app_name = 'exception'
urlpatterns = [
    path('exception/', ExceptionFormTemplate.as_view(), name='exception'),
    path('exception/api/', ExceptionFormApi.as_view(), name='exception-api'),
]
