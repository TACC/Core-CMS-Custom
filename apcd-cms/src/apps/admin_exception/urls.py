from django.urls import path
from apps.admin_exception.views import AdminExceptionsTable

app_name = 'admin_exception'
urlpatterns = [
    path('list-exceptions/', AdminExceptionsTable.as_view(), name="admin_exceptions"),
]
