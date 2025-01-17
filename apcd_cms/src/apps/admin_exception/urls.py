from django.urls import path
from django.views.generic import TemplateView
from apps.admin_exception.views import AdminExceptionsTable, UpdateExceptionView

app_name = 'admin_exception'
urlpatterns = [
    path('list-exceptions/', TemplateView.as_view(template_name='list_admin_exception.html'), name="list_exceptions"),
    path('list-exceptions/api/', AdminExceptionsTable.as_view(), name='admin_exceptions_table_api'),
    path('exceptions/<int:exception_id>/', UpdateExceptionView.as_view(), name='update_exceptions'),
]
