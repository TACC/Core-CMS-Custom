from django.urls import path
from apps.admin_regis_table.views import RegistrationsTable

app_name = 'admin_regis_table'
urlpatterns = [
    path('list-registration-requests/', RegistrationsTable.as_view(), name='admin_regis_table'),
    path(r'list-registration-requests/?status=(?P<status>)/', RegistrationsTable.as_view(), name='admin_regis_table'),
    path(r'list-registration-requests/?org=(?P<org>)/', RegistrationsTable.as_view(), name='admin_regis_table'),
    path(r'list-registration-requests/?status=(?P<status>)&org=(?P<org>)/', RegistrationsTable.as_view(), name='admin_regis_table')
]
