from django.urls import path
from apps.view_users.views import ViewUsersTable

app_name = 'administration'
urlpatterns = [
    path('view-users/', ViewUsersTable.as_view(), name='view_users'),
    path('view-users/<str:filter>/', ViewUsersTable.as_view())
]
