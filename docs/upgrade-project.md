# Upgrade Project

## Table of Contents

- [Core-CMS v3.11 to v3.12](#core-cms-v311-to-v312)
    1. [Rename Project](#rename-project)

- [Core-CMS v4 Future Changes](#core-cms-v4-future-changes)
    1. [Update Settings](#update-settings)
    2. [Move Images](#move-images)

## [Core CMS] v3.11 to v3.12

### Rename Project

Verify project name is compatible with Django 3.2.

1. If your project directory name has dashes, rename it to use underscores, i.e.

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

4. In `taccsite_cms/custom_app_settings.py`, remove project from `STATICFILES_DIRS`, i.e.

    | | change |
    | - | - |
    | from | `STATICFILES_DIRS = ('taccsite_custom/custom_project_dir', ...)` |
    | to | `STATICFILES_DIRS = (...)` |

    > **Note**
    > [Core CMS] already defines the `static` directory for each project.


## [Core CMS] v4 Future Changes

### Update Settings

Remove unnecessary settings.

1. In `taccsite_cms/custom_app_settings.py`, remove apps from `STATICFILES_DIRS`, i.e.

    | | change |
    | - | - |
    | from | `STATICFILES_DIRS = ('apps/custom_example', ...)` |
    | to | `STATICFILES_DIRS = (...)` |

    > **Note**
    > Django automatically identifies the `static` directory for each app.

### Move Images

Simplify image paths.

1. Remove any subdirectories of your project's static `img` directory, i.e.

    | | root |
    | - | - |
    | from | `taccsite_custom/static/custom_project_dir/img/*/...` |
    | to | `taccsite_custom/static/custom_project_dir/img/...` |

2. Rename **all** references to the previous image paths e.g.
    - `/custom_project_dir/taccsite_cms/settings_custom.py` [^1]
    - [Core Portal Deployments]:`/project_dir/camino/cms.settings_custom.py` [^1]

[^1]: The `cms.settings_custom.py` is committed in [Core Portal Deployments]. A `settings_custom.py` in [Core CMS Custom] is `.gitignore`'d.

<!-- Link Aliases -->

[Core CMS]: https://github.com/TACC/Core-CMS
[Core CMS Custom]: https://github.com/TACC/Core-CMS-Custom
[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments
