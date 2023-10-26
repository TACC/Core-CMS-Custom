# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.NETSAGE.TACC.UTEXAS.EDU

########################
# DJANGO (EMAIL)
########################

# Set on server, NOT here
# https://confluence.tacc.utexas.edu/x/coR9E
# EMAIL_BACKEND = "..."
# EMAIL_HOST = "..."
# DEFAULT_FROM_EMAIL = "..."

########################
# DJANGO CMS SETTINGS
########################

CMS_TEMPLATES = (
    ('standard.html', 'Standard'),
    ('fullwidth.html', 'Full Width'),

    ('guide.html', 'Guide'),
    ('guides/getting_started.tam.html', 'Guide: Getting Started'),
    ('guides/data_transfer.html', 'Guide: Data Transfer'),
    ('guides/data_transfer.globus.html', 'Guide: Globus Data Transfer'),
    ('guides/portal_technology.html', 'Guide: Portal Technology Stack'),
)

########################
# TACC: BRANDING
########################

_NSF_BRANDING = [
    "nsf",
    "site_cms/img/org_logos/nsf-white.png",
    "branding-nsf",
    "https://www.nsf.gov/",
    "_blank",
    "NSF Logo",
    "anonymous",
    "True"
]

_TACC_BRANDING = [
    "tacc",
    "site_cms/img/org_logos/tacc-white.png",
    "branding-tacc",
    "https://www.tacc.utexas.edu/",
    "_blank",
    "TACC Logo",
    "anonymous",
    "True"
]

_UTEXAS_BRANDING = [
    "utexas",
    "site_cms/img/org_logos/utaustin-white.png",
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

LOGO =  [
    "netsage",
    "netsage_cms/img/org_logos/netsage_logo_color.png",
    "",
    "/",
    "_self",
    "Netsage Logo",
    "anonymous",
    "True"
]

FAVICON = {
    "img_file_src": "netsage_cms/img/favicons/netsage_icon.ico"
}

########################
# TACC: PORTAL
########################

# Does this CMS site have a portal?
INCLUDES_CORE_PORTAL = False
INCLUDES_PORTAL_NAV = False
INCLUDES_SEARCH_BAR = False

########################
# TACC: CORE STYLES
########################

TACC_CORE_STYLES_VERSION = 0
