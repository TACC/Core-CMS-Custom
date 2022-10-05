import logging

from django.apps import AppConfig

logger = logging.getLogger(__name__)

print('LOADED CUSTOMEXAMPLECONFIG, print()')
logger.critical('LOADED CUSTOMEXAMPLECONFIG, logging.info()')

class CustomExampleConfig(AppConfig):
    name = 'custom_example'

    def ready(self):
        print('READY() CUSTOMEXAMPLECONFIG, print()')
        logger.info('READY() CUSTOMEXAMPLECONFIG, logging.info()')
