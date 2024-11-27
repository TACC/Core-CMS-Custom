from django.urls import path
from django.views.generic import TemplateView
from apps.admin_regis_table.views import RegistrationsTable

app_name = 'admin_regis_table'
urlpatterns = [
    path('list-registration-requests/', TemplateView.as_view(template_name='list_registrations.html'), name='admin_regis_table'),
    path('list-registration-requests/api/', RegistrationsTable.as_view(), name='admin_regis_table_api'),
    path('request-to-submit/api/<int:reg_id>/', RegistrationsTable.as_view(), name='admin_regis_update_api'),
]
