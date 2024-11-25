from django.urls import path
from django.views.generic import TemplateView
from apps.submitter_renewals_listing.views import SubmittersTable

app_name = 'register'
urlpatterns = [
    path('list-registration-requests/', TemplateView.as_view(template_name='list_submitter_registrations.html'), name='submitter_regis_table'),
    path(r'list-registration-requests/api/', SubmittersTable.as_view(), name='submitter_regis_table_api'),
    path(r'list-registration-requests/api/?status=(?P<status>)/', SubmittersTable.as_view(), name='submitter_regis_table_api'),
    path(r'list-registration-requests/api/?org=(?P<org>)/', SubmittersTable.as_view(), name='submitter_regis_table_api'),
    path(r'list-registration-requests/api/?status=(?P<status>)&org=(?P<org>)/', SubmittersTable.as_view(), name='submitter_regis_table_api'),
    path(r'list-registration-requests/api/?reg_id=(?P<reg_id>)/', SubmittersTable.as_view(), name='submitter_regis_table_api'),
]
