from django.apps import AppConfig


class CustomExampleConfig(AppConfig):
    name = 'custom_example'

    def ready(self):
        print('Running CustomExampleConfig "ready()"')
        logging.info('Running FormIntercepterConfig "ready()"')
