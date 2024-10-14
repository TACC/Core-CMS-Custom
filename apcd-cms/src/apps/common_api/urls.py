from django.urls import path
from apps.common_api.views import EntitiesView, cdlsView
from . import views

app_name = 'common_api'
urlpatterns = [
    path('entities/', EntitiesView.as_view(), name='entities_api'),
    path('cdls/', cdlsView.as_view(), name='cdls_api'),
    path('cdls/<str:file_type>', cdlsView.as_view(), name='cdls_api')
]
