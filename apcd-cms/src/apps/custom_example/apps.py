from django.apps import AppConfig

print('Loaded CustomExampleConfig "ready()"')
logging.info('Loaded CustomExampleConfig "ready()"')

class CustomExampleConfig(AppConfig):
    name = 'custom_example'

    def ready(self):
        print('Running CustomExampleConfig "ready()"')
        logging.info('Running CustomExampleConfig "ready()"')
