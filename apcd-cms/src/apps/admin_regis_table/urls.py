from django.urls import re_path
from .views import RegistrationsTable

app_name = 'admin_regis_table'
urlpatterns = [
    re_path(r'^list-registration-requests/$', RegistrationsTable.as_view(), name='ListRegis'),
]
