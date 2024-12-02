from django.urls import path
from .views import AddedView
# from django.views.generic import TemplateView

app_name = 'view-submitter-users'
urlpatterns = [
    path('view-submitter-users/', AddedView, name='index'),
    # path('view-submitter-users/', TemplateView.as_view(template_name='view_users.html'), name='view_users'),
]
