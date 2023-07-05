from django.urls import path
from apps.admin_extension.views import AdminExtensionsTable


app_name = 'admin_extension'
urlpatterns = [
    path('list-extensions/', AdminExtensionsTable.as_view(), name="list_extensions"),
    path('list-extensions/<str:status>', AdminExtensionsTable.as_view(), name='status'),
    path('list-extensions/<str:org>', AdminExtensionsTable.as_view(), name='org'),
    path('list-extensions/<str:status><str:org>', AdminExtensionsTable.as_view(), name='status_org')
]