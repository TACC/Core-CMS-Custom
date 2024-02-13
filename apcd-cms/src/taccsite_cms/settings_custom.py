# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.APCD.TACC.UTEXAS.EDU

########################
# DJANGO: EMAIL
########################

# Set on server, NOT here
# https://tacc-main.atlassian.net/wiki/x/ZhVv
# EMAIL_BACKEND = "..."
# EMAIL_HOST = "..."
# DEFAULT_FROM_EMAIL = "..."

########################
# DJANGO_CMS
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
# TACC: LOGO & FAVICON
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
