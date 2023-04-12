from django.urls import path, re_path
from apps.view_users.views import ViewUsersTable

app_name = 'administration'
urlpatterns = [
    path('view-users/', ViewUsersTable.as_view()),
    re_path(r'view-users/?filter=(?P<filter>[\w\ ]+)/', ViewUsersTable.as_view()),
]
