# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.APCD.TACC.UTEXAS.EDU

import logging
print('SETTINGS_CUSTOM.PY, print()')
logging.info('SETTINGS_CUSTOM.PY, logging.info()')

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
