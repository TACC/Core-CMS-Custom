from django.urls import path
from django.views.generic import TemplateView
from apps.submitter_renewals_listing.views import SubmittersTable

app_name = 'register'
urlpatterns = [
    path('list-registration-requests/', TemplateView.as_view(template_name='list_submitter_registrations.html'), name='submitter_regis_table'),
    path('list-registration-requests/api/', SubmittersTable.as_view(), name='submitter_regis_table_api'),
]
