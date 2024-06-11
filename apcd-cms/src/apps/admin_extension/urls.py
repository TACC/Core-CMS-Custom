from django.urls import path
from django.views.generic import TemplateView
from apps.admin_extension.views import AdminExtensionsTable

app_name = 'admin_extension_table'

urlpatterns = [
    path('list-extensions/', TemplateView.as_view(template_name='list_admin_extension.html'), name='admin_extension_table'),
    path(r'list-extensions/api/', AdminExtensionsTable.as_view(), name='admin_extension_table_api'),
    path(r'list-extensions/api/?status=(?P<status>)/', AdminExtensionsTable.as_view(), name='admin_extension_table_api'),
    path(r'list-extensions/api/?org=(?P<org>)/', AdminExtensionsTable.as_view(), name='admin_extension_table_api'),
    path(r'list-extensions/api/?status=(?P<status>)&org=(?P<org>)/', AdminExtensionsTable.as_view(), name='admin_extension_table_api')
]