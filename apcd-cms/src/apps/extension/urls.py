from django.urls import path
from apps.extension.views import ExtensionFormView

app_name = 'extension'
urlpatterns = [
    path('extension-request/', ExtensionFormView.as_view(), name='index')
]
