# Structure

Target layout for every `PROJECTNAME_assets` directory, per [#537](https://github.com/TACC/Core-CMS-Custom/issues/537):

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
    ├── package-lock.json
    ├── package.json
    ├── css
    │     ├── cms.css    # as needed
    │     ├── header.css # as needed
    │     ├── portal.css # as needed
    │     └── _imports/*.css    # to @import
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
          ├── for related work that does not have a type yet.
          └── for related work that has a type.png
```

Not every project has migrated to this layout yet, and `package.json`/`package-lock.json` only exist where a project has a build step (see [AGENTS.md](./AGENTS.md) Gotchas).
