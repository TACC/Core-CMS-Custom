import logging

from django.apps import AppConfig

logger = logging.getLogger(__name__)

print('LOADED FORMINTERCEPTERCONFIG')

class FormIntercepterConfig(AppConfig):
    name = 'form_intercepter'

    def ready(self):
        logger.info('READY() FORMINTERCEPTERCONFIG')
        import form_intercepter.signals
