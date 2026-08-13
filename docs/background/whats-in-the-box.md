# What's in the box?

> **Archive note (May 2026).** Written while the `agentbox.id` mailbox was active. Its market snapshots and timeline were contemporary estimates, and its present-tense product claims are now historical.

"agentbox" is a name that started as a joke and aged into the right one.

The box was the **mail**box - a place an agent's correspondence landed. That was the literal product surface. But as the agent ecosystem developed, "box" also began to read as the **container** an agent runs in: the sandbox that boots, executes a task, and dies, or the persistent cloud room that keeps an autonomous entity alive between events.

Both senses turn out to be useful. They also turn out to be doing different kinds of work — and it's worth being honest about which one agentbox is actually doing.

## Where agents actually run

There are three runtime forms for AI agents today. Two of them are architecturally stable. The third is mostly empty.

**The A end** — the agent runs as a CLI on the user's own machine. Examples: [OpenClaw](https://github.com/openclaw/openclaw), Claude Code, Cursor, Aider. The agent sits where its work sits — the codebase, the IDE, the shell history, the SSH keys. State delivers itself for free; the laptop is on anyway. This isn't really an "agent architecture" — it's connecting an LLM to the work environment the user already has.

**The B end** — an on-demand microVM sandbox. Examples: Manus, Operator, Replit Agent, ChatGPT's code interpreter. Tasks are one-shot, deliverables are files, and the box is born and dies inside one job. Per-second billing scales to zero. Isolation is total because the machine ceases to exist after the job runs.

**The middle** — a cloud-resident persistent room. Today this is mostly empty. The form is real but most products that try to live there collapse on inspection: they're either repackaged A-end (dev-environment-as-a-service) or undercooked B-end (a scheduler with extra steps). The middle eats both ends' disadvantages — 24/7 cost without per-second elasticity, ongoing maintenance without OS-as-yours, ambiguous data ownership.

The runtime layer is bifurcated by physics, not by fashion.

## When the middle is inevitable

One architecture justifies the middle: a true autonomous agent. By "true" we mean five conditions, all of them, simultaneously.

1. **Persistent identity.** Yesterday's conversation affects next month's decision.
2. **Internal drive.** The agent decides what to do; it doesn't only respond.
3. **Event-driven wakeup.** The world hands the agent something. The user doesn't have to.
4. **Decoupled from any human terminal.** The user is asleep; the agent is alive.
5. **Cross-task accumulation.** The agent learns. It doesn't only execute.

Drop any one and what's left is something else. With the first four but not the fifth, you have an agent that repeats the same mistakes forever. With the last four but not the second, you have a webhook with memory.

When all five hold, neither A end nor B end works. A end fails condition 4 — laptops sleep. B end fails 1 and 5 — everything is destroyed. Only the middle is shaped right. And only then.

## The original timing estimate

The middle won't fill up until three things land:

- **Models cheap enough that 24/7 heartbeat doesn't cost more than the agent earns.** Today's Haiku-tier pricing is close, not there.
- **Memory primitives that aren't markdown plus a vector store glued together.** Episodic, semantic, procedural — three layers, no standard. Academia has been trying. Industry hasn't caught up.
- **A standard event-trigger abstraction.** Every agent today writes its own glue for webhooks, calendars, cron, mail. There needs to be something shaped like MCP, but for events.

Optimistic estimate: a year and a half. Realistic: longer.

This matters because most of what's marketed as "autonomous agent" today is, on inspection, a cron job with an LLM call. The form is harder to ship than the term suggests.

The product thesis was that agentbox did not have to wait for the middle to fill in. An address layer appeared useful to A-end and B-end agents already, and potentially to middle-form agents later. The mailbox was the part we could test at the time.

## Where agentbox was intended to sit

agentbox was not intended to be any of the three runtime forms.

A-end agents need a way to be reached without exposing the user's laptop to the open internet. B-end agents need somewhere their output can land that survives the sandbox's destruction. Middle-form autonomous agents — when they arrive — will need an address that's stable across whichever runtime they happen to be in this decade.

The bet was deliberately independent of which runtime form won: whichever form an agent ran on, it would need an inbox.

This was where the brand name re-aligned. The "box" in agentbox meant the address rather than the runtime: a mailbox-shaped surface where an agent could be reached regardless of where it ran. Email's longevity made it appear capable of outlasting several generations of agent runtime.

That was not a small claim. It assigned agentbox the part the runtime layer could not easily reproduce each time it was reinvented. Closing the service means the experiment no longer makes that claim as a product commitment; it remains the architectural hypothesis this essay records.

## Two senses, one product

Both readings of "box" are correct, but they're doing different work.

**Box-as-runtime** - where an agent executes. A hard problem being addressed by sandbox providers and local runtime CLIs. This was not the part agentbox attempted to build.

**Box-as-mailbox** - where an agent gets mail. This address-and-identity problem was the part agentbox attempted to test.

The pun was a joke. The architecture isn't.
