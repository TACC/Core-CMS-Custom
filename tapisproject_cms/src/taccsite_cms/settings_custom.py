# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.TAPISPROJECT.TACC.UTEXAS.EDU

# FAQ: Some _VARIABLES are duplicated from settings.py (but prefixed with "_")
#      because current infrastructure lacks ability to reference default values

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

UHAWAII_BRANDING = [
    "uhawaii",
    "tapisproject_cms/img/org_logos/hawaii-header-trimmed.png",
    "branding-uhawaii",
    "https://www.hawaii.edu/",
    "_blank",
    "University of Hawaii Logo",
    "anonymous",
    "True"
]

BRANDING = [ _NSF_BRANDING, _TACC_BRANDING, _UTEXAS_BRANDING, UHAWAII_BRANDING ]

########################
# TACC: LOGOS
########################

LOGO =  [
    "tapis",
    "tapisproject_cms/img/org_logos/tapis-logo-navbar.png",
    "",
    "/",
    "_self",
    "Tapis Logo",
    "anonymous",
    "True"
]

PORTAL_FAVICON = {
    "is_remote": False,
    "img_file_src": "site_cms/img/favicons/favicon.ico",
}

########################
# TACC: PORTAL
########################

PORTAL_MANAGES_AUTH = False
PORTAL_HAS_LOGIN = False
PORTAL_HAS_SEARCH = False

########################
# TACC: GOOGLE ANALYTICS
########################

GOOGLE_ANALYTICS_PROPERTY_ID = "G-5EQ8Y25ZTM"
