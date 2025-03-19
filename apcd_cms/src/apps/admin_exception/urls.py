from django.urls import path
from apps.admin_exception.views import AdminExceptionsTable, AdminExceptionsApi, UpdateExceptionApi

app_name = 'admin_exception'
urlpatterns = [
    path('list-exceptions/', AdminExceptionsTable.as_view(), name="list_exceptions"),
    path('list-exceptions/api/', AdminExceptionsApi.as_view(), name='admin_exceptions_table_api'),
    path('exceptions/<int:exception_id>/', UpdateExceptionApi.as_view(), name='update_exceptions'),
]
