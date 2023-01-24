from django.urls import path, include

custom_urls = [
    path('administration/', include('apps.admin_regis_table.urls', namespace='administration')),
    path('apcd-login/', include('apps.apcd_login.urls', namespace='apcd_login')),
    path('register/', include('apps.registrations.urls', namespace='register')),
    path('submissions/', include('apps.exception.urls', namespace='exception')),
    path('submissions/', include('apps.submissions.urls', namespace='submissions'))
]
