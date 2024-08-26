from django.urls import path
from django.views.generic import TemplateView
from apps.view_users.views import ViewUsersTable, update_user_view

app_name = 'administration'
urlpatterns = [
    path('view-users/', TemplateView.as_view(template_name='view_users.html'), name='view_users'),
    path('view-users/api/', ViewUsersTable.as_view(), name='view_users_api'),
    path('view-users/api/options', ViewUsersTable.as_view(), name='view_users_api_options'),
    path('view-users/api/modal/<str:modal_type>/', ViewUsersTable.as_view(), name='view_users_modal'),
    path('users/<int:user_number>/', update_user_view, name='update_user'), 
]
