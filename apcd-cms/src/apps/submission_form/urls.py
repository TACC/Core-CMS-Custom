from django.urls import re_path
from .views import SubmissionFormView

app_name = 'apcd'
urlpatterns = [
    re_path('', SubmissionFormView.as_view(), name='index')
]
