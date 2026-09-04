# When Intelligence Becomes Abundant, What Remains Scarce?

> **Essay (September 2026).** Written after the `agentbox.id` service closed, this note revisits the archive's runtime thesis in light of stronger models and the changing role of AI builders.

In May, while writing about the runtime spectrum for AI agents, I argued that compute was already becoming commodified. Containers, microVMs, browser sandboxes, and short-lived execution environments were increasingly easy to rent. The harder parts of a durable autonomous agent seemed to live elsewhere: identity, memory, event-driven wakeup, permissions, attention, and the ability to remain useful when no human terminal was open.

Four months later, that argument needs an update.

On September 3, 2026, OpenAI released GPT-6 Astra, with major gains in software engineering, computer use, browsing, and long-running professional workflows. The interesting part is not that another benchmark moved upward. The interesting part is what happens when a frontier model can increasingly understand a software request, write the code, operate the browser, inspect the result, repair mistakes, and continue across a multi-step workflow.

That capability puts pressure on an entire class of products that became popular during the first wave of vibe coding. The pressure is not evenly distributed.

The closer a product's value proposition is to **"we turn your prompt into code,"** the more exposed it is. The closer it is to **"we give generated software somewhere reliable to live, operate, persist, transact, and reach users,"** the more durable its position becomes.

The model is eating the builder layer. It is not eating the world around the model.

## The disappearing premium on generation

Products such as Lovable, Replit, Aippy, Bolt, and many others grew during a period when there was still a meaningful gap between what a general-purpose model could describe and what a production application required.

The builder filled that gap.

```text
User intent
   -> AI builder
   -> coding model
   -> source code
   -> preview
   -> deployment
```

The builder added orchestration around the model: project files, retry loops, compiler feedback, package installation, previews, deployment targets, and opinionated framework choices.

That orchestration remains useful. But the amount of intelligence that has to live inside the builder is shrinking.

If the frontier model itself can reliably:

```text
understand the requirement
-> inspect an existing repository
-> write and patch code
-> use a terminal
-> operate a browser
-> observe errors
-> repair them
-> deploy the result
```

then "our AI can build your app" stops being a defensible product claim. It becomes an interface choice.

This does not mean the market for AI-built software disappears. Quite the opposite. In June, Lovable said it had crossed $500 million in annualized revenue and was seeing roughly one million new projects per week. Those are company-reported figures, but they suggest that demand for software creation has expanded dramatically.

They also expose the deeper question: **what exactly are customers paying for once generation itself becomes abundant?**

The first answer used to be intelligence.

That answer is getting weaker.

## Aippy shows one escape route

Aippy is instructive because it has already started moving away from the most vulnerable layer.

At first glance, it looks like another AI application generator: describe an interactive experience, let the system build it, preview it, modify it, and publish it.

But its more interesting direction is not generation. It is distribution.

In June, Aippy described itself as an AI-native game community and said its next priorities were improving recommendation and distribution, and strengthening the creator ecosystem. The company also reported more than three million downloads, close to two million monthly active users, and more than two million user-generated games.

Those figures are company-reported, but the strategic direction matters more than the exact number.

If Aippy were merely:

```text
Prompt -> game
```

then GPT-6 Astra is bad news.

If Aippy becomes:

```text
Prompt -> game -> publish -> feed -> play -> remix
       -> social graph -> recommendation -> creator economy
```

then stronger models may actually help it.

The cost of creating interactive content falls. The number of creations rises. Once supply becomes excessive, **discovery becomes scarce**.

TikTok did not become valuable because it owned the world's best video-editing software. YouTube is not protected because nobody else can encode video. Steam is not valuable because Valve is uniquely capable of compiling a game.

Their value sits in distribution, identity, reputation, discovery, payment, moderation, and network effects.

Aippy's survival path is therefore not to build a better coding model than OpenAI or Anthropic. It is to become a place where interactive software is consumed.

That is a much more defensible layer.

## Replit points to another answer: execution

Replit illustrates a different response.

Instead of insisting that users enter Replit first, it has increasingly allowed other AI systems to become the interface. By 2026, Replit could be invoked from ChatGPT and handed work from Claude.

The architecture becomes:

```text
ChatGPT / Claude / another model
              -> Replit
              -> build / run / deploy
```

This is a subtle but important concession.

The upstream intelligence layer can change. The execution layer remains.

A model may understand perfectly what an application should do, but production software still needs mundane things:

- a filesystem;
- dependencies;
- processes;
- networking;
- secrets;
- databases;
- logs;
- storage;
- domains;
- scheduled jobs;
- permissions;
- isolation;
- restart behavior;
- deployment;
- observability.

A model can produce the instructions for those things. It does not make those things disappear.

This is the same distinction cloud computing made twenty years ago. Better programming languages did not eliminate servers. Better compilers did not eliminate operating systems. Higher-level frameworks changed who operated the lower layers and how visible they were.

AI is likely to do the same.

## What aClaw taught me

Around this period I also built aClaw, a platform where users could rent independent OpenClaw or Hermes agents, each with its own isolated container.

The original product framing was straightforward:

```text
User -> dedicated agent -> dedicated container
```

The agent had somewhere to run, somewhere to keep files, and an environment that remained separate from other users.

At the time, it was natural to think of the **agent** as the product and the container as infrastructure underneath it. I would reverse that emphasis now.

OpenClaw can be replaced. Hermes can be replaced. GPT-6 Astra can become the agent. A future model can replace GPT-6 Astra.

The durable asset is closer to:

```text
model
  -> agent logic
  -> isolated runtime
       |- filesystem
       |- shell
       |- browser
       |- network
       |- secrets
       |- scheduler
       |- persistent state
       `- services
```

The model is intelligence.

The box is where that intelligence becomes operational.

When intelligence was scarce, a product could plausibly sell access to a particular agent implementation. When intelligence becomes abundant, the question changes:

> Where can this intelligence safely live and work?

## From "rent an agent" to "give an AI a computer"

This suggests a different way to think about agent infrastructure.

"Rent an OpenClaw agent" is tied to a specific implementation. "Deploy an agent" is broader. But the most model-independent framing may simply be:

> **Give an AI a computer that stays alive.**

Not necessarily alive in the biological or philosophical sense. Operationally alive.

It can retain state between tasks. It can receive an event while the user is offline. It can wake up, use tools, modify files, expose a service, wait, restart, and continue later.

This is where the earlier agentbox runtime discussion becomes relevant again.

In the May essay [*What's in the box?*](./whats-in-the-box.md), I divided agent execution into three forms:

1. local agents running on the user's own computer;
2. ephemeral cloud sandboxes created for a task and destroyed afterward;
3. persistent cloud rooms for agents that need to exist between events.

The third category looked economically awkward at the time. It combined the cost of a server with the complexity of an autonomous system.

That remains true. But stronger models increase the number of workloads for which the third form makes sense.

Consider a simple request:

> Watch twenty competitors, check their sites every hour, investigate meaningful changes, update a research file, and alert me only when something matters.

The model can increasingly write the monitoring code and decide what constitutes a meaningful change. But the job still needs:

```text
a persistent identity
a schedule
network access
a browser
credentials
state from previous checks
a place to write results
an outbound notification path
resource limits
```

This is not fundamentally an intelligence problem.

It is an execution and persistence problem.

## The value migration

The history of software repeatedly moves value through the stack. AI is now causing another migration.

During the early generative-AI period, model access itself was scarce and valuable. Then orchestration became valuable: prompt frameworks, coding agents, tool use, RAG stacks, and workflow builders.

As frontier models absorb more of that orchestration, value migrates again.

```text
2023-2024
Model access is scarce
        -> value: intelligence

2024-2026
Models need substantial scaffolding
        -> value: AI applications and builders

2026-
Models can perform more complete work
        -> value: execution, persistence,
           identity, permissions,
           data, distribution, transactions
```

This is not a prediction that model companies win everything. It is almost the opposite.

If intelligence becomes a widely available upstream resource, products that depend on owning intelligence become less differentiated. Products that control scarce downstream resources become more important.

## What remains scarce

Several things do not become abundant merely because GPT-6 Astra is better.

### Execution

Code needs somewhere to run. Agents need CPUs, memory, browsers, networks, and operating-system boundaries.

### Persistence

A task can be ephemeral. A business process usually is not. Files, state, histories, credentials, deployments, and long-running services must survive model calls.

### Identity

If an agent acts across days or months, other systems need to know that today's actor is the same one that acted yesterday. This was one of the original questions behind agentbox.

### Permissions

A sufficiently capable model creates a new problem: it can do more. That makes authorization more important, not less.

What may this agent read? What may it change? How much money may it spend? Which domains may it contact? When must it ask?

GPT-6 Astra's launch materials emphasize stronger safeguards around computer and cybersecurity capabilities. As models become better operators, runtime-level containment becomes part of the product.

### Data

A general model may know a great deal about the world. It does not automatically own the private operational history that makes an agent useful to a specific person or company. The durable context often lives outside the model.

### Distribution

When everyone can create, creation stops being the bottleneck. Attention becomes the bottleneck.

This is where Aippy's feed matters more than its code generator.

### Transactions

An agent that can recommend an action is different from an agent that can safely execute a payment, purchase infrastructure, settle with a supplier, or manage a bounded budget. The economic interface remains a separate layer.

## Builders will not disappear. Their job description will.

There will still be products called AI builders.

Users do not necessarily want to assemble infrastructure primitives themselves. Opinionated workflows, good defaults, templates, visual editing, deployment, collaboration, and support are real product value.

But the builder that survives is unlikely to be the one with the cleverest prompt wrapper. It will be the one that owns something the model cannot simply reproduce in a response:

- a runtime;
- a deployment fabric;
- enterprise permissions;
- proprietary data;
- a marketplace;
- a creator network;
- a payment network;
- a distribution channel;
- a durable identity layer.

The surface may still look like "describe what you want and we build it."

The business underneath will be something else.

## Intelligence is becoming a utility

There is a tempting analogy here with electricity.

Once electricity became broadly available, companies stopped differentiating themselves by owning a better private generator. Value moved into what electricity powered.

The analogy is imperfect, but useful.

Frontier intelligence is moving toward being an upstream utility: expensive, technically sophisticated, and controlled by a small number of providers, but increasingly callable by anyone building downstream products.

If that continues, a startup should be cautious about building its moat entirely out of behavior that the next model release can absorb.

A better question is:

> If the model becomes twice as capable next year, does my product become less necessary - or more useful?

For a thin AI app generator, the answer may be less necessary.

For a runtime that gives capable models a secure place to execute, it may be more useful. For a distribution network flooded with AI-generated content, it may be more useful. For an identity, permission, or transaction layer that has to govern increasingly capable agents, it may be much more useful.

That is the shift I did not fully appreciate when agentbox was active.

The interesting scarcity is moving away from intelligence.

It is moving toward the world intelligence needs in order to act.

---

## References

- OpenAI, [**GPT-6 Astra model documentation**](https://developers.openai.com/api/docs/models/gpt-6-astra).
- OpenAI, [**Model guidance: Using GPT-6 Astra**](https://developers.openai.com/api/docs/guides/latest-model).
- TechCrunch, [**Lovable says it has hit $500M in annualized revenue, with 1 million new projects a week**](https://techcrunch.com/2026/06/09/lovable-says-it-has-hit-500m-in-annualized-revenue-with-1-million-new-projects-a-week/), June 9, 2026.
- Replit, [**Replit is now available in Claude**](https://replit.com/blog/replit-claude), June 17, 2026.
- Replit, [**Now You Can Build with Replit in ChatGPT**](https://replit.com/blog/replit-in-chatgpt), updated January 22, 2026.
- Aippy / PR Newswire, [**Aippy Raises Tens of Millions of Dollars at a $250 Million Valuation to Build the Future of AI-Native Interactive Entertainment**](https://www.prnewswire.com/apac/news-releases/aippy-raises-tens-of-millions-of-dollars-at-a-250-million-valuation-to-build-the-future-of-ai-native-interactive-entertainment-302787864.html), June 2, 2026.
- agentbox archive, [**What's in the box?**](./whats-in-the-box.md).
- agentbox archive, [**Most of an autonomous agent is missing.**](./most-of-an-agent-is-missing.md).
