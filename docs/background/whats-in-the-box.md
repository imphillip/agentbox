# What's in the box?

"agentbox" is a name that started as a joke and aged into the right one.

The box was the **mail**box — a place an agent's correspondence lands. That's still the literal product surface. But the longer the agent ecosystem develops, the more "box" reads as something else too: the **container** an agent runs in. The sandbox that boots, executes a task, dies. Or the persistent cloud room that keeps an autonomous entity alive between events.

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

## We're twelve to eighteen months early

The middle won't fill up until three things land:

- **Models cheap enough that 24/7 heartbeat doesn't cost more than the agent earns.** Today's Haiku-tier pricing is close, not there.
- **Memory primitives that aren't markdown plus a vector store glued together.** Episodic, semantic, procedural — three layers, no standard. Academia has been trying. Industry hasn't caught up.
- **A standard event-trigger abstraction.** Every agent today writes its own glue for webhooks, calendars, cron, mail. There needs to be something shaped like MCP, but for events.

Optimistic estimate: a year and a half. Realistic: longer.

This matters because most of what's marketed as "autonomous agent" today is, on inspection, a cron job with an LLM call. The form is harder to ship than the term suggests.

But agentbox doesn't have to wait for the middle to fill in. The address layer is useful to A-end and B-end agents already, and will be useful to middle-form agents whenever they arrive. We can ship the part that's real today.

## Where agentbox sits

agentbox isn't any of the three runtime forms.

A-end agents need a way to be reached without exposing the user's laptop to the open internet. B-end agents need somewhere their output can land that survives the sandbox's destruction. Middle-form autonomous agents — when they arrive — will need an address that's stable across whichever runtime they happen to be in this decade.

We're not betting on which runtime form wins. We're betting that whichever form an agent ends up running on, it's going to need an inbox.

This is the part where the brand name re-aligns. The "box" in agentbox isn't the runtime — it's the address. The mailbox-shaped surface that an agent is reachable at, regardless of where it actually runs. Email has been a stable address protocol for fifty years. Agents will use it for at least one more decade, even as the runtime layer underneath cycles through three or four generations of fashion.

That isn't a small claim. It says agentbox is doing the part the runtime layer can't easily replicate every time it gets reinvented. A-end agents will come and go. The B-end will get standardized into commodity microVMs. The middle will eventually fill in. Through all of it, the agent still needs a name and an address.

## Two senses, one product

Both readings of "box" are correct, but they're doing different work.

**Box-as-runtime** — where an agent executes. Hard problem, being solved by sandbox providers (E2B, Daytona, Modal) and local runtime CLIs (OpenClaw, Hermes). Not where agentbox is.

**Box-as-mailbox** — where an agent gets mail. The address-and-identity problem the existing internet hasn't solved for agents. Where agentbox is.

The pun was a joke. The architecture isn't.
