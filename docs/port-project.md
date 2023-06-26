# Port Project

## From [Core CMS Resources]

To porting a downstream CMS project from [Core CMS Resources] to this repository:

1. Copy contents:
    - from [Core CMS Resources] `/taccsite_custom/custom_project_dir`
    - to `/custom_project_dir/src/taccsite_custom/custom_project_dir`

    > **Warning**
    > The name **must** use underscores (**not** dashes) to be a valid Python application.
2. Move custom project settings:
    - from `/custom_project_dir/src/taccsite_custom/custom_project_dir/settings_custom.py`
    - to `/custom_project_dir/src/taccsite_cms/settings_custom.py`
3. If the custom project has any edge cases, review relevant instructions:
    - [Old Custom Templates Directory](#old-custom-templates-directory)
    - [Expects CSS Build Step](expects-css-build-step)
    - [Expects CSS Concatenation](expects-css-concatenation)

### Old Custom Templates Directory

**If** the custom project directory:

- **both** had a name with dashes in [Core CMS Resources]
- **and** has `templates/standard.html` or `templates/fullwidth.html`

Then:

1. Copy the templates to become placeholders:
    - from `taccsite_custom/custom_project_dir/templates`
    - to `taccsite_custom/custom-project-dir/templates`

    > **Warning**
    > The name `custom-project-dir` **must** match the old name as it was, including dashes.
2. Edit the placeholder templates to extend the new templates e.g.

    ```django
    {% extends "custom_project_dir/templates/standard.html" %}
    ```

### Expects CSS Build Step

**If** the custom project directory expects CSS compilation e.g. has

- `css/src/*.css` with `@import` of a `@tacc/core-styles/` path

Then:

1. Contact https://github.com/wesleyboar.

> **Note**
> Those imports assume:
>
> - Node
> - NPM package `@tacc/core-styles`
> - a CSS build script
>
> Whether to support those here, and how to port without support for those, has not been decided.

### Expects CSS Concatenation

**If** the custom project directory expects CSS concatenation e.g. has

- `css/src/*.css` with `@import` of a relative path

Then:

1. Rename import paths appended with comment `Core-CMS:/taccsite_cms/…/`:
    - from `**/*.css`
    - to `/static/site_cms/css/build/*.css`
2. Rename relative import paths (e.g. `./**/*.css`):
    - from `**/*.css`
    - to `/static/custom_project_dir/css/build/*.css`
3. Add UI test steps to initial deploy of ported custom project.

<!-- Link Aliases -->

[Core CMS Resources]: https://github.com/TACC/Core-CMS-Resources
