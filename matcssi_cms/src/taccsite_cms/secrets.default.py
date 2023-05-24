# SECRET SETTINGS VALUES.
# (LOCAL TEST INSTANCE)

########################
# DATABASE SETTINGS
########################

from taccsite_cms.settings import DATABASES

DATABASES = {
    'default': {
        'ENGINE': DATABASES['default']['ENGINE'],
        'PORT': DATABASES['default']['PORT'],
        'NAME': DATABASES['default']['NAME'],
        'USER': DATABASES['default']['USER'],
        'PASSWORD': DATABASES['default']['PASSWORD'],
        'HOST': 'matcssi_cms_postgres'
    }
}
