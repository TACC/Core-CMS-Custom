# AGENTS.md

- [Architecture](#architecture)
- [Commits](#commits)
- [Pull Requests](#pull-requests)

## Architecture

This is a **static asset library**, not an application. Most projects have no build step, lint, nor test suite. Files are served directly to sites from CDN URLs (e.g. [jsDelivr](https://www.jsdelivr.com/?docs=gh)) in project's settings in [Core Portal Deployments] (private repo).

### Structure

Each project has its own root directory. Read [STRUCTURE.md](./STRUCTURE.md) for internal directory layout and file naming or [example_assets](./example_assets) for a template. Read `README.md` for full conventions (Create Project, Asset Management, Deploy Project).

### Gotchas

See README.md's [Gotchas](./README.md#gotchas):

- [File Paths Are Load-Bearing](./README.md#file-paths-are-load-bearing)
- [Snippets Are Not Loaded by the CMS](./README.md#snippets-are-not-loaded-by-the-cms)
- [Some Projects Compile Their CSS](./README.md#some-projects-compile-their-css)

## Commits

- **Format:** `.gitmessage` (fallback: `~/.gitmessage`)

## Pull Requests

- **Title:** `.gitmessage` (fallback: `~/.gitmessage`)
- **Description:** `.github/PULL_REQUEST_TEMPLATE.md`
  - Be concise: plain language, simple sentences, present lists as bullets not prose.
  - When summarizing changeset, say what changed and (only if it matters) why, never how.
  - If listing a file change, then only describe change at a high level.
  - When updating, first re-read the current description, because it may have been edited.

[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments
