# Develop Project

Read [Django CMS User Guide] for CMS user instructions.

## Table of Contents

- [Create a New Project](#create-a-new-project)
- [Create a New Build Action](#create-a-new-build-action)
- [Remove Excess Content](#remove-excess-content)
- [Customize Project](#customize-project)
- [Create a Custom App](#create-a-custom-app)
- [Change All Projects](#change-all-projects)

## Create a New Project

1. Clone [example_cms](../example_cms).
2. Name the directory as WMA Infrastructure team defines e.g. `demdata_cms`.
3. [Remove Excess Content](#remove-excess-content)
4. [Customize Project](#customize-project)
5. [Create a New Build Action](#create-a-new-build-action)
6. Perform instructions in other pertinent sections.

## Create a New Build Action

1. Clone [`.github/workflows/example-cms.yml`](../.github/workflows/example-cms.yml).
2. Rename the file: replace `example` with the code name of the CMS to build.
3. Edit the content: replace `example` with the code name of the CMS to build.
4. Edit the content: replace `Example` with the human name of the CMS to build.
5. Save this to the `main` branch. (You may be required to create a PR to do so.)

## Remove Excess Content

> **Note**
> [Core CMS] supports standard TACC apps, URLs, and static asset directories. Consider its capabilities before creating something new.

| <u>If</u> Project Does Not Need | <u>Then</u> Delete |
| - | - |
| additional apps | the directory `apps/`<br />the `COPY /src/apps /code/taccsite_cms/apps` in `Dockerfile` |
| URLs for custom apps | `urls_custom.py` |
| custom code | `custom_app_settings.py` |

## Customize Project

Edit `./src/taccsite_cms/settings_custom.py`.

To know what settings are available, see [Core-CMS `settings.py`](https://github.com/TACC/Core-CMS/blob/main/taccsite_cms/settings.py).

The settings usually edited are `PORTAL_LOGO` and `..._BRANDING`.

## Create a Custom App

- Update `custom_app_settings.py` with pertinent content from [TACC/Core-CMS:`/taccsite_cms/custom_app_settings.example.py`](https://github.com/TACC/Core-CMS/blob/1d88c35/taccsite_cms/custom_app_settings.example.py).
- Update `urls_custom.py` with pertinent content from [TACC/Core-CMS:`/taccsite_cms/urls_custom.example.py`](https://github.com/TACC/Core-CMS/blob/1d88c35/taccsite_cms/urls_custom.example.py).

## Change All Projects

If there is a change that should be made in all CMS projects, consider whether it can be done in a more appropriate repository.

| Type of Change | Repository |
| - | - |
| CMS feature / default setting | [Core CMS] |
| styles specific to CMS[^1] | [Core CMS] |
| [TACC UI Patterns] [^2] | [Core Styles] |
| [Core Portal] |

[^1]: These are not always obviously distinct from [Core Styles]. Examples may be the News plugin, the Image Gallery, forms, and any "Core CMS" patterns in [TACC UI Patterns].

[^2]: There may be styles from [Core Styles] that are not documented in [TACC UI Patterns].

<!-- Link Aliases -->

[Core CMS]: https://github.com/TACC/Core-CMS
[Core Portal]: https://github.com/TACC/Core-Portal
[Core Styles]: https://github.com/TACC/Core-Styles

[TACC UI Patterns]: https://tacc.utexas.edu/static/ui/

[Django CMS User Guide]: https://tacc-main.atlassian.net/wiki/x/phdv
