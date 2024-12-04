from django.urls import path
from django.views.generic import TemplateView
from apps.view_submitter_users.views import ViewSubmitterUsersTable, UpdateSubmitterUserView

app_name = 'administration'
urlpatterns = [
    path('view-submitter-users/', TemplateView.as_view(template_name='view_submitter_users.html'), name='view_submitter_users'),
    path('view-submitter-users/api/', ViewSubmitterUsersTable.as_view(), name='view_submitter_users_api'),
    path('view-submitter-users/api/modal/<str:modal_type>/', ViewSubmitterUsersTable.as_view(), name='view_submitter_users_modal'),
    path('submitter-users/<int:user_number>/', UpdateSubmitterUserView.as_view(), name='update_submitter_user'),
]
