# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.APCD.TACC.UTEXAS.EDU


########################
# DJANGO CMS SETTINGS
########################

CMS_TEMPLATES = (
    ('standard.html', 'Standard'),
    ('fullwidth.html', 'Full Width'),
    ('guide.html', 'Guide'),
    ('guides/getting_started.html', 'Guide: Getting Started'),
    ('guides/data_transfer.html', 'Guide: Data Transfer'),
    ('guides/data_transfer.globus.html', 'Guide: Globus Data Transfer'),
    ('guides/portal_technology.html', 'Guide: Portal Technology Stack')
)

########################
# TACC: LOGOS
########################

LOGO = [
    "tacc",
    "site_cms/img/org_logos/portal.png",
    # "apcd-cms/img/org_logos/apcd.png", # when we have one
    "",
    "/",
    "_self",
    "APCD: All-Payer Claims Database",
    "anonymous",
    "True"
]

FAVICON = {
    "img_file_src": "site_cms/img/favicons/favicon.ico"
    # "img_file_src": "apcd-cms/img/favicons/favicon.ico" # when we have one
}

########################
# DJANGO (EMAIL)
########################

EMAIL_HOST = "relay.tacc.utexas.edu"
DEFAULT_FROM_EMAIL = "no-reply@txapcd.org"
