from django.urls import path
from apps.apcd_login.auth import auth_and_set_apcd_role

app_name = 'apcd_login'
urlpatterns = [
    path('get-roles/', auth_and_set_apcd_role, name='auth_and_set_apcd_role')
]
