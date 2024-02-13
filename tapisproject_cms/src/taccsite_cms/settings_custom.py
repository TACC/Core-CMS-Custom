# CUSTOM SETTINGS VALUES.
# TACC WMA (SAD) CMS SITE:
# *.TAPISPROJECT.TACC.UTEXAS.EDU

########################
# DJANGO: AUTH
########################

AUTH_LDAP_SERVER_URI = "ldap://cluster.ldap.tacc.utexas.edu"

########################
# TACC: BRANDING
########################

# NOTE: Variables NSF_BRANDING, TACC_BRANDING, and UTEXAS_BRANDING are duplicated from Core-CMS cuz current infrastructure lacks ability to reference default values.

NSF_BRANDING = [
    "nsf",
    "site_cms/img/org_logos/nsf-white.png",
    "branding-nsf",
    "https://www.nsf.gov/",
    "_blank",
    "NSF Logo",
    "anonymous",
    "True"
]

TACC_BRANDING = [
    "tacc",
    "site_cms/img/org_logos/tacc-white.png",
    "branding-tacc",
    "https://www.tacc.utexas.edu/",
    "_blank",
    "TACC Logo",
    "anonymous",
    "True"
]

UTEXAS_BRANDING = [
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

BRANDING = [ NSF_BRANDING, TACC_BRANDING, UTEXAS_BRANDING, UHAWAII_BRANDING ]

########################
# TACC: LOGO & FAVICON
########################

LOGO = [
    "tapis",
    "tapisproject_cms/img/org_logos/tapis-logo-navbar.png",
    "",
    "/",
    "_self",
    "Tapis Logo",
    "anonymous",
    "True"
]

FAVICON = {
    "img_file_src": "site_cms/img/favicons/favicon.ico"
}

########################
# TACC: PORTAL
########################

INCLUDES_CORE_PORTAL = False
INCLUDES_PORTAL_NAV = False
INCLUDES_SEARCH_BAR = False
