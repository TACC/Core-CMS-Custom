from django.urls import path
from apps.common_api.views import EntitiesView
from . import views

app_name = 'common_api'
urlpatterns = [
    path('entities/', EntitiesView.as_view(), name='entities_api')
]
