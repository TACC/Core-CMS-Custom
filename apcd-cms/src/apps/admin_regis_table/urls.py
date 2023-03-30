from django.urls import path
from apps.admin_regis_table.views import RegistrationsTable

app_name = 'administration'
urlpatterns = [
    path('list-registration-requests/', RegistrationsTable.as_view(), name='admin_regis_table'),
    path(r'list-registration-requests/?filter=(?P<filter>)/', RegistrationsTable.as_view(), name='admin_regis_table'),
]
