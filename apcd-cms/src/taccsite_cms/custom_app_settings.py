CUSTOM_APPS = ['apps.apcd_login', 'apps.registrations', 'apps.utils']
CUSTOM_MIDDLEWARE = []
STATICFILES_DIRS = ('taccsite_custom/apcd-cms', 'apps/components/paginator', 'apps/utils')
# Removed apps not needed for prod 8.30.2023 
# Check file history to add back admin, exception, extension, and submission apps