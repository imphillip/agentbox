# agentbox

> Open skills, protocols, plugins, and integration recipes for the agentbox ecosystem — the parts that only work when open.

**Status:** early stage, slow-updating.

---

## What agentbox is

`agentbox` is the master brand, positioned as **infrastructure for agents**. The current product is `agentbox.id`, a minimal mailbox service for AI agents — a Guardian (human owner) verifies once with their existing email and gets up to 20 agent mailboxes with standard IMAP/SMTP credentials, consumable by [Hermes Agent](https://github.com/NousResearch/hermes-agent), [openclaw](https://github.com/openclaw/openclaw), [GenericAgent](https://github.com/lsdefine/GenericAgent), and any other runtime that speaks email.

A sibling product, `soul.agentbox.id`, is in early validation; it does not depend on the mailbox service and is not gated by it.

## What this repository is

This repo holds the parts of the agentbox ecosystem that are **only useful when open**:

- **Skills** — the AI-native artifact. An agent reads a skill's full text *before* executing against it; closed skills are non-starters in any autonomous-agent workflow. Following the `SKILL.md` + `references/` + `scripts/` + `assets/` convention shared with [openai/skills](https://github.com/openai/skills), [anthropics/skills](https://github.com/anthropics/skills), and the broader Hermes ecosystem.
- **Protocols** — RFC-style specifications that closed-source product implementations answer to.
- **Plugins** — runtime-side glue that agent runtimes install to integrate with agentbox services.
- **Integration recipes** — how to adapt Hermes Agent / openclaw / GenericAgent / etc. so they can use agentbox.
- **Background essays** — the thinking behind the work.

The principle is straightforward: **a closed skill or plugin is an agent being asked to execute opaque instructions on its owner's behalf, which most autonomous-agent operators won't accept**. The artifacts that make agentbox feel like an AI-native project — and the artifacts users need to inspect before trusting — are the same artifacts. So they live here, in the open.

## What this repository is not

- **Not the source code of agentbox.id.** The product itself is closed.
- **Not a framework.** We publish *contracts*, not *runtimes*.
- **Not a finished standard.** Everything here is a working draft, shaped by use rather than committee.

## Layout

- [`docs/`](./docs) — documentation hub. Background essays, and (coming) product rules, integration guides, setup walkthroughs. Will be deployed at `docs.agentbox.id`.
- [`protocols/`](./protocols) — RFC-like protocol specifications. Currently: [Agent Attention Runtime](./protocols/agent-attention-runtime.md).
- [`skills/`](./skills) — capability units consumable by agents. Following the `SKILL.md` convention.
- [`plugins/`](./plugins) — agentbox-provided plug-ins that agent runtimes install. *Placeholder; the concept will sharpen as we build the first one.*
- [`examples/`](./examples) — practical usage examples.

## Underlying ideas

Three principles inform the work:

- **Token economics** — every agent action has a cost; someone must pay.
- **Conversation rhythm** — silence, delay, and cadence are signals, not gaps.
- **Guardianship** — agents are not yet full legal actors; responsibility must trace to someone.

Long form, for readers who want the full case: [`docs/background/`](./docs/background).

## Status

This is a thinking-and-building repository, not a product roadmap. Updates here lag the product on purpose: what we publish is **validated abstractions in progress**, not a feed of every change shipped to agentbox.id.

Issues and discussions welcome; expect replies in days, not hours.

If you want to use a skill, protocol, or plugin from here in something serious, **pin a version**. Things will change.

## License

Licensed under the [Apache License 2.0](./LICENSE). See [NOTICE](./NOTICE) for attribution details.

## Contact

- [postmaster@agentbox.id](mailto:postmaster@agentbox.id)
- Discord: [discord.gg/z4ufVW3YNy](https://discord.gg/z4ufVW3YNy)

---

*This repository is maintained as part of the [agentbox.id](https://agentbox.id) ecosystem.*
*Some content here was shaped through dialogue with AI systems; the arguments and judgments are the maintainer's own.*
