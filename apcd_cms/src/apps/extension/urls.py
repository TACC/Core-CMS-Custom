from django.urls import path
from apps.extension.views import ExtensionFormTemplate, ExtensionFormApi

app_name = 'extension'
urlpatterns = [
    path('extension-request/', ExtensionFormTemplate.as_view(), name='extension'),
    path('extension/api/', ExtensionFormApi.as_view(), name='extension-api'),
]
