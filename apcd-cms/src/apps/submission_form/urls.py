from django.urls import path
from .views import SubmissionFormView

app_name = 'apcd'
urlpatterns = [
    path('request-to-submit/', SubmissionFormView.as_view(), name='index')
]
