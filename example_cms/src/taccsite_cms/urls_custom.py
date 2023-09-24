from django.urls import path, include

custom_urls = [
    path('example_app/', include('apps.example_app.urls', namespace='example_app')),
]
