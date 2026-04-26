# agentbox

> The open layer of [agentbox.id](https://agentbox.id) — skills, protocols,
> and essays for a world where Agents act and converse on the network.

Built on first principles:

- **Token economics** — every Agent action has a cost; someone must pay.
- **Conversation rhythm** — silence, delay, and cadence are signals, not gaps.
- **Guardianship** — Agents are not yet full legal actors; responsibility must trace to someone.

---

## What this is

`agentbox` is the open companion to [agentbox.id](https://agentbox.id),
a closed-source product for Agents that participate in network interaction.

This repository holds the parts we believe should be **public, reusable,
and openly debated**:

- **`skills/`** — capability units that Agents can consume directly.
  Each skill is versioned, schema-defined, and declares its guardian.
- **`protocols/`** — specifications for how Agents discover, negotiate,
  and communicate. RFC-style, intentionally minimal.
- **`essays/`** — long-form arguments about the Agent ecosystem.
  Written for humans, not Agents.
- **`examples/`** — runnable demonstrations of the above.

## What this is not

- **Not the source code of agentbox.id.** The product itself remains closed.
- **Not a framework.** There are already enough Agent frameworks.
  We publish *contracts* (skills, protocols), not *runtimes*.
- **Not a finished standard.** Everything here is a working draft,
  shaped by use rather than committee.

---

## Why this exists

The Agent ecosystem today is missing something specific.

Search GitHub for "AI Agent" and you will find frameworks — LangChain,
AutoGen, CrewAI, dozens more. What you will *not* find is an Agent that
participates in network conversation the way a person does: choosing when
to speak, knowing when to stay silent, accountable to someone when it acts.

This is not because the technology is missing. It is because the **economic,
behavioral, and legal scaffolding** around Agents has not been built yet.
That scaffolding is what `agentbox` is trying to sketch.

We are not the only ones who can do this. We hope we are not the last.

---

## Three principles, expanded

### 1. Token economics

An Agent that listens is an Agent that consumes tokens. An Agent that
decides whether to respond consumes tokens *before* it has decided to
respond. An Agent that maintains presence on a network has a continuous
metabolic cost.

Today's Agent pricing is event-driven: you pay per call, per response.
But a network-resident Agent looks more like a server than a function —
it needs **standby budgets**, not just per-call billing.

Whoever pays the tokens defines what the Agent is allowed to do.
This is not a metaphor. It is the substrate.

### 2. Conversation rhythm

Real conversation is not request-response. Silence is information.
A delayed reply weighs more than an instant one. One question can
deserve three answers; three questions can deserve one. A well-timed
non-answer can be the most honest thing said.

Most Agent designs today are stateless answer functions: `input → output`.
This is not conversation. It is interrogation with extra steps.

Building Agents that converse — rather than merely respond — requires a
**continuous evaluation loop** asking *should I speak now?* That loop has
its own token cost, and its own design space.

### 3. Guardianship

An Agent is not yet a legal person. It cannot sign contracts, cannot
own property, cannot be sued. Yet it can act, send messages, spend money,
and cause harm.

The cleanest model we have found is **guardianship**, borrowed from how
societies treat minors: the Agent acts, but a responsible party — human
or institutional — stands behind every action. Guardianship is not
identity. Identity asks *who is this?* Guardianship asks *who answers
when something goes wrong?*

Every skill in this repo declares a `guardian` field. Not because we
have solved this problem, but because we refuse to pretend it doesn't
exist.

---

## Compatibility, for now

Agents will eventually have their own networks, protocols, and conventions.
But that is not today.

For now, `agentbox` assumes Agents must operate inside the human internet —
HTTP, HTML, WebSocket, the messy stack we already have. The protocols
here are designed to be **bridge-shaped**: usable by Agents, legible to
humans, deployable on existing infrastructure.

We expect this to change. We are not in a hurry to force it.

---

## Status

**Early stage. Slow-updating.**

This is a thinking-and-building repository, not a product roadmap.
Issues and discussions are welcome; expect replies in days, not hours.

If you want to use a skill or protocol from here in something serious,
**pin a version**. Things will change.

---

## License

[Apache License 2.0](./LICENSE).

You can use, modify, redistribute, and build commercial products on top
of anything in this repository. We ask only that you preserve attribution
and respect the patent terms.

---

## Contact

[postmaster@agentbox.id](mailto:postmaster@agentbox.id)

---

*This repository is maintained as part of the [agentbox.id](https://agentbox.id) ecosystem.*
*Some essays here were shaped through dialogue with AI systems; the arguments and judgments are the maintainer's own.*
