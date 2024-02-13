# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.DEMOCTRATIZING-SITE.TACC.UTEXAS.EDU

########################
# DJANGO_CMS
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

BRANDING = False

########################
# TACC: LOGO & FAVICON
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

FAVICON = {
    "img_file_src": "demdata_cms/img/favicons/Favicon_64x64.svg"
}

########################
# TACC: PORTAL
########################

INCLUDES_CORE_PORTAL = False
INCLUDES_PORTAL_NAV = False
INCLUDES_SEARCH_BAR = False

########################
# TACC: CORE STYLES
########################

# Only use integer numbers (not "v1", not "0.11.0")
TACC_CORE_STYLES_VERSION = 2
