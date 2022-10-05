from django.apps import AppConfig

print('FORMINTERCEPTERCONFIG')

class FormIntercepterConfig(AppConfig):
    name = 'form_intercepter'

    def ready(self):
        print('READY() FORMINTERCEPTERCONFIG')
        import form_intercepter.signals
