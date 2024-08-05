from django.urls import path
from django.views.generic import TemplateView
from apps.admin_exception.views import AdminExceptionsTable

app_name = 'admin_exception'
urlpatterns = [
    path('list-exceptions/', TemplateView.as_view(template_name='list_admin_exception.html'), name="list_exceptions"),
    path('list-exceptions/<str:status>', AdminExceptionsTable.as_view(), name='status'),
    path('list-exceptions/<str:org>', AdminExceptionsTable.as_view(), name='org'),
    path('list-exceptions/<str:status><str:org>', AdminExceptionsTable.as_view(), name='status_org'),
    path(r'list-exceptions/api/', AdminExceptionsTable.as_view(), name='admin_exceptions_table_api'),
    path(r'list-exceptions/api/?status=(?P<status>)/', AdminExceptionsTable.as_view(),
         name='admin_exceptions_table_api'),
    path(r'list-exceptions/api/?org=(?P<org>)/', AdminExceptionsTable.as_view(), name='admin_exceptions_table_api'),
    path(r'list-exceptions/api/?status=(?P<status>)&org=(?P<org>)/', AdminExceptionsTable.as_view(),
         name='admin_exceptions_table_api')
]
