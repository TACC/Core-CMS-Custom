# Upgrade Project

## Table of Contents

- [Core-CMS v3.11 to v3.12](#core-cms-v311-to-v312)
    1. [Update Custom Apps](#update-custom-apps)

## [Core CMS] v3.11 to v3.12

### Update Custom Apps

Update apps to be compatible with Django 3.2 (in [Core CMS] v3.12).

1. Edit all apps (e.g. `/custom_project_dir/apps/custom_example`).
    1. In each `apps.py` change
        - from `name = 'custom_example'`
        - to `name = 'apps.custom_example'`.

<!-- Link Aliases -->

[Core CMS]: https://github.com/TACC/Core-CMS
