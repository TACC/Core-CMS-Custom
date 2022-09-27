import logging

from django.apps import AppConfig

class FormIntercepterConfig(AppConfig):
    name = 'form_intercepter'

    def ready(self):
        print('Running FormIntercepterConfig "ready()"')
        logging.info('Running FormIntercepterConfig "ready()"')
        import form_intercepter.signals
