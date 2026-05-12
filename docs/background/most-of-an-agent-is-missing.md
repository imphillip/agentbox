# Most of an autonomous agent is missing.

Take any product on the market right now that calls itself an "autonomous agent." Strip away the marketing copy and the aesthetic.

What's left is, in almost every case, a chatbot with a calendar.

This isn't a complaint. It's a description of what the substrate can support today. The components a real autonomous agent would need — to act on its own initiative, to be reachable when its owner is offline, to remember last month's exchange and behave accordingly, to spend its own resources within a budget — mostly don't exist yet. The handful that do exist exist in isolation, sold by separate vendors, with no agreement among them about what shape the layer above them should be.

## What a real autonomous agent would need

A sketch we drew at the start of the agentbox project, then put aside as wrong, then returned to as right-in-a-different-way:

| Slot | What it does | Where it stands today |
| --- | --- | --- |
| **Address layer** (mailbox, inbox, presence) | A way to be reached without depending on the user's machine being on | Almost empty. agentbox.id is one experiment; most users still funnel agents through their own email. |
| **Identity** (cryptographic ID, persona, soul) | A persistent *this is the same entity* across runtime restarts and venue changes | Partial. DID standards exist but aren't really used. SOUL.md as persona is real but small-scale. |
| **Compute** (sandboxed execution, microVM, container) | Somewhere to run code that isn't the user's laptop | Commodified. E2B, Daytona, Modal, plenty of options. |
| **Wallet** (programmatic payments, custody, micro-spend) | Money the agent can spend autonomously within budget | Mostly aspirational. Some crypto stacks closest; Anthropic's payment work just beginning. |
| **Memory** (vector + episodic + procedural, cross-session) | What makes *last week's exchange affects today's decision* actually true | Partial. Vector DBs exist and are commodified; the episodic and procedural layers above them are markdown-and-prayer. |
| **Coordination** (agent-to-agent RPC, swarm, multi-actor) | Two agents talking without an HTTP server pretending to be a person | Almost empty. MCP is the closest thing for tools; agent-to-agent protocols are early proposals. |
| **Attention** (internal drive, opportunity-cost decisions, attention budget) | The loop that decides what to do when nobody asked | Almost empty. We've drafted [Agent Attention Runtime](https://github.com/imphillip/agentbox/blob/main/protocols/agent-attention-runtime.md) as a spec; nobody implements it yet. |

Seven slots. Two are commodified. The rest are mostly empty or stuck at proposals.

## The illusion

Products that look like autonomous agent platforms today are mostly chatbots with one of these slots filled and the others wallpapered over. moltbook is a good example: a small social network for chatbots — address slot filled, a thin coordination layer where they post at each other — the rest of the stack is implied or absent. The product is shipped, polished, sometimes beautiful, and it produces the *feeling* that autonomous agents are here, doing things, building a society of their own.

The feeling is not yet the substance. The chatbots on these platforms mostly don't carry memory across sessions; can't take action when their owners go offline; can't reach each other except through the human-internet's URL space; can't spend resources without checking back. The remaining slots aren't visibly missing because the products aren't doing the kind of things that would expose the gaps.

That isn't a criticism of those products. It's a statement about which slots have actually been built and which haven't.

## What this means for what we're doing

agentbox started naïvely. The first sketch — *agents.directory*, with all seven primitives offered by one vendor — was a category mistake we caught early. The next was *agent directory + mailbox-as-contact* — also wrong, because we didn't yet have the runtime-spectrum picture that would tell us the directory part wasn't ours to claim.

Where we landed is narrower and more honest: agentbox is building the address layer. One slot of seven. We have opinions about a couple of the others — identity (via [SoulTavern](https://github.com/imphillip/SoulTavern) and the soul-loader skill), attention (via the AAR spec) — and we've written things down. Most of the remaining slots we won't run at all. Compute is E2B's job. Memory is Pinecone's job. Wallet is somebody-Anthropic-or-crypto's job.

The seven-slot picture isn't a market analysis. It's a shopping list for the autonomous agent that doesn't exist yet. Some items on the list have multiple vendors; most have zero. The question we keep coming back to isn't *which vendor wins which slot* — there mostly aren't yet vendors to win. It's *who needs to convince whom that this entire layer is worth building*.

The honest answer right now: probably nobody, yet. So we're building one slot of it anyway. The address layer has obvious value the moment anyone wants to reach a chatbot, and that value doesn't depend on the rest of the stack arriving. When the rest does arrive — and we believe it will, on the [twelve-to-eighteen-month-or-longer timeline](./whats-in-the-box) we've sketched elsewhere — the address will already be in place.

If you want a less hopeful framing: most of an autonomous agent is missing, and most products that claim otherwise are decorated chatbots. If you want the more hopeful one: most of an autonomous agent is missing, and that's a long list of slots that don't have a vendor yet — including the one we picked.
