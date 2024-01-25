# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.PROJECT_DOMAIN.TACC.UTEXAS.EDU

########################
# DJANGO (EMAIL)
########################

# Set on server, NOT here
# https://tacc-main.atlassian.net/wiki/x/ZhVv
# EMAIL_BACKEND = "..."
# EMAIL_HOST = "..."
# DEFAULT_FROM_EMAIL = "..."

########################
# DJANGO CMS SETTINGS
########################

CMS_TEMPLATES = (
    ('standard.html', 'Standard'),
    ('fullwidth.html', 'Full Width'),
)

########################
# TACC: BRANDING
########################

# from taccsite_cms.settings import TACC_BRANDING, UTEXAS_BRANDING, NSF_BRANDING
#
# _CUSTOM_BRANDING = [
#     "example",
#     "example_cms/img/some-logo.png",
#     "",
#     "https://example.com",
#     "_blank",
#     "Example Logo",
#     "anonymous",
#     "True"
# ]

# BRANDING = [ TACC_BRANDING, UTEXAS_BRANDING, NSF_BRANDING, _CUSTOM_BRANDING ]

########################
# TACC: LOGOS
########################

LOGO =  [
    "example",
    "example_cms/img/portal.png",
    "",
    "/",
    "_self",
    "Placeholder Logo for CMS/Portal",
    "anonymous",
    "True"
]

FAVICON = {
    "img_file_src": "example_cms/img/favicon.ico"
}

########################
# TACC: PORTAL
########################

# INCLUDES_CORE_PORTAL = False
# INCLUDES_PORTAL_NAV = False
# INCLUDES_SEARCH_BAR = False

########################
# TACC: CORE STYLES
########################

TACC_CORE_STYLES_VERSION = 2
