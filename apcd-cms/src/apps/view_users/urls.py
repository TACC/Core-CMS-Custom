from django.urls import path
from django.views.generic import TemplateView
from apps.view_users.views import ViewUsersTable

app_name = 'administration'
urlpatterns = [
    path('view-users/', TemplateView.as_view(template_name='list_registrations.html'), name='view_users'),
    path('view-users/api', ViewUsersTable.as_view(), name='view_users_api'),
    path('view-users/api/<str:filter>/', ViewUsersTable.as_view(), name='view_users_api')
]
