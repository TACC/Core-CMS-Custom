from django.urls import path
from apps.common_api.views import EntitiesView, cdlsView, DataPeriodsView

app_name = 'common_api'
urlpatterns = [
    path('entities/', EntitiesView.as_view(), name='entities_api'),
    path('cdls/', cdlsView.as_view(), name='cdls_api'),
    path('cdls/<str:file_type>', cdlsView.as_view(), name='cdls_api'),
    path('data_periods/', DataPeriodsView.as_view(), name='dataperiods_api')
]
