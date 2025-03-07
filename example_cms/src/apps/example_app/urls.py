from django.urls import re_path
from .views import AddedView


app_name = 'example_app'
urlpatterns = [
    re_path('', AddedView, name='index'),
]
