from django.conf import settings
from django.urls import re_path
from django.views.static import serve


app_name = 'pattern_library'
urlpatterns = [
    # Serve pattern library static files without header
    # FAQ: How to serve static files the not-for-prod way
    re_path(r'^(?P<path>.*)', serve, {
        'document_root': '/code/taccsite_ui/dist',
        'show_indexes': True
    }),
]
