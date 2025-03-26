# Core-CMS-Custom

[Core CMS] projects with custom functionality and/or assets

## Table of Contents

- [Related Repositories](#related-repositories)
- [Project Architecture](#project-architecture)
- [Learn More](#learn-more)
## Related Repositories

- [Camino], a Docker container-based deployment scheme
- [Core CMS], the base CMS code for TACC WMA CMS Websites
- [Core Portal], the base Portal code for TACC WMA CMS Websites
- [Core Styles], the shared UI pattern code for TACC WMA CMS Websites
- [Core CMS Resources], the old solution for extensions of the [Core CMS] project
- [Core Portal Deployments], private repository that facilitates deployments of [Core Portal] images via [Camino] and Jenkins

## Project Architecture

| directory | contents |
| - | - |
| `someproject_cms` | an instance of [Core CMS] with custom functionality |
| `someproject_assets` | custom assets for a [Core CMS] instance |

## Learn More

- [Projects with Custom Functionality](./README_cms.md)
- [Projects with Only Custom Assets](./README_assets.md)

<!-- Link Aliases -->

[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments
[Camino]: https://github.com/TACC/Camino
[Core CMS]: https://github.com/TACC/Core-CMS
[Core Styles]: https://github.com/TACC/tup-ui/tree/main/libs/core-styles
[Core CMS Resources]: https://github.com/TACC/Core-CMS-Resources
[Core Portal]: https://github.com/TACC/Core-Portal
