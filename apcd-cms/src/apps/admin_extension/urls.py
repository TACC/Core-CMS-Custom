from django.urls import path
from apps.admin_extension.views import AdminExtensionsTable

app_name = 'admin_extension'
urlpatterns = [
    path('list-extensions/', AdminExtensionsTable.as_view(), name="admin_extensions"),
]