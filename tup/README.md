# Purpose

Custom assets for [TUP](https://github.com/TACC/tup-ui), migrated out of tup-ui's `apps/tup-cms/src/taccsite_custom/tup_cms/static/tup_cms/` so other projects can discover and reuse them.

## Status

Migration in progress, tracked across sub-PRs:

- `html/` — djangocms-snippet reference copies (done)
- `css/ad-hoc/`, `js/ad-hoc/` — ad-hoc CSS/JS assets loaded by the ad-hoc snippets (done)
- `css/cms.css` + `css/_imports/`, `js/modules/breadcrumbs.js`, `img/logo-*.svg` — assets from tup-ui's `for-tup-cms/` (done)
- tup-ui's `for-core-cms/` and `for-core-styles/` remainders were dead/superseded, not migrated
