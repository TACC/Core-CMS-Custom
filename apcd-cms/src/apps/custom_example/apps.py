import logging

from django.apps import AppConfig

print('LOADED CUSTOMEXAMPLECONFIG, print()')
logging.info('LOADED CUSTOMEXAMPLECONFIG, logging.info()')

class CustomExampleConfig(AppConfig):
    name = 'custom_example'

    def ready(self):
        print('READY() CUSTOMEXAMPLECONFIG, print()')
        logging.info('READY() CUSTOMEXAMPLECONFIG, logging.info()')
