from django.urls import path
from django.views.generic import TemplateView
from apps.view_users.views import ViewUsersTable

app_name = 'administration'
urlpatterns = [
    path('view-users/', TemplateView.as_view(template_name='view_users.html'), name='view_users'),
    path(r'view-users/api/', ViewUsersTable.as_view(), name='view_users_api'),
    path(r'view-users/api/<str:filter>/', ViewUsersTable.as_view(), name='view_users_api')
]
