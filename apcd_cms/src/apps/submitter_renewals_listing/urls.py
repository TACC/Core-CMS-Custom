from django.urls import path
from apps.submitter_renewals_listing.views import SubmittersTable, SubmittersApi

app_name = 'register'
urlpatterns = [
    path('list-registration-requests/', SubmittersTable.as_view(), name='submitter_regis_table'),
    path('list-registration-requests/api/', SubmittersApi.as_view(), name='submitter_regis_table_api'),
]
