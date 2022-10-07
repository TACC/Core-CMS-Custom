from django.urls import path, include

custom_urls = [
    path('custom_example/', include('apps.custom_example.urls', namespace='custom_example')),
    path('register/request-to-submit/', include('apps.submission_form.urls', namespace='apcd'))
]
