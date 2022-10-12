# Core-CMS-Custom

Extensions of the [Core CMS] project

## Related Repositories

- [Camino], a Docker container-based deployment scheme
- [Core Portal], the base Portal code for TACC WMA CMS Websites
- [Core CMS Resources], the original solution for extensions of the [Core CMS] project
- [Core Portal Deployments], private repository that facilitates deployments of [Core Portal] images via [Camino] and Jenkins

## Architecture

- [`.../src/apps`](./src/apps/): Contains any additional Django applications
- [`.../src/taccsite_cms`](./src/taccsite_cms/): Contains settings files which specify additional apps, static files and middleware to load on top of Core CMS, along with standard Core CMS settings files
- [`.../src/taccsite_custom`](./src/taccsite_custom/): Contains static assets and templates, organized in the way that Django CMS expects them before imported via `python manage.py collectstatic`.

## Local Development Setup

### Prequisites for Running the CMS

See [Core-CMS](https://github.com/TACC/Core-CMS#prequisites-for-running-the-cms).

### Code Configuration

#### Settings

See [Core-CMS](https://github.com/TACC/Core-CMS#settings).

## Running the CMS

### Running in Development Mode

A `Makefile` has been included for convenience in each CMS project. You may use:

```bash
cd custom-project-dir
make start
```

### Running Custom App on a Custom CMS

- Update `custom_app_settings.py` with relevant content from [TACC/Core-CMS:`/taccsite_cms/custom_app_settings.example.py`](https://github.com/TACC/Core-CMS/blob/1d88c35/taccsite_cms/custom_app_settings.example.py).
- Update `urls_custom.py` with relevant content from [TACC/Core-CMS:`/taccsite_cms/urls_custom.example.py`](https://github.com/TACC/Core-CMS/blob/1d88c35/taccsite_cms/urls_custom.example.py).

## Porting from [Core CMS Resources]

When porting a downstream CMS project from [Core CMS Resources], the contents of a specific project's custom assets should be copied to [`./custom-project-dir/src/taccsite_custom`](./src/taccsite_custom/). The `settings_custom.py` from the CMS project directory should be moved to [`./custom-project-dir/src/taccsite_cms`](./src/taccsite_cms/) since that is where the file would be placed during a CMS build process from Jenkins.


## Automatic Builds

Automatic builds should occur on pushes to each CMS directory e.g. `apcd-cms`.


<!-- Link Aliases -->

[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments
[Camino]: https://github.com/TACC/Camino
[Core CMS]: https://github.com/TACC/Core-CMS
[Core Styles]: https://github.com/TACC/tup-ui/tree/main/libs/core-styles
[Core CMS Resources]: https://github.com/TACC/Core-CMS-Resources
[Core Portal]: https://github.com/TACC/Core-Portal
