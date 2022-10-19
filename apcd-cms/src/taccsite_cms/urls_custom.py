from django.urls import path, include

custom_urls = [
    path('register/request-to-submit/', include('apps.submission_form.urls', namespace='apcd'))
]
