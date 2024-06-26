from django.urls import path
from django.views.generic import TemplateView
from apps.admin_regis_table.views import RegistrationsTable

app_name = 'admin_regis_table'
urlpatterns = [
    path('list-registration-requests/', TemplateView.as_view(template_name='list_registrations.html'), name='admin_regis_table'),
    path(r'list-registration-requests/api/', RegistrationsTable.as_view(), name='admin_regis_table_api'),
    path(r'list-registration-requests/api/?status=(?P<status>)/', RegistrationsTable.as_view(), name='admin_regis_table_api'),
    path(r'list-registration-requests/api/?org=(?P<org>)/', RegistrationsTable.as_view(), name='admin_regis_table_api'),
    path(r'list-registration-requests/api/?status=(?P<status>)&org=(?P<org>)/', RegistrationsTable.as_view(), name='admin_regis_table_api')
]
