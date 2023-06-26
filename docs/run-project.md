# Run Project

## Individual Projects

Read the relevant `custom_project_dir/README.md`.

## Multiple Projects

> **Note**
> By default, multiple projects can not be run simultaneously.[^1]

To stop one project, and run another:

1. Cancel any active `make start` output i.e. press <kbd>control</kbd> + <kbd>C</kbd>.

2. Take down one project.

    > **Note**
    > This is equivalent to deleting the relevant set of related containers in Docker Desktop.

    ```sh
    cd custom_project_dir_1
    make stop
    ```

3. Start another project.

    > **Note**
    > This remove containers, but not volumes e.g. database.

    ```sh
    cd custom_project_dir_2
    make start
    ```

[^1]: If you want to run multiple projects simultaneously, see [Simultaneous Projects](#simultaneous-projects).

## Simultaneous Projects

> **Warning**
> With these instructions, you will **not** be able to use the database (**nor** internal search index) of an already set up custom project (i.e. its local volumes).[^2]

To run multiple projects simultaneously:

1. Stop and take down any started projects. (See [Multiple Projects](#multiple-projects) step 2.)
1. Create a custom `docker-compose.dev.yml` in your project.
2. Replace all instances of the text `core_cms` with the name of the `custom_project_dir`.

[^2]: Advanced adaptation of these instructions may support retaining database access, et cetera.

[copy a database]: https://confluence.tacc.utexas.edu/pages/viewpage.action?pageId=249135195
