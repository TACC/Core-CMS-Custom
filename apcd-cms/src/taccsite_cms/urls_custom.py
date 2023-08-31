from django.urls import path, include
# Removed admin feature pages, extension, and exception from prod
custom_urls = [
    path('apcd-login/', include('apps.apcd_login.urls', namespace='apcd_login')),
    path('register/', include('apps.registrations.urls', namespace='register')),
    path('submissions/', include('apps.submissions.urls', namespace='submissions'))
]