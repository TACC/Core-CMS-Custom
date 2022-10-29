from django.urls import re_path
from .views import AddedView

app_name = 'pattern_library'
urlpatterns = [
    re_path('', AddedView, name='index'),
]
