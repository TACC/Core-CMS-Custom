from django.urls import path, re_path
from apps.view_users.views import ViewUsersTable

app_name = 'administration'
urlpatterns = [
    path('view-users/', ViewUsersTable.as_view()),
    path('view-users/<str:filter>/', ViewUsersTable.as_view())
]
