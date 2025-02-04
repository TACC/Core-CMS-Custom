from django.urls import path
from django.views.generic import TemplateView
from apps.admin_extension.views import AdminExtensionsTable, UpdateExtensionsView


app_name = 'admin_extension'
urlpatterns = [
    path('list-extensions/', TemplateView.as_view(template_name='list_admin_extension.html'), name="list_extensions"),
    path('list-extensions/api/', AdminExtensionsTable.as_view(), name='admin_extensions_table_api'),
    path('update-extension/<int:ext_id>/', UpdateExtensionsView.as_view(), name='update_extension'),
]
