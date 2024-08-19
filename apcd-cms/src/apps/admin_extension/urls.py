from django.urls import path
from django.views.generic import TemplateView
from apps.admin_extension.views import AdminExtensionsTable


app_name = 'admin_extension'
urlpatterns = [
    path('list-extensions/',  TemplateView.as_view(template_name='list_admin_extension.html'), name="list_extensions"),
    path('list-extensions/<str:status>', AdminExtensionsTable.as_view(), name='status'),
    path('list-extensions/<str:org>', AdminExtensionsTable.as_view(), name='org'),
    path('list-extensions/<str:status><str:org>', AdminExtensionsTable.as_view(), name='status_org'),
    path(r'list-extensions/api/', AdminExtensionsTable.as_view(), name='admin_extensions_table_api'),
    path(r'list-extensions/api/?status=(?P<status>)/', AdminExtensionsTable.as_view(),
         name='admin_extensions_table_api'),
    path(r'list-extensions/api/?org=(?P<org>)/', AdminExtensionsTable.as_view(), name='admin_extensions_table_api'),
    path(r'list-extensions/api/?status=(?P<status>)&org=(?P<org>)/', AdminExtensionsTable.as_view(),
         name='admin_extensions_table_api')
]