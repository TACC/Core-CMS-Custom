# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.DEMOCTRATIZING-SITE.TACC.UTEXAS.EDU
# https://democratizingdata.ai/

########################
# TACC: PORTAL
########################

# Does this CMS site have a portal (default value: True)?
INCLUDES_CORE_PORTAL = False
INCLUDES_PORTAL_NAV = False
INCLUDES_SEARCH_BAR = False

########################
# DJANGO CMS SETTINGS
########################

CMS_TEMPLATES = (
    ('standard.html', 'Standard'),
    ('fullwidth.html', 'Full Width'),
    ('demdata_cms/templates/standard.html', 'Standard (with CSS from TUP)'),
    ('demdata_cms/templates/fullwidth.html', 'Full Width (with CSS from TUP)'),
    ('demdata-cms/templates/standard.html', 'DEPRECATED Standard (with CSS from TUP)'),
    ('demdata-cms/templates/fullwidth.html', 'DEPRECATED Full Width (with CSS from TUP)'),
)

########################
# TACC: BRANDING
########################

# LOOK INTO THIS SOLUTION.
# from taccsite_cms.settings import TACC_BRANDING, UTEXAS_BRANDING, NSF_BRANDING

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

# NSF_BRANDING = [
#     "nsf",
#     "site_cms/img/org_logos/nsf-white.png",
#     "branding-nsf",
#     "https://www.nsf.gov/",
#     "_blank",
#     "NSF Logo",
#     "anonymous",
#     "True"
# ]

# BRANDING = [ TACC_BRANDING, UTEXAS_BRANDING, NSF_BRANDING ]
BRANDING = [ TACC_BRANDING, UTEXAS_BRANDING ] # this matches prod 2022
# BRANDING = [] # prod 2022 hides bar via snippet CSS but should also do this

########################
# TACC: LOGOS
########################

LOGO = [
    "demdata",
    "demdata_cms/img/org_logos/demdata.svg",
    "",
    "/",
    "_self",
    "Democratizing Data Logo",
    "anonymous",
    "True"
]

PORTAL_FAVICON = {
    "is_remote": False,
    "img_file_src": "demdata_cms/img/favicons/Favicon_64x64.svg",
}

########################
# TACC: CORE STYLES
########################

# Only use integer numbers (not "v1", not "0.11.0")
TACC_CORE_STYLES_VERSION = 2
