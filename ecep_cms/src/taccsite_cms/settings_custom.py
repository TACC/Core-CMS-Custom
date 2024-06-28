# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.ECEP.TACC.UTEXAS.EDU

########################
# DJANGO CMS SETTINGS
########################

CMS_TEMPLATES = (
    ('standard.html', 'Standard'),
    ('fullwidth.html', 'Full Width'),

    ('guide.html', 'Guide'),
    ('guides/getting_started.html', 'Guide: Getting Started'),
    ('guides/data_transfer.html', 'Guide: Data Transfer'),
    ('guides/data_transfer.globus.html', 'Guide: Globus Data Transfer'),
    ('guides/portal_technology.html', 'Guide: Portal Technology Stack')
)

########################
# TACC: BRANDING
########################

# FAQ: Some _VARIABLES are duplicated from settings.py (but prefixed with "_") cuz current infrastructure lacks ability to reference default values

_NSF_BRANDING = [
    "nsf",
    "site_cms/img/nsf-white.png",
    "branding-nsf",
    "https://www.nsf.gov/",
    "_blank",
    "NSF Logo",
    "anonymous",
    "True"
]

_TACC_BRANDING = [
    "tacc",
    "site_cms/img/tacc-white.png",
    "branding-tacc",
    "https://www.tacc.utexas.edu/",
    "_blank",
    "TACC Logo",
    "anonymous",
    "True"
]

_UTEXAS_BRANDING = [
    "utexas",
    "site_cms/img/utaustin-white.png",
    "branding-utaustin",
    "https://www.utexas.edu/",
    "_blank",
    "University of Texas at Austin Logo",
    "anonymous",
    "True"
]

BRANDING = [_NSF_BRANDING, _TACC_BRANDING, _UTEXAS_BRANDING]

########################
# TACC: LOGOS
########################

LOGO = [
    "ecep",
    "ecep_cms/img/ecep-white-no_words.svg",
    "",
    "/",
    "_self",
    "ECEP Logo",
    "anonymous",
    "True"
]

PORTAL_FAVICON = {
    "is_remote": False,
    "img_file_src": "ecep_cms/img/favicon.ico",
}

########################
# TACC: SEARCH
########################

# Support Google search instead of Portal's Elasticsearch
PORTAL_SEARCH_PATH = '/site-search' # cuz Portal Nginx config hijacks /search
PORTAL_SEARCH_QUERY_PARAM_NAME = 'q' # as Google expects

########################
# TACC: PORTAL
########################

PORTAL_IS_TACC_CORE_PORTAL = False
PORTAL_HAS_LOGIN = False
PORTAL_HAS_SEARCH = True

########################
# TACC: NEWS/BLOG
########################

# TACC settings
PORTAL_BLOG_SHOW_CATEGORIES = False
PORTAL_BLOG_SHOW_TAGS = False

########################
# NEWS / BLOG
########################

# REQ: Assumes various "NEWS / BLOG" are installed via `custom_app_settings.py`

# Paths for alternate templates that user can choose for blog-specific plugin
# - Devs can customize core templates at `templates/djangocms_blog/`.
# - Users can choose alt. templates from `templates/djangocms_blog/plugins/*`.
# - Devs can customize alt. templates at `templates/djangocms_blog/plugins/*`.
BLOG_PLUGIN_TEMPLATE_FOLDERS = (
    ('plugins', 'Default'),
    # ('plugins/alternate', 'Alternate'),
)

# Change default values for the auto-setup of one `BlogConfig`
# SEE: https://github.com/nephila/djangocms-blog/issues/629
BLOG_AUTO_SETUP = False # Set to False after setup (to minimize server overhead)
BLOG_AUTO_HOME_TITLE ='Home'
BLOG_AUTO_BLOG_TITLE = 'News'
BLOG_AUTO_APP_TITLE = 'News'
BLOG_AUTO_NAMESPACE = 'News'

# Miscellaneous settings
BLOG_ENABLE_COMMENTS = False

########################
# TACC: CORE STYLES
########################

TACC_CORE_STYLES_VERSION = 0
