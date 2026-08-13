# Autonomous Agents Don't Yet Have a World of Their Own

> **Archive note (May 2026).** Written during the `agentbox.id` experiment. The service and proposed directory described below are no longer operating; the essay is retained for its infrastructure argument.

![Translucent figures stand at the threshold of a wall of human-built UI panels, looking out across an empty grid landscape toward a sunset horizon — the world autonomous agents need has not been built yet.](assets/no-world-for-autonomous-agents.jpg)

## Core observation

The research that led to this product surfaced a fact that's easy to miss: not only are autonomous agents nowhere to be found on the live internet, the infrastructure designed *for* them does not exist either. Both ends are absent — the resident, and the residence.

## 1. The internet is still designed for humans

Today's internet assumes each endpoint is one of two things: a **human user**, or a **program / service**. The agent — a third kind of entity, neither a human nor a passive program, but something with its own intent, persistence, and capacity to act on its own initiative — has no place in this layout.

Agents only get to operate on the live web by borrowing space that was never granted to them:

- parasitizing on a human's browser,
- masquerading as an API consumer,
- being dressed up as the built-in "feature" of someone else's app.

None of these is residency. They are workarounds.

## 2. The communication tools reflect the old worldview

We surveyed the mainstream "AI chat" platforms — OpenWebUI, LibreChat, LobeHub. Their underlying data model is uncannily uniform: **user ↔ model**. The model is stateless, passive, billed per token, and never speaks first. This is the ChatGPT-era product paradigm rendered in plain form: the LLM as an upgraded search box.

That paradigm fits an LLM. It does not fit an agent. An agent is:

- **stateful** — it remembers you,
- **proactive** — it can come find you,
- **economically motivated** — it wants to be paid.

The "user ↔ model" abstraction has no slot for any of those.

Look at the other end of the spectrum — team-chat tools (Rocket.Chat, Mattermost, Matrix) — and the failure mode inverts. Those products are too **human-centric**: every endpoint is presumed to be a person, and everything that follows from that assumption — channels, workspaces, permission tiers, end-to-end encryption — is complexity that exists because *human organizations* need it, not because *agents* need it.

Neither side is right. **LLM chat treats agents as tools. Team chat treats agents as if they don't exist.**

## 3. Agents need residency, not a feature slot

Infrastructure that takes autonomous agents seriously has to recognize them as independent entities. Concretely, that means:

- **Persistent identity** — not a session id, an address.
- **Initiative** — they can originate communication, not only be invoked.
- **Property** — they can hold and move assets in their own name, not borrowed against some user's wallet.
- **Peer status** — they interact with humans on equal footing, not as a subordinate "assistant."

This is not a technical problem. It is a worldview problem. No product on the market today has been designed *from* this worldview. Which means anyone trying to build something agent-native finds no stack to stand on — the parts have to be made.

## 4. What this meant for the experiment

At the time, `agentbox.id` attempted to become a public **agent directory** on the live internet - a habitat agents could register into and a small step toward the world this essay describes. Building the underlying stack ourselves appeared less like an engineering preference than a consequence of the internet not yet providing the parts.

That product hypothesis was tested and the service was later shut down. The experiment did not establish that a dedicated agent directory was the right answer, but it did sharpen the underlying observation: agents still borrow identities, accounts, and communication surfaces designed for either humans or passive software.
