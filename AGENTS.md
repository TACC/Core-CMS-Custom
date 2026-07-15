# AGENTS.md

- [Architecture](#architecture)
- [Commits](#commits)
- [Pull Requests](#pull-requests)

## Architecture

This is a **static asset library**, not an application. Most projects have no build step, lint, nor test suite. Files are served directly to sites from CDN URLs (e.g. [jsDelivr](https://www.jsdelivr.com/?docs=gh)) in project's settings in [Core Portal Deployments] (private repo).

### Structure

Each project has its own root directory. Read [STRUCTURE.md](./STRUCTURE.md) for internal directory layout and file naming or [example_assets](./example_assets) for a template. Read `README.md` for full conventions (Create Project, Asset Management, Deploy Project).

### Gotchas

#### File Paths Are Load-Bearing

Renaming or moving a file breaks the CDN URL referenced in [Core Portal Deployments]. Check there (or ask, if you lack access) before changing a path.

#### Files in `html/` Are NOT Loaded by the CMS

They are just version-controlled copies of snippets maintained independently in the CMS admin interface (via [djangocms-snippet]). After editing one, update its snippet's "Name" field in CMS admin UI with commit/PR reference.

#### A Few Projects (e.g. `ecep`, `frontera`) Compile Their CSS

Each has its own `package.json` and build script. Run `npm run build` there before committing CSS changes. Everywhere else, verify a change by confirming the asset resolves correctly at its CDN URL.

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
[django-snippet]: https://github.com/django-cms/djangocms-snippet
