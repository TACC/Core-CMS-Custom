from django.urls import path, include

custom_urls = [
    path('administration/', include('apps.admin_regis_table.urls', namespace='administration')),
    path('administration/', include('apps.admin_submissions.urls', namespace='admin_submission')),
    path('apcd-login/', include('apps.apcd_login.urls', namespace='apcd_login')),
    path('register/', include('apps.registrations.urls', namespace='register')),
    path('extension/', include('apps.extension.urls', namespace='extension'))
    path('submissions/', include('apps.submissions.urls', namespace='submissions'))
]
