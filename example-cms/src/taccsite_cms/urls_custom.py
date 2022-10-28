from django.urls import path, include

custom_urls = [
    path('test/', include('apps.custom_example.urls', namespace='custom_test')),
]
