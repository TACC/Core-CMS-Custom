# tup-cms

An extension of the [Core CMS](https://github.com/TACC/Core-CMS) project

## Architecture

- [`./src/apps`](./src/apps/): Contains any additional Django applications
- [`./src/taccsite_cms`](./src/taccsite_cms/): Contains settings files which specify additional apps, static files and middleware to load on top of Core CMS, along with standard Core CMS settings files
- [`./src/taccsite_custom`](./src/taccsite_custom/): Contains static assets and templates, organized in the way that Django CMS expects them before imported via `python manage.py collectstatic`.

## Running in Development Mode

A `Makefile` has been included for convenience. You may use

```bash
make start
```

## Porting from Core CMS Resources

When porting a downstream CMS project from [Core CMS Resources](https://github.com/tacc/core-cms-resources), the contents of a specific project's custom assets should be copied to [`./src/taccsite_custom`](./src/taccsite_custom/). The `settings_custom.py` from this directory should be moved to [`./src/taccsite_cms`](./src/taccsite_cms/) since that is where the file would be placed during a CMS build process from Jenkins.


## Automatic Builds

Automatic builds should occur on pushes to the `apcd-cms` directory
