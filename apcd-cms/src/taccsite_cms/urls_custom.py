from django.urls import path, include

import logging
logger = logging.getLogger(__name__)
print('URL_CUSTOM.PY, print()')
logger.info('URL_CUSTOM.PY, logging.info()')

from taccsite_cms.settings import *
print('URL_CUSTOM.PY "LOGGING", print()', LOGGING)
logging.info('URL_CUSTOM.PY "LOGGING", logging.info()', LOGGING)

custom_urls = [
    path('custom_example/', include('apps.custom_example.urls', namespace='custom_test')),
]
