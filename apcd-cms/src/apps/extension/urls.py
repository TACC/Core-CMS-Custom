from django.urls import path
from django.views.generic import TemplateView
from apps.extension.views import ExtensionFormView
from . import views

app_name = 'extension'
urlpatterns = [
    path('extension-request/', TemplateView.as_view(template_name='extension_submission_form/extension_submission_form.html'), name='extension'),
    path('get-expected-date/', views.get_expected_date, name='get-expected-date'),
    path('extension/api/', ExtensionFormView.as_view(), name='extension-api'),
]
