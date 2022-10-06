from django.urls import re_path
from .views import SubmissionFormView

app_name = 'apcd'
urlpatterns = [
    # re_path('remote/login/', verify_and_auth_apcd, name='verify_and_auth_apcd'),
    # re_path('submit/', SubmitForm, name='submit_form'),
    # re_path('', SubmissionFormView.as_view(), name='index')
    re_path('', SubmissionFormView.as_view(), name='index')
]
