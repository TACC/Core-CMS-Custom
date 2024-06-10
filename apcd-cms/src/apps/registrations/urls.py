from django.urls import path
from apps.registrations.views import SubmissionFormView

app_name = 'registrations'
urlpatterns = [
    path('request-to-submit/', SubmissionFormView.as_view(), name='register_table')
]
