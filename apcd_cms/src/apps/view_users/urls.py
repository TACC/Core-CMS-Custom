from django.urls import path
from apps.view_users.views import ViewUsersTable, ViewUsersApi, UpdateUserView

app_name = 'administration'
urlpatterns = [
    path('view-users/', ViewUsersTable.as_view(), name='view_users'),
    path('view-users/api/', ViewUsersApi.as_view(), name='view_users_api'),
    path('view-users/api/options', ViewUsersApi.as_view(), name='view_users_api_options'),
    path('users/<int:user_number>/', UpdateUserView.as_view(), name='update_user'),
]
