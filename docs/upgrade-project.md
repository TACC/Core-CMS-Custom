# Upgrade Project

## Table of Contents

- [Core-CMS v3.11 to v3.12](#core-cms-v311-to-v312)
    1. [Rename Project](#rename-project)
    2. [Update Custom Apps](#update-custom-apps)

## [Core CMS] v3.11 to v3.12

### Rename Project

Verify project name is compatible with Django 3.2.

1. If you project directory name has dashes, rename it to use underscores, i.e.

    | | root |
    | - | - |
    | from | `custom-project-dir` |
    | to | `custom_project_dir` |

    | | `taccsite_custom` |
    | - | - |
    | from | `taccsite_custom/custom-project-dir` |
    | to | `taccsite_custom/custom_project_dir` |

    | |`taccsite_cms/static` |
    | - | - |
    | from | `taccsite_cms/static/custom-project-dir` |
    | to | `taccsite_cms/static/custom_project_dir` |

    > **Important**
    > A valid Python application uses underscores.

2. Rename **all** references to the previous directory names.

3. Identify, support and deprecate old CMS template paths.

    Follow [Port Project: Old CMS Template paths](./port-project.md#old-cms-template-paths).

    > **Important**
    > Failure to do this can crash an entire page.

### Update Custom Apps

Update project apps to be meet Django expectations.

1. In `/custom_project_dir/Dockerfile`, move apps to `taccsite_cms`, i.e.

    | | change |
    | - | - |
    | from | `COPY /src/apps /code/apps` |
    | to | `COPY /src/apps /code/taccsite_cms/apps` |

2. In `/custom_project_dir/docker-compose.dev.yml`, sync apps in `taccsite_cms`, i.e.

    | | change |
    | - | - |
    | from | `- ./src/apps:/code/apps` |
    | to | `- ./src/apps:/code/taccsite_cms/apps` |

3. In `/custom_project_dir/taccsite_cms/custom_app_settings.py`, remove apps from `STATICFILES_DIRS`, i.e.

    | | change |
    | - | - |
    | from | `STATICFILES_DIRS = ('apps/custom_example', ...)` |
    | to | `STATICFILES_DIRS = (...)` |

<!-- Link Aliases -->

[Core CMS]: https://github.com/TACC/Core-CMS
