# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.APCD.TACC.UTEXAS.EDU

########################
# CORE CMS SETTINGS
# FAQ: These are in future versions of Core-CMS
########################

# NOTE: Already in Core-CMS v3.12.0-beta.2, v3.11.6, and (untested) v3.9.5
# whether the session cookie should be secure (https:// only)
SESSION_COOKIE_SECURE = True

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
    ('guides/portal_technology.html', 'Guide: Portal Technology Stack')
)

########################
# TACC: LOGOS
########################

LOGO = [
    "tacc",
    "apcd-cms/img/org_logos/apcd-white.png",
    "",
    "/",
    "_self",
    "APCD: All-Payer Claims Database",
    "anonymous",
    "True"
]

FAVICON = {
    "img_file_src": "apcd-cms/img/favicons/favicon.ico"
}

########################
# DJANGO (EMAIL)
########################

# Set on server, NOT here
# https://confluence.tacc.utexas.edu/x/coR9E
# EMAIL_BACKEND = "..."
# EMAIL_HOST = "..."
# DEFAULT_FROM_EMAIL = "..."
