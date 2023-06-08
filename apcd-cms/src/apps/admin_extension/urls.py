from django.urls import path
from apps.admin_extension.views import AdminExtensionsTable
from . import views

app_name = 'admin_extension'
urlpatterns = [
    path('list-extensions/', AdminExtensionsTable.as_view(), name="admin_extensions"),
    path('status/', views.sort_status, name='status'),
    path('org/', views.sort_org, name='org'),
    path('status_org/', views.sort_both, name='status_org')
]