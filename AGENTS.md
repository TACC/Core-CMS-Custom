# AGENTS.md

- [Architecture](#architecture)
- [Commits](#commits)
- [Pull Requests](#pull-requests)

## Architecture

This is a **static asset library**, not an application. Most projects have no build step, lint, or test suite — files are served directly to sites' CDNs (via [jsDelivr](https://www.jsdelivr.com/?docs=gh)) and referenced by URL from each project's settings in [Core Portal Deployments] (private repo).

### Structure

Each project has its own `<project>_assets` directory (a few legacy directories omit the `_assets` suffix). See [STRUCTURE.md](./STRUCTURE.md) for the target internal layout, [example_assets](./example_assets) for a template, and `README.md` for full conventions (Create Project, Asset Management, Deploy Project).

### Gotchas

- **File paths are load-bearing.** Renaming or moving a file breaks the CDN URL referenced in [Core Portal Deployments]. Check there (or ask, if you lack access) before changing a path.
- **`html/snippets/` is not loaded by the CMS.** Those files are just version-controlled copies of snippets maintained independently in the CMS admin interface (djangocms-snippet). After editing one, update its snippet's "Name" field in the admin UI with the latest commit hash so the two stay traceable to each other.
- **A few projects (`ecep_assets`, `frontera_assets`) compile their CSS.** Each has its own `package.json` and `bin/build-css.js` that build `css/*.postcss` against `@tacc/core-styles` — run `npm run build` there before committing CSS changes. Everywhere else, verify a change by confirming the asset resolves correctly at its CDN URL once merged (or note manual verification steps in the PR's Testing section).

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
