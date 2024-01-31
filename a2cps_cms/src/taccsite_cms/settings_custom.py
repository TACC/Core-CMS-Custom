# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.A2CPS.TACC.UTEXAS.EDU


########################
# DJANGO CMS SETTINGS
########################

CMS_TEMPLATES = (
    ('a2cps_cms/templates/standard.html', 'Standard'),
    ('a2cps_cms/templates/fullwidth.html', 'Full Width'),
    ('a2cps-cms/templates/standard.html', 'DEPRECATED Standard'),
    ('a2cps-cms/templates/fullwidth.html', 'DEPRECATED Full Width'),
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
    "a2cps",
    "a2cps_cms/img/org_logos/a2cps.png",
    "",
    "/",
    "_self",
    "A2CPS: Acute to Chronic Pain Signatures",
    "anonymous",
    "True"
]

PORTAL_FAVICON = {
    "is_remote": False,
    "img_file_src": "a2cps_cms/img/org_logos/favicon.ico",
}
