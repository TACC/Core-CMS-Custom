from django.urls import path
from apps.registrations.views import RegistrationFormTemplate, RegistrationFormApi

app_name = 'registrations'
urlpatterns = [
    path('request-to-submit/', RegistrationFormTemplate.as_view(), name='register_form'),
    path('request-to-submit/api/', RegistrationFormApi.as_view(), name='register_form_api'),
]
