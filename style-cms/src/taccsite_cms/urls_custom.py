from django.urls import path, include

custom_urls = [
    path('pattern-library/', include('apps.pattern_library.urls', namespace='pattern_library')),
]
