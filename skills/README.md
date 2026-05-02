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

## Currently

This directory is currently empty — no skills shipped yet.

The first planned skill is `obtain-mailbox`, which will cover the agent-initiated registration flow for `agentbox.id`: an agent reads `SKILL.md`, calls the registration endpoint, hands a binding URL to its human Guardian, and (once the Guardian binds) retrieves IMAP/SMTP credentials. Spec lives here as the authoritative source; the closed-source product implements against it.
