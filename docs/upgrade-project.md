# Upgrade Project

## Table of Contents

- [Core-CMS v3.11 to v3.12](#core-cms-v311-to-v312)
    1. [Update Custom Apps](#update-custom-apps)

## [Core CMS] v3.11 to v3.12

### Update Custom Apps

Update apps to be compatible with Django 3.2 (in [Core CMS] v3.12).

1. In `/custom_project_dir/Dockerfile`, move apps to `taccsite_cms`, i.e.

    | | change |
    | - | - |
    | from | `COPY /src/apps /code/apps` |
    | to | `COPY /src/apps /code/taccsite_cms/apps` |

1. In `/custom_project_dir/docker-compose.dev.yml`, sync apps in `taccsite_cms`, i.e.

    | | change |
    | - | - |
    | from | `- ./src/apps:/code/apps` |
    | to | `- ./src/apps:/code/taccsite_cms/apps` |

2. In `/custom_project_dir/taccsite_cms/custom_app_settings.py`, remove apps from `STATICFILES_DIRS`, i.e.

    | | change |
    | - | - |
    | from | `STATICFILES_DIRS = ('apps/custom_example', ...)` |
    | to | `STATICFILES_DIRS = (...)` |

<!-- Link Aliases -->

[Core CMS]: https://github.com/TACC/Core-CMS
