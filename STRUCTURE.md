# Structure

Target layout for every project directory ([#537](https://github.com/TACC/Core-CMS-Custom/issues/537)):

```
.
├── README.md
├── generic_assets
│   ├── README.md
│   ├── favicon.ico
│   ├── nsf-white.png
│   ├── portal_logo.png
│   ├── tacc-white.png
│   └── utaustin-white.png
└── PROJECTNAME_assets
    ├── README.md
    ├── package-lock.json    # as needed
    ├── package.json         # as needed
    ├── css
    │     ├── cms.css        # as needed
    │     ├── header.css     # as needed
    │     ├── portal.css     # as needed
    │     └── _imports/*.css # to @import
    ├── favicon
    │     ├── README.md
    │     ├── […]
    │     ├── favicon.ico
    │     ├── browserconfig.xml
    │     └── site.webmanifest
    ├── html
    |     └── snippet.html
    ├── img
    |     ├── icon[…].(png|svg)
    |     └── logo[…].(png|svg)
    ├── js
    │     ├── scriptA.js
    │     └── scriptB.js
    └── ref
          └── for project assets that do not fit the layout
```
