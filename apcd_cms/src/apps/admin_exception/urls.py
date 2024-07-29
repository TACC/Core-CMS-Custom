from django.urls import path
from apps.admin_exception.views import AdminExceptionsTable

app_name = 'admin_exception'
urlpatterns = [
    path('list-exceptions/', AdminExceptionsTable.as_view(), name="list_exceptions"),
    path('list-exceptions/<str:status>', AdminExceptionsTable.as_view(), name='status'),
    path('list-exceptions/<str:org>', AdminExceptionsTable.as_view(), name='org'),
    path('list-exceptions/<str:status><str:org>', AdminExceptionsTable.as_view(), name='status_org')
]
