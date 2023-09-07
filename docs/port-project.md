# Port Project

## Table of Contents

- [From Core CMS Resources](#from-core-cms-resources)
    1. [Overview](#overview)
    2. [Create a New Project](#create-a-new-project)
    3. [Known Gotchas](#known-gotchas)

## From [Core CMS Resources]

### Overview

| from | to |
| - | - |
| [Core CMS Resources] | [Core CMS Custom] |
| built into [Core CMS] image | built atop [Core CMS] image |

### Create a New Project

Follow steps in [Create a New Project](./develop-project.md#create-a-new-project).

<details><summary>Reminders</summary>

1. From [Core CMS Resources] `/taccsite_custom/custom_project_dir`.\
    To `/custom_project_dir/src/taccsite_custom/custom_project_dir`.

2. From `/taccsite_custom/custom_project_dir/settings_custom.py`.\
    To `/custom_project_dir/src/taccsite_cms/settings_custom.py`.

3. The name `custom_project_dir` **must** use underscores, **not** dashes.

    > **Note**
    > A valid Python application uses underscores.

</details>

### Known Gotchas

#### Has a [Core Portal]

**If** the custom project has a [Core Portal] i.e. settings has `FAVICON` and:

- **either** settings has `INCLUDES_CORE_PORTAL = True`
- **or** settings does **not** have `INCLUDES_CORE_PORTAL`

Then:

1. You must edit [Core Portal Deployments].
2. Edit `custom_project_dir/camino/___.settings_custom.py` (not `___.cms.…`).
3. Change `_PORTAL_ICON_FILENAME` to:\
    `/static/` + ( the `img_file_src` of `FAVICON` )

#### Old Custom Templates Directory

**If** the custom project directory:

- **both** had a name with dashes in [Core CMS Resources]
- **and** has `templates/standard.html` or `templates/fullwidth.html`

Then:

1. Copy the templates to become deprecated templates:
    - from `taccsite_custom/custom_project_dir/templates`
    - to `taccsite_custom/custom-project-dir/templates`

    > **Warning**
    > The name `custom_project_dir` **must** match the old name as it was, including dashes.
2. Edit the deprecated templates to extend the new templates e.g.

    ```django
    {% extends "custom_project_dir/templates/standard.html" %}
    ```

3. Update `settings_custom.py` to support deprecated templates:

    ```diff
        ('custom_project_dir/templates/standard.html', 'Standard'),
        ('custom_project_dir/templates/fullwidth.html', 'Full Width'),
    +   ('custom-project-dir/templates/standard.html', 'DEPRECATED Standard'),
    +   ('custom-project-dir/templates/fullwidth.html', 'DEPRECATED Full Width'),
    ```

#### Expects CSS Build Step

**If** the custom project directory expects CSS build step e.g. has

- `css/src/*.css` with `@import` of a `@tacc/core-styles/` path

Then:

1. Contact https://github.com/wesleyboar.

    > **Note**
    > Those `@import`s assume:
    >
    > - Node
    > - NPM package `@tacc/core-styles`
    > - a CSS build script
    >
    > Whether to support those here, and how to port without support for those, has not been decided.

#### Expects CSS Concatenation

**If** the custom project directory expects CSS concatenation e.g. has

- `css/src/*.css` with `@import` of a relative path

Then:

1. Rename import paths appended with comment `Core-CMS:/taccsite_cms/…/`:
    - from `**/*.css`
    - to `/static/site_cms/css/build/*.css`
2. Rename relative import paths (e.g. `./**/*.css`):
    - from `**/*.css`
    - to `/static/custom_project_dir/css/**/*.css`
3. Add UI test steps to initial deploy of ported custom project.

#### Expects CSS

**If** the custom project directory expects any CSS at all i.e. has

- a template with `<link rel="stylesheet" href="{% static`

Then:

1. Move CSS tree:
    - from `.../custom_project_dir/static/css/src/`
    - to `.../custom_project_dir/static/css/`
2. Rename `href` paths:
    - from `custom_project_dir/css/build/**/*.css`
    - to `custom_project_dir/css/**/*.css`
3. Add UI test steps to initial deploy of ported custom project.

<!-- Link Aliases -->

[Core CMS]: https://github.com/TACC/Core-CMS
[Core Portal]: https://github.com/TACC/Core-Portal
[Core CMS Custom]: https://github.com/TACC/Core-CMS-Custom
[Core CMS Resources]: https://github.com/TACC/Core-CMS-Resources
[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments
