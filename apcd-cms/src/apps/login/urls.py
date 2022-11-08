from django.urls import path
from apps.login.auth import auth_and_set_apcd_role

app_name = 'login'
urlpatterns = [
    path('apcd/', auth_and_set_apcd_role, name='auth_and_set_apcd_role')
]
