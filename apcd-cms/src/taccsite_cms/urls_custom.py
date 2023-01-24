from django.urls import path, include

custom_urls = [
    path('administration/', include('apps.admin_regis_table.urls', namespace='administration')),
    path('administration/', include('apps.view_users.urls', namespace='viewusers')),
    path('apcd-login/', include('apps.apcd_login.urls', namespace='apcd_login')),
    path('register/', include('apps.registrations.urls', namespace='register'))
]
