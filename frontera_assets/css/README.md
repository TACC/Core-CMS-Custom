# Frontera - Stylesheets

## How to Load Stylesheets

### Global, via [Core Portal Deployments]

> [!TIP]
> This is the preferred method.

Add an entry in [`PORTAL_STYLES` in Frontera's CMS settings in Core-Portal-Deployemnts repo](https://github.com/TACC/Core-Portal-Deployments/blob/d6af7b2/frontera-portal/camino/cms.settings_custom.py#L51-L54).

#### Styles per Page or per Content

You can scope global styles to one page or to some content via `#some-id` or `.some-class` respectively.

- As a Django CMS editor, set a Page "Id" in Django CMS admin. [It will become the `<html id>` attribute.](https://github.com/TACC/Core-CMS/blob/v4.17.1/taccsite_cms/templates/base.html#L5)
- As a Django CMS editor, set an `id` or `class` attribtue on a block in the page Structure.

### Ad-Hoc via [djangocms-snippet](https://github.com/django-cms/djangocms-snippet)

> [!WARNING]
> Do this **only** during development. Styles cannot be as well versioned controlled via a snippet.

Add a snippet to the website that imports the stylesheet from a CDN e.g. ["CSS: Homepage" snippet](https://pprd.frontera-portal.tacc.utexas.edu/admin/djangocms_snippet/snippet/38/change/) ([backup copy](../html/snippets/css-homepage.css)).

## When to Build Stylesheets

If you have CSS that should use future or non-native features via [PostCSS] via [Core Styles]. If you change `.postcss` files, build your changes to `.css` files.

## How to Build Stylesheets

1. Install dependencies.

    > [!NOTE]
    > Only necessary for initial clone **or** relevant Node package changes.

    ```sh
    npm ci
    ```

2. Build styles.

    ```sh
    npm run build
    ```

3. Check/Update stylehseets imported from a CDN.

    Examples:
    - [Core Portal Deployments `PORTAL_STYLES`](https://github.com/TACC/Core-Portal-Deployments/blob/feat/WP-197-migrate-frontera/frontera-portal/camino/cms.settings_custom.py#L53)
    - ["CSS: Homepage" snippet](https://pprd.frontera-portal.tacc.utexas.edu/admin/djangocms_snippet/snippet/38/change/)

    Tasks:
    - If URL is pinned to commit hash, use new hash.
    - If URL is pinned to branch, test stylesheet has expected changes.

<!-- Link Aliases -->

[Core CMS]: https://github.com/TACC/Core-CMS
[Core Styles]: https://github.com/TACC/Core-Styles
[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments/blob/main/frontera-portal/camino/cms.settings_custom.py

[PostCSS]: https://postcss.org/
