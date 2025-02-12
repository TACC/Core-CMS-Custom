from django.urls import path
from apps.view_submitter_users.views import ViewSubmitterUsersTable, ViewSubmitterUsersApi, UpdateSubmitterUserView

app_name = 'administration'
urlpatterns = [
    path('view-submitter-users/', ViewSubmitterUsersTable.as_view(), name='view_submitter_users'),
    path('view-submitter-users/api/', ViewSubmitterUsersApi.as_view(), name='view_submitter_users_api'),
    path('view-submitter-users/api/options', ViewSubmitterUsersApi.as_view(), name='view_submitter_users_api_options'),
    path('submitter-users/<int:user_number>/', UpdateSubmitterUserView.as_view(), name='update_submitter_user'),
]
