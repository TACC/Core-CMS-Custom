CUSTOM_APPS = ['apps.pattern_library']
CUSTOM_MIDDLEWARE = []
# Serve pattern library static files without header
# FAQ: How to serve static files the prod-ready way
# STATICFILES_DIRS = (('pattern_library', 'taccsite_ui/dist'), 'apps/pattern_library')
STATICFILES_DIRS = ('taccsite_custom/styles-cms', 'apps/pattern_library')
