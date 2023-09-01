CUSTOM_APPS = [

    # ...

    ########################
    # NEWS / BLOG
    ########################

    # 'filer',              # already in Core
    # 'easy_thumbnails',    # already in Core
    'parler',
    'taggit',
    'taggit_autosuggest',
    # 'meta',               # already in Core
    'sortedm2m',
    'djangocms_blog',

    # REQ: 'taggit_autosuggest' requires the following is added to `urls_custom.py`
    # custom_urls = [
    #     # Support `taggit_autosuggest` (from `djangocms-blog`)
    #     url(r'^taggit_autosuggest/', include('taggit_autosuggest.urls')),
    # ]
]
CUSTOM_MIDDLEWARE = []
STATICFILES_DIRS = ()
