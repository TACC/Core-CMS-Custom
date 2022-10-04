import logging

from django.apps import AppConfig

print('LOADED FORMINTERCEPTERCONFIG, print()')
logging.info('LOADED FORMINTERCEPTERCONFIG, logging.info()')

class FormIntercepterConfig(AppConfig):
    name = 'form_intercepter'

    def ready(self):
        print('READY() FORMINTERCEPTERCONFIG, print()')
        logging.info('READY() FORMINTERCEPTERCONFIG, logging.info()')
        import form_intercepter.signals
