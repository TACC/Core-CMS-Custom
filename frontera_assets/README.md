# Frontera

https://frontera-portal.tacc.utexas.edu/

Static assets for the [Core CMS](https://github.com/TACC/Core-CMS) project

## Build Stylesheets

All CSS static files are built:

- **from** source files **in** `src` directories
- **to** compiled files **in** `build` directories

This allows use of future-proof CSS via [Core Styles].

1. Install Dependencies:

    > **Note**
    > Only necessary for initial clone **or** changes to Node dependencies.

    ```sh
    npm ci
    ```

2. Build Styles:

    ```sh
    npm run build
    ```

3. Update [Core Portal Deployments] `PORTAL_STYLES` setting e.g.

    - Change commit-ish identifier for:
        - `.../site.css`
        - `.../template.home.css`

<!-- Link Aliases -->

[Core Styles]: https://github.com/TACC/Core-Styles
[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments/blob/main/frontera-portal/camino/cms.settings_custom.py
