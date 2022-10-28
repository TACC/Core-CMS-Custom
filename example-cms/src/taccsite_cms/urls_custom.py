from django.urls import path, include

custom_urls = [
    path('example/', include('apps.example_app.urls', namespace='example_app')),
]
