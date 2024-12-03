from django.urls import path
# from .views import AddedView
from django.views.generic import TemplateView
from apps.view_users.views import ViewUsersTable, UpdateUserView

app_name = 'view-submitter-users' # administration?
urlpatterns = [
    # path('view-submitter-users/', AddedView, name='index'),
    path('view-submitter-users/', TemplateView.as_view(template_name='view_submitter_users.html'), name='view_submitter_users'),
]
