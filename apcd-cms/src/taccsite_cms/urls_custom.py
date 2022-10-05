from django.urls import path, include

import logging
logger = logging.getLogger(__name__)
print('URL_CUSTOM.PY')

from taccsite_cms.settings import *
print('URL_CUSTOM.PY "LOGGING"', LOGGING)

custom_urls = [
    path('custom_example/', include('apps.custom_example.urls', namespace='custom_test')),
]
