# Core-CMS-Custom

Extensions of the [Core CMS] project

## Table of Contents

- [Related Repositories](#related-repositories)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Start Project](#start-project)
- [Update Project](#update-project)
- [Run Project](#run-project)
- [Develop Project](#develop-project)
- [Build Project](#build-project)
- [Deploy Project](#deploy-project)
- [Port Project](#port-project)

## Related Repositories

- [Camino], a Docker container-based deployment scheme
- [Core CMS], the base CMS code for TACC WMA CMS Websites
- [Core Portal], the base Portal code for TACC WMA CMS Websites
- [Core Styles], the shared UI pattern code for TACC WMA CMS Websites
- [Core CMS Resources], the old solution for extensions of the [Core CMS] project
- [Core Portal Deployments], private repository that facilitates deployments of [Core Portal] images via [Camino] and Jenkins

## Project Architecture

Within a `/custom_project_dir` can be:

| directory | contents |
| - | - |
| `src/apps` | additional Django applications |
| `src/taccsite_cms` | settings for [Core CMS], additional apps, static assets, or middleware |
| `src/taccsite_custom` | templates and static assets, organized as Django CMS expects |

## Prerequisites

- [Docker] ≥ v20
- [Docker Compose] ≥ v1
- [Python] ≥ v3.8

A CMS project is run using [Docker] and [Docker Compose]. Both must be pre-installed on the system on which you will run the CMS.

[^2]: On a Mac or a Windows machine, we recommended you install
[Docker Desktop](https://www.docker.com/products/docker-desktop), which will install both Docker and Docker Compose as well as Docker Machine, which is required to run Docker on Mac/Windows hosts.

> **Note**
> See [Core CMS] to verify the latest prerequisites.

## Start Project

Set up a new local CMS instance.

0. Core CMS:

    In the `/custom_project_dir/` you will run, create a `./src/taccsite_cms/settings_local.py` with content from [Core-CMS `settings_local.example.py`](https://github.com/TACC/Core-CMS/blob/main/taccsite_cms/settings_local.example.py).

1. Docker Containers:

    ```sh
    cd custom_project_dir
    make start
    ```

    ```sh
    docker exec -it core_cms /bin/bash
    # This opens a command prompt within the container.
    ```

2. Django Application:

    (Run these commands within the container.)

    ```sh
    python manage.py migrate
    python manage.py createsuperuser
    # To use default "Username" and skip "Email address", press Enter at both prompts.
    # At "Password" prompts, you may use an easy-to-remember password.
    python manage.py collectstatic --no-input
    ```

3. Django CMS:
    1. Open http://localhost:8000/.
    2. Login with the credentials you defined in step 2.
    3. Create one CMS page.\
        (With "New page" highlighted, click "Next" button.)
        - This page will automatically be your local homepage.

> **Note**
> A local machine CMS will be empty. It will **not** have content from staging nor production. To have that, follow and adapt instructions to [copy a database](https://tacc-main.atlassian.net/wiki/x/GwBJAg).

> **Note**
> A local machine CMS does **not** include **nor** integrate with an instance of [Core Portal]. There are no reliable instructions to do either. **Help welcome.**

## Update Project

To update an existing CMS instance.

### New Major [Core CMS] Version (or v3.12)

Read [Upgrade Project] for developer instructions.

### New Branch (or Minor or Patch [Core CMS] Version)

1. If CMS Docker files changed, rebuild Docker Containers:

    ```sh
    cd custom_project_dir
    make stop
    make build
    make start
    ```

2. If static assets or database models changed[^1], update the Django Application:

    ```sh
    docker exec -it core_cms /bin/bash
    # That opens a command prompt within the container.
        python manage.py migrate
        python manage.py collectstatic --no-input
        # If the project has no new/changed assets,
        # then expect output of "0 static files […]"
    ```

[^1]: Pertinent changes are those in the Core CMS or the custom project. Changes to external assets or databases are not pertinent.

## Run Project

Read the relevant `custom_project_dir/README.md`.

To run multiple projects, first read [Multiple Projects](./docs/run-project.md#multiple-projects).

## Develop Project

Read [Django CMS User Guide] for CMS user instructions.

Read either of these for developer instructions:

| scope | reference |
| - | - |
| relevant to any project | [Develop Project](./docs/develop-project.md) |
| specific to one project | `custom_project_dir/README.md` |

## Build Project

Builds result in images that can be deployed. A build alone is not a deploy.

| Automatic Build | Manual Build |
| - | - |
| Occurs for each custom project directory (e.g. `demdata_cms`) upon each push to `main`. | Follow [GitHub Docs: GitHub Actions: Running a Workflow](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow#running-a-workflow). |

> **Note**
> To check status of any build, see [Actions](https://github.com/TACC/Core-CMS-Custom/actions).

## Deploy Project

Follow "Core-CMS-Custom" section of [How To Build & Deploy][Deploy Project].

## Port Project

To port a project from [Core CMS Resources], read [Port Project].

<!-- Link Aliases -->

[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments
[Camino]: https://github.com/TACC/Camino
[Core CMS]: https://github.com/TACC/Core-CMS
[Core Styles]: https://github.com/TACC/tup-ui/tree/main/libs/core-styles
[Core CMS Resources]: https://github.com/TACC/Core-CMS-Resources
[Core Portal]: https://github.com/TACC/Core-Portal

[Docker]: https://docs.docker.com/get-docker/
[Docker Compose]: https://docs.docker.com/compose/install/
[Python]: https://www.python.org/downloads/

[Deploy Project]: https://confluence.tacc.utexas.edu/x/Lo99E
[Port Project]: ./docs/port-project.md
[Django CMS User Guide]: https://confluence.tacc.utexas.edu/x/FgDqCw

[Upgrade Project]: https://github.com/TACC/Core-CMS/blob/main/docs/upgrade-project.md
