from django.urls import path
from .views import AddedView

app_name = 'view-submitter-users'
urlpatterns = [
    path('view-submitter-users/', AddedView, name='index'),
]
