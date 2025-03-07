from django.urls import path
from apps.admin_extension.views import AdminExtensionsTable, AdminExtensionsApi, UpdateExtensionsApi


app_name = 'admin_extension'
urlpatterns = [
    path('list-extensions/', AdminExtensionsTable.as_view(), name="list_extensions"),
    path('list-extensions/api/', AdminExtensionsApi.as_view(), name='admin_extensions_table_api'),
    path('update-extension/<int:ext_id>/', UpdateExtensionsApi.as_view(), name='update_extension'),
]
