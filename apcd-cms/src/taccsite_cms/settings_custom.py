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
    "apcd-cms/img/org_logos/tacc-white.png",
    "",
    "/",
    "_self",
    "APCD: All Player Claims Database",
    "anonymous",
    "True"
]

FAVICON = {
    "img_file_src": "apcd-cms/img/org_logos/favicon.ico"
}
