from django.urls import path
from apps.submitter_renewals_listing.views import SubmittersTable

app_name = 'register'
urlpatterns = [
    path('list-registration-requests/', SubmittersTable.as_view(), name='submitter_regis_table'),
    path(r'list-registration-requests/?status=(?P<status>)/', SubmittersTable.as_view(), name='submitter_regis_table'),
    path(r'list-registration-requests/?org=(?P<org>)/', SubmittersTable.as_view(), name='submitter_regis_table'),
    path(r'list-registration-requests/?status=(?P<status>)&org=(?P<org>)/', SubmittersTable.as_view(), name='submitter_regis_table')
]
