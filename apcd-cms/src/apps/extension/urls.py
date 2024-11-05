from django.urls import path
from django.views.generic import TemplateView
from apps.extension.views import ExtensionFormView

app_name = 'extension'
urlpatterns = [
    path('extension-request/', TemplateView.as_view(template_name='extension_submission_form/extension_submission_form.html'), name='extension'),
    path('extension/api/', ExtensionFormView.as_view(), name='extension-api'),
]
