from django.urls import path, include

import logging
logger = logging.getLogger(__name__)
print('URL_CUSTOM.PY, print()')
logger.critical('URL_CUSTOM.PY, logging.critical()')

from taccsite_cms.settings import *
print('URL_CUSTOM.PY "LOGGING", print()', LOGGING)
logger.critical('URL_CUSTOM.PY "LOGGING", logging.critical()', LOGGING)

custom_urls = [
    path('custom_example/', include('apps.custom_example.urls', namespace='custom_test')),
]
