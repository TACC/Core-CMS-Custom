from django.urls import path
from apps.extension.views import ExtensionFormView
from . import views

app_name = 'extension'
urlpatterns = [
    path('extension-request/', ExtensionFormView.as_view(), name='index'),
    path('get-expected-date/', views.get_expected_date, name='get-expected-date'),
]
