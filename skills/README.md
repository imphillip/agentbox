# skills

This directory holds capability units consumable by AI agents. Each skill is a self-contained subdirectory with a markdown spec, optional reference docs, scripts, and assets — discoverable through the `skills/` convention shared by [openai/skills](https://github.com/openai/skills), [anthropics/skills](https://github.com/anthropics/skills), and runtime ecosystems like [HermesTavern](https://github.com/imphillip/hermes-tavern).

## Layout

```
skills/
└── <skill-name>/
    ├── SKILL.md          ← required: skill spec (markdown + YAML frontmatter)
    ├── references/       ← optional: long-form reference docs
    ├── scripts/          ← optional: executable entry points
    └── assets/           ← optional: data files, bundled binaries, sample inputs
```

## SKILL.md format

A skill is described by a single markdown file with YAML frontmatter:

```markdown
---
name: <skill-identifier>
description: <one-line description visible to agents at discovery time>
version: 0.1.0
guardian: <responsible party identifier>
license: Apache-2.0
---

# <Human-readable title>

(Markdown body — describes what the skill does, when to use it, how to invoke it,
failure modes, examples. Written for an LLM-shaped agent to read cold.)
```

### Required frontmatter (cross-ecosystem)

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | Stable identifier; matches the directory name. |
| `description` | string | One-line description — the primary signal an agent uses to decide whether to engage this skill. |

### Recommended frontmatter (agentbox convention)

| Field | Type | Notes |
| --- | --- | --- |
| `version` | semver string | Skills evolve; pin a version when you depend on one. |
| `guardian` | string | Identifier of the responsible party (per the [guardianship principle](../README.md#underlying-ideas)). |
| `license` | SPDX string | E.g. `Apache-2.0`, `MIT`. Defaults to the repo license if absent. |

### Optional frontmatter

| Field | Type | Notes |
| --- | --- | --- |
| `endpoints` | object | URLs the skill calls; for skills that talk to a remote service. |
| `requires` | object | Preconditions (e.g. `python: ">=3.10"`). |
| `tags` | array | Discovery hints. |

## Why skills must be open

A closed skill asks an agent to execute opaque instructions on its owner's behalf. Most autonomous-agent operators won't accept that — and shouldn't. **Skills only get used when their text and code can be inspected before execution.**

Two practical consequences:

1. **Trust** — the skill's full markdown body and all `scripts/` content must be readable in the source tree. No compiled-only blobs in critical paths.
2. **Discoverability** — the `skills/` convention is how agent runtimes (Hermes, OpenAI's, Anthropic's) find capabilities. A closed skill doesn't show up in `tap` searches or registry indexes.

Skills published in this repository are released under the repository's [Apache 2.0 license](../LICENSE) unless their own `license` frontmatter declares otherwise.

## URL convention

User-facing URL pattern (what humans paste into agents):

```
https://agentbox.id/setup/<skill-name>.md
```

All agentbox-blessed skills are served from the master domain `agentbox.id` at the `/setup/` path — lowercase, dash-separated filename, `.md` extension. Example:

- `https://agentbox.id/setup/soul-loader.md` (soul-loader)

The closed-product serving layer maps `/setup/<name>.md` → this repo's `skills/<name>/SKILL.md`. Same file content, two URLs, no duplication.

Why two paths:

- **`agentbox.id/setup/<name>.md`** — short, paste-share-friendly, free of casing pitfalls. The URL a human types into chat.
- **`skills/<name>/SKILL.md`** (in this repo) — the SKILL.md folder convention used by openai/skills, anthropics/skills, HermesTavern. What `hermes skills tap add <user>/<repo>` discovers.

## Currently shipped

- **[`soul-loader/`](./soul-loader)** *(v0.1.0, 2026-05-03)* — Install the soul-loading capability into a Hermes runtime. Wraps [HermesTavern](https://github.com/imphillip/hermes-tavern) (MIT) as the engine; future versions will route to per-runtime engines for openclaw, GenericAgent, etc. User-facing URL: [https://agentbox.id/setup/soul-loader.md](https://agentbox.id/setup/soul-loader.md).

## Planned

- `obtain-mailbox/` — agent-initiated registration flow for the `agentbox.id` mailbox service: agent reads the skill, calls a registration endpoint, hands a binding URL to its human Guardian, retrieves IMAP/SMTP credentials. Will live at `skills/obtain-mailbox/SKILL.md` (repo) and [`https://agentbox.id/setup/obtain-mailbox.md`](https://agentbox.id/setup/obtain-mailbox.md) (user-facing). Spec will live here as the authoritative source; the closed-source product implements against it.
