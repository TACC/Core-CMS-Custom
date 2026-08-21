# AGENTS.md

- [Architecture](#architecture)
- [Vocab](#vocab)
- [Commits](#commits)
- [Pull Requests](#pull-requests)

## Architecture

This is a **static asset library**, not an application. Most projects have no build step, lint, nor test suite. Files are served directly to sites from CDN URLs (e.g. [jsDelivr](https://www.jsdelivr.com/?docs=gh)) in project's settings in [Core Portal Deployments] (private repo).

### Structure

Read [README.md "Project Architecture"](./README.md#project-architecture) for introduction. Read all of `README.md` for full conventions (Create Project, Asset Management, Deploy Project).

### Gotchas

Read [README.md "Gotchas"](./README.md#gotchas).

## Vocab

- Use the word "deleted", not "removed".

## Commits

- **Format:** `.gitmessage` (fallback: `~/.gitmessage`)

## Pull Requests

- **Title:** `.gitmessage` (fallback: `~/.gitmessage`)
- **Description:** `.github/PULL_REQUEST_TEMPLATE.md` (fallback: `~/.github/PULL_REQUEST_TEMPLATE.md`)
  - In general:
    - When updating, first re-read the current description, because it may have been edited.
    - Be concise: plain language, simple sentences, present lists as bullets not prose.
    - Explanatory rationale specific to this PR's decisions belong in [review comments](#review-comments), not description.
    - Code comments are only for durable, non-obvious facts for future readers regardless of PR history.
    - Say each fact once (e.g. a dependency named in "Related" should not be repeated in "Notes").
  - In "Overview" section, match the template's example length (1 sentence) and density — not just its stated max (1–3), and not a single sentence stitched together from several clauses.
    - Say what changed and (only if omitting it would leave a reviewer confused or suspicious) why, never how.
  - In "Related" section, links to PRs should instead just be raw URLs (because GitHub will auto-create rich links).
  - In "Changes" section:
    - Group changes into as few bullets as the logical changes require (never one per file)
    - Default to zero explanation per bullet (e.g. `**added** logos`). Leave the detail for the code diff itself — a bullet is not the place to restate what the diff already shows.
    - Name files/identifiers by their bare name (`x-button.css`), not full path, unless the bare name is ambiguous.
    - Describe even the "what" at the highest level that's still meaningful — prefer a general noun ("shared rules") to an enumeration of the specifics behind it ("the such-and-such code block").
    - When several similarly-patterned names are affected the same way (e.g. a rename applied to 3 things), give one example plus `…` instead of listing all of them.
  - In "Testing" section:
    - One action per numbered step.
    - Prefer a step that compares directly against a running reference (e.g. production).

### Review Comments

- Group it into one self-review with inline comments.
- Prefix each such comment with:
    - either **Explanation:**, **Question:**, **Suggestion:**
    - or appropriate callout syntax (e.g. [GitHub Alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts))
- If commenting on a PR as the user instead of a distinct bot identity, then quote and sign your entire message.

[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments
