import logging

from django.apps import AppConfig

logger = logging.getLogger(__name__)

print('LOADED FORMINTERCEPTERCONFIG, print()')
logger.critical('LOADED FORMINTERCEPTERCONFIG, logging.info()')

class FormIntercepterConfig(AppConfig):
    name = 'form_intercepter'

    def ready(self):
        print('READY() FORMINTERCEPTERCONFIG, print()')
        logger.info('READY() FORMINTERCEPTERCONFIG, logging.info()')
        import form_intercepter.signals
