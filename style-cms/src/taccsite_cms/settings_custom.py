# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.STYLES.TACC.UTEXAS.EDU

########################
# DJANGO
########################

APPEND_SLASH = False # so `/pattern-library/index.html` loads files from `./`

########################
# DJANGO CMS SETTINGS
########################

CMS_TEMPLATES = (
    ('standard.html', 'Standard'),
    ('fullwidth.html', 'Full Width'),
    ('guide.html', 'Guide'),
)

########################
# TACC: BRANDING
########################

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

BRANDING = [ _UTEXAS_BRANDING ]

########################
# TACC: LOGOS
########################

LOGO =  [
    "styles",
    "style-cms/img/org_logos/tacc-logo-white.svg",
    "",
    "/",
    "_self",
    "Logo for TACC Styles",
    "anonymous",
    "True"
]

########################
# TACC: PORTAL
########################

INCLUDES_CORE_PORTAL = False
INCLUDES_PORTAL_NAV = False
INCLUDES_SEARCH_BAR = False
