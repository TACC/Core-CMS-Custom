from django.urls import path 
from .views import AddedView

app_name = 'test_page'
urlpatterns = [
    path('', AddedView, name='index'),
]
