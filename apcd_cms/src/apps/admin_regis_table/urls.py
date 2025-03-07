from django.urls import path
from apps.admin_regis_table.views import RegistrationsTable, RegistrationsApi, RegistrationsPostApi

app_name = 'admin_regis_table'
urlpatterns = [
    path('list-registration-requests/', RegistrationsTable.as_view(), name='admin_regis_table'),
    path('list-registration-requests/api/', RegistrationsApi.as_view(), name='admin_regis_table_api'),
    path('request-to-submit/api/<int:reg_id>/', RegistrationsPostApi.as_view(), name='admin_regis_update_api'),
]
