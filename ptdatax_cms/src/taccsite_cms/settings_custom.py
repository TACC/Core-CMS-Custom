# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.PTDATAX.TACC.UTEXAS.EDU

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
#     "example_cms/img/org_logos/example-logo.png",
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
    "PTDataX",
    "ptdatax_cms/img/org_logos/ptdatax.png",
    "",
    "/",
    "_self",
    "Logo for Portal Texas 2050 DataX Portal",
    "anonymous",
    "True"
]

FAVICON = {
    "img_file_src": "ptdatax_cms/img/favicons/favicon.ico"
}

########################
# TACC: PORTAL
########################

INCLUDES_CORE_PORTAL = True
# INCLUDES_PORTAL_NAV = False
INCLUDES_SEARCH_BAR = False

########################
# TACC: CORE STYLES
########################

# Only use integer numbers (not "v1", not "0.11.0"),
# so templates can load based on simple comparisons
TACC_CORE_STYLES_VERSION = 2
