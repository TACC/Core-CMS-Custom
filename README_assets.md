# Core-CMS-Custom - Web Assets

**Only custom assets** for a [Core CMS] project

## Table of Contents

- [Quick Start](#quick-start)
- [Project Architecture](#project-architecture)
- [Asset Management](#asset-management)
- [Build Project](#build-project)
- [Deploy Project](#deploy-project)
- [Port Project](#port-project)
- [Upgrade Project](#upgrade-project)

## Quick Start

1. Create a `customproject_assets` directory.
2. Add your assets into that directory.
3. Get paths to those assets [via a CDN](https://www.jsdelivr.com/?docs=gh).
4. Find the project in [Core Portal Deployments].
5. Set those paths in its CMS settings file ([example](https://github.com/TACC/Core-Portal-Deployments/blob/2391315/digitalrocks/camino/cms.settings_custom.py)).

## Project Architecture

Within a `/customproject_cms` can be:

| directory | contents | notes |
| - | - | - |
| `favicon.svg` | current favicon | `.svg` preferred |
| `favicon` | other favicons |
| `logo.svg` | current logo | `.svg` preferred |
| `logo` | other logos |
| `css` | custom styles |
| `js` | custom scripts |
| [`snippets`](https://github.com/django-cms/djangocms-snippet) | reusable markup | [manually saved](#save-snippets) |

## Asset Management

- [Change Logo](#change-logo)
- [Custom Styles](#custom-styles)
- [Save Snippets](#save-snippets)

### Change Logo

Changes **only** header on **both** CMS pages **and** Portal interface.

1. **Upload** logo to folder ([example](https://github.com/TACC/Core-CMS-Custom/blob/4bff8af/digitalrocks_assets/NSF-DigitalRocks-Logo-White.svg "https://github.com/TACC/Core-CMS-Custom/blob/4bff8af/digitalrocks_assets/NSF-DigitalRocks-Logo-White.svg")).

2. In [Core Portal Deployments],\
    **set** path to that logo [via CDN](https://www.jsdelivr.com/?docs=gh "https://www.jsdelivr.com/?docs=gh") ([example](https://github.com/TACC/Core-Portal-Deployments/blob/2391315/digitalrocks/camino/cms.settings_custom.py#L11 "https://github.com/TACC/Core-Portal-Deployments/blob/2391315/digitalrocks/camino/cms.settings_custom.py#L11")).

3. **[Deploy](#deploy-project)** the change.

### Custom Styles

These will load on **every page**.

1. **Upload** CSS to folder. Examples:

    - [one short stylesheet](https://github.com/TACC/Core-CMS-Custom/blob/e70089f/ctrn_assets/site.cms.css "https://github.com/TACC/Core-CMS-Custom/blob/e70089f/ctrn_assets/site.cms.css")
    - [one long stylesheet](https://github.com/TACC/Core-CMS-Custom/blob/e70089f/ecep_assets/css/site.css "https://github.com/TACC/Core-CMS-Custom/blob/e70089f/ecep_assets/css/site.css")
    - [multiple stylesheets](https://github.com/TACC/Core-CMS-Custom/tree/4bff8af/digitalrocks_assets/css "https://github.com/TACC/Core-CMS-Custom/tree/4bff8af/digitalrocks_assets/css")

2. In [Core Portal Deployments],\
    **set** path(s) to stylesheet(s) [via CDN](https://www.jsdelivr.com/?docs=gh "https://www.jsdelivr.com/?docs=gh"). Examples:

    - [one stylesheet](https://github.com/TACC/Core-Portal-Deployments/blob/2391315/ecep/camino/cms.settings_custom.py#L53-L56 "https://github.com/TACC/Core-Portal-Deployments/blob/2391315/ecep/camino/cms.settings_custom.py#L53-L56")

    - [multiple stylesheets](https://github.com/TACC/Core-Portal-Deployments/blob/2391315/digitalrocks/camino/cms.settings_custom.py#L30-L39 "https://github.com/TACC/Core-Portal-Deployments/blob/2391315/digitalrocks/camino/cms.settings_custom.py#L30-L39")

3. **[Deploy](#deploy-project)** the change.

### Save Snippets

> [!IMPORTANT]
> Snippets are **not** loaded by the CMS from here **nor** a CDN. They are maintained independently in the CMS admin interface. This folder just lets us version control them.

1. **Upload** snippet(s) to folder ([example](https://github.com/TACC/Core-CMS-Custom/tree/main/ecep_assets/html/snippets "https://github.com/TACC/Core-CMS-Custom/tree/main/ecep_assets/html/snippets")).

2. In the CMS admin interface:\
    **document** the latest commit of each snippet ([examples](https://ecepalliance.org/admin/djangocms_snippet/snippet/ "https://ecepalliance.org/admin/djangocms_snippet/snippet/")) e.g.

    - **Name:** `Page: Members: JS (last commit: 2bcadc0)`
    - **Name:** `Page: Members: CSS (TACC/Core-CMS-Custom#321)`

## Build Project

Follow [Core CMS: Build & Deploy Project](https://github.com/TACC/Core-CMS#build--deploy-project).

## Deploy Project

Follow "Deploy" section of [How To Build & Deploy][Deploy Project].

## Port Project

To port a project from [Core CMS Resources], read [Port Project].

## Upgrade Project

To upgrade the [Core CMS] of an existing project:

- Update its CMS image tag in [Core Portal Deployments] ([example](https://github.com/TACC/Core-Portal-Deployments/blob/23913151/digitalrocks/camino/prod.env#L24)).

<!-- Link Aliases -->

[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments
[Camino]: https://github.com/TACC/Camino
[Core CMS]: https://github.com/TACC/Core-CMS
[Core Styles]: https://github.com/TACC/tup-ui/tree/main/libs/core-styles
[Core CMS Resources]: https://github.com/TACC/Core-CMS-Resources
[Core Portal]: https://github.com/TACC/Core-Portal

[Deploy Project]: https://tacc-main.atlassian.net/wiki/x/YAVv#3.-Deploy
[Port Project]: ./docs/port-project.md
