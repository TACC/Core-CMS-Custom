import logging

from django.apps import AppConfig

logger = logging.getLogger(__name__)

print('LOADED CUSTOMEXAMPLECONFIG')

class CustomExampleConfig(AppConfig):
    name = 'custom_example'

    def ready(self):
        print('READY() CUSTOMEXAMPLECONFIG')
