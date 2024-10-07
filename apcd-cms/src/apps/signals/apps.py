from django.apps import AppConfig


class SignalsConfig(AppConfig):
    name = 'apps.signals'
    verbose_name = 'APCD Signals'

    def ready(self):

        import apps.signals.receivers  # noqa: F401
