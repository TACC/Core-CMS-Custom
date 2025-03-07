from django.urls import re_path
from .views import AddedView

app_name = 'custom_example'
urlpatterns = [
    re_path('', AddedView, name='index'),
]
