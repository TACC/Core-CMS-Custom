from django.urls import path
from django.views.generic import TemplateView
from apps.registrations.views import RegistrationFormView

app_name = 'registrations'
urlpatterns = [
    path('request-to-submit/', TemplateView.as_view(template_name='registration_form.html'), name='register_form'),
    path('request-to-submit/api/', RegistrationFormView.as_view(), name='register_form_api'),
]
