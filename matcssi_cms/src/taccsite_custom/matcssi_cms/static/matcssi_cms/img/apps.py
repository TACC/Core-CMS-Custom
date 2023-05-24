from django.apps import AppConfig

from taccsite_cms.settings import BASE_DIR

class MatcssiCmsConfig(AppConfig):
    name = 'taccsite_custom.matcssi_cms'
    path = os.path.join(BASE_DIR, '/code/taccsite_custom/matcssi_cms')
