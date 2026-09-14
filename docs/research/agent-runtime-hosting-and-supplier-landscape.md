# Agent Runtime, Hosting, and Supplier Landscape

> **Working research note v0.2 (updated September 14, 2026; first published September 4, 2026).** This is a point-in-time technical survey for the continuing agentbox exploration, informed by the earlier aClaw experiment. It maps options for a future runtime proof of concept; it is not a product announcement, procurement recommendation, or committed roadmap.

The earlier aClaw experiment offered each user an independent OpenClaw or Hermes agent in an isolated container. That architecture was useful because it made the agent concrete: one user, one process environment, one filesystem, one place to work.

It also coupled too many layers together.

In 2026, a stronger way to frame the problem is to separate the system into replaceable parts:

```text
Model
  -> Agent harness
  -> Durable identity and state
  -> Private computer or sandbox
  -> Hosting substrate
```

Each layer is changing at a different speed. Models improve quickly. Harnesses compete on orchestration and memory. Sandbox providers compete on isolation, persistence, wake time, and operational controls. A durable product should not confuse any one of those suppliers with the agent itself.

## What changed in v0.2

OpenAI's new Agents API changes the center of this comparison. The earlier version treated the OpenAI Agents SDK as a thin harness that agentbox would have to operate. The Agents API now offers a managed Codex harness, durable sessions, context compaction, recovery, subagents, skills, MCP, and a choice between OpenAI-hosted and self-hosted execution environments.

That removes a meaningful amount of orchestration work, but it does not make the rest of the product disappear. agentbox would still need to decide what owns agent identity, durable memory, permissions, schedules, environment lifecycle, usage policy, and the user relationship.

This revision also adds a deliberately different product form: a Google Cloud Platform VM running Hermes Agent. Instead of consuming a managed harness, this approach assembles a persistent Linux computer and a relatively complete agent runtime into a self-operated agent appliance. Comparing the two makes the architectural choice more concrete.

## The architectural shift

A useful working formula is:

```text
agentbox
  = persistent agent identity
  + replaceable model intelligence
  + replaceable agent harness
  + durable memory and history
  + an on-demand private computer
```

GPT-6 Astra is a plausible intelligence layer for an experiment because it combines stronger reasoning with software engineering, computer use, browsing, tool orchestration, and long-running workflows. But the model is still not the durable agent.

The durable unit should survive model, harness, and computer replacement. It would own or reference at least:

- an `agent_id` and owner;
- profile and instructions;
- permissions and policy;
- credential references, never raw credentials in model context;
- memory and conversation history;
- tasks, schedules, and pending events;
- model and harness configuration;
- current execution-environment reference;
- usage, limits, and billing state.

The practical principle is simple:

> Identity, memory, permissions, history, and lifecycle belong to the product. Models, harnesses, and computers are replaceable implementations.

## Agent and state layers

### OpenAI Agents API

The Agents API is the most direct new baseline if GPT-6 Astra is the primary model. It divides the system into four concepts: a reusable agent configuration, an execution environment, a durable session, and the events and items produced while the agent works.

The significant addition is the managed Codex harness. OpenAI operates the model-and-tool loop, context compaction, recovery, steering, skills, MCP connections, and subagent orchestration. A session can continue across turns and can outlive the computer attached to it. The application can use an OpenAI-hosted sandbox or connect the same session to a self-hosted environment through the Codex executor.

This is close to the separation agentbox needs:

```text
agentbox identity and policy
  -> OpenAI agent and durable session
  -> execution environment
       -> OpenAI-hosted sandbox
       -> agentbox-managed computer
```

It is not, however, a complete persistent-agent product. The application still owns the mapping between its user-facing `agent_id`, the OpenAI session, and the current environment. It also remains responsible for schedules and external events, product-level permissions, environment provisioning, backups, usage policy, billing, and recovery when a self-hosted executor disappears.

There are also material constraints to test rather than hide in an integration layer. The API is in public beta. Data residency is currently limited to the United States, zero data retention is not supported even with a self-hosted sandbox, and tracing cannot yet be exported through a customer-facing API. OpenAI-hosted sandboxes are working environments, not permanent computers: files can persist during the sandbox lifetime and selected outputs can survive expiry, but an inactive sandbox may be deleted after an hour.

The Agents API therefore reduces harness work while making the product boundary more important. agentbox should own a provider-neutral agent record and treat OpenAI agent and session identifiers as attached execution references, not as the canonical identity.

### OpenAI Agents SDK

The Agents SDK remains useful when full control over the loop matters more than managed orchestration. It provides tools, handoffs, guardrails, tracing, and model context without requiring the Agents API's managed session model.

That makes it a valuable control case and an exit path, but no longer the obvious first implementation. Choosing it means agentbox must build or adopt the durable session, compaction, recovery, scheduling, and multi-agent machinery that the Agents API now supplies.

### Letta

Letta starts closer to the persistent-agent side of the problem. Its agent state is stored and reconstructable, its memory blocks persist across interactions, and its current platform includes schedules, skills, long-lived message history, and a choice between managed and self-hosted deployment.

That makes Letta interesting in two roles:

1. as the agent harness and memory system together;
2. as a reference implementation for how agent identity and memory might be modeled.

The open question is ownership. If Letta becomes the canonical store for identity, memory, scheduling, and behavior, replacing it later becomes a data-model migration rather than a harness swap. A proof of concept should therefore test whether agentbox can keep a small canonical identity record while treating Letta state as an attached implementation.

### Cloudflare Agents

Cloudflare Agents combines durable identity, embedded SQL state, real-time connections, scheduling, and recoverable workflows with adjacent browser and sandbox primitives. Its long-running-agent model is particularly relevant: an agent can wake, work, checkpoint, sleep, and later resume while its durable state and schedules remain intact.

This closely matches the idea of persistent identity paired with compute that scales down when idle. It could produce a compact implementation with few separately operated services.

The tradeoff is architectural concentration. Durable Objects, embedded storage, scheduling, workflows, browser execution, and deployment all reinforce one platform. That may be an excellent operational choice, but it should be made consciously because portability would require extracting several layers at once.

## Enterprise reference stacks

### Microsoft Agent Framework

Microsoft Agent Framework is useful as a completeness benchmark. It covers agents, tools, MCP, memory and persistence, workflows, checkpoints, human approval, background execution, and hosting, while providing migration paths from AutoGen and Semantic Kernel.

For a small exploratory product, adopting the whole framework would likely bring more surface area than needed. Its value here is showing which concerns emerge once agent execution becomes an operated system rather than a demonstration.

### Amazon Bedrock AgentCore

AgentCore divides the problem into modular services: Runtime, Memory, Gateway, Identity, Browser, Code Interpreter, and Observability. AWS explicitly separates its optional harness from the serverless runtime and supports third-party frameworks and models.

That separation is architecturally healthy and makes AgentCore another useful completeness benchmark. It may also be a future enterprise backend. For an early proof of concept, however, the operational and commercial commitment to AWS would need to earn its place against narrower suppliers.

## Computers and hosting

The most consequential distinction in this category is not “container versus VM.” It is the persistence contract:

- What survives idle suspension?
- What survives a host failure or environment destruction?
- Are memory and running processes preserved, or only files?
- Can the environment be snapshotted, cloned, archived, and migrated?

### Blaxel

Blaxel Sandboxes are VM-based environments designed for agent workloads. They advertise rapid resume, automatic scale-to-zero, filesystem and process restoration from standby, controlled networking, secrets, exposed ports, and API or MCP access.

There is an important qualification: standby state is not the same as guaranteed long-term storage. Blaxel's documentation recommends volumes for data that must survive sandbox destruction. A proof of concept should test both wake behavior and the recovery path when only the volume remains.

Blaxel is attractive when low wake latency and an agent-specific control plane matter more than infrastructure generality.

### Daytona

Daytona offers container sandboxes, Linux and Windows VMs, and GPU environments with dedicated kernel, filesystem, network, compute, and disk boundaries. Its persistence semantics are unusually explicit:

- stopped containers preserve their filesystem;
- paused VMs preserve memory, running processes, and filesystem state;
- snapshots, forks, volumes, and archives cover different durability and duplication needs.

This makes Daytona a strong candidate for testing both ordinary sandbox tasks and the stronger promise of a resumable personal computer. The proof of concept still needs to measure wake latency, regional availability, failure recovery, and cost under realistic idle patterns.

### Fly Sprites

Fly describes Sprites as hardware-isolated Linux computers for agents. They use Firecracker isolation, retain a persistent filesystem, sleep when idle, wake quickly, and support checkpoint and restore.

Sprites are conceptually close to “give an AI a computer that stays alive.” They deserve evaluation if that becomes the product language, especially for workloads that expose services or accumulate a working environment over time. As with any newer platform surface, operational limits and migration paths need direct testing rather than inference from positioning.

### E2B

E2B provides secure sandboxes with create, execute, pause, resume, and destroy lifecycle operations. Pausing preserves filesystem, memory, and process state, and snapshots support repeatable environments and checkpoints. Network connections do not survive a pause.

E2B remains a strong benchmark for coding, browser, and task-scoped execution. Its center of gravity is still the sandbox session rather than the permanent identity of a personal computer, so agentbox would need to provide that identity and continuity above it.

### Modal

Modal Sandboxes are a good fit for high-volume, on-demand execution, parallel workers, batch jobs, and GPU workloads. Sandboxes are intentionally time-bounded; longer-lived work relies on filesystem or memory snapshots and later restoration.

That makes Modal more compelling as an elastic worker pool than as the default home for one persistent agent. It belongs in the architecture when a durable agent needs to fan out temporary work, not necessarily when it needs one private computer of record.

### Google Cloud Platform VMs + Hermes Agent

A Google Compute Engine VM running Hermes Agent is not merely another sandbox supplier. It is a different product shape: a conventional private Linux computer combined with a relatively complete, self-hosted agent runtime.

```text
Google Compute Engine VM
  -> Linux, persistent disk, network, IAM
  -> Hermes Agent
       -> model provider
       -> memory, skills, tools, schedules, channels
```

Google Cloud supplies familiar infrastructure primitives. A stopped VM can be started again with its persistent disks intact. Suspending a supported VM additionally preserves memory, but suspension has limits: it is not available for every machine type or accelerator configuration, and a VM cannot remain suspended indefinitely. Durable data should therefore live on persistent storage and have an independent backup path rather than depend on process memory.

Hermes supplies much of what would otherwise sit in the harness and application layers: a model-agnostic agent loop, persistent memory, skills, tools and MCP integrations, scheduled tasks, subagents, and gateways to messaging channels. It can run directly on a VPS and can also delegate terminal work to local, Docker, SSH, Daytona, Modal, and other backends.

Together, they form a useful **thick agent appliance** baseline. The strengths are legibility and control. Files and processes have ordinary Linux semantics; the model provider can be changed; debugging is direct; private services can stay on a stable network; and the product is not tied to a managed harness session.

The operational burden is equally concrete. agentbox would need to provision and harden the VM, patch the operating system and Hermes, manage secrets, monitor health, back up and restore state, implement wake and shutdown policy, and decide whether isolation is one VM per agent, per user, or per trust boundary. An always-running VM is simple but expensive at scale; an aggressively stopped VM is cheaper but needs an external control plane capable of waking it before Hermes can receive work.

Hermes memory and configuration should also be treated as an attached implementation until export and recovery have been tested. Installing a persistent agent on a persistent VM does not, by itself, separate the agent's identity from that machine.

## Product forms, not just suppliers

The supplier list becomes easier to reason about when the components are grouped into product forms:

| Product form | What the bundle owns | What agentbox still owns | Main tradeoff |
| --- | --- | --- | --- |
| Agents API + OpenAI-hosted sandbox | Managed harness, session, model loop, temporary computer | Product identity, policy, external events, durable product state | Fastest path, but the strongest OpenAI dependency and no permanent computer |
| Agents API + self-hosted environment | Managed harness and session; agentbox-selected computer | Product identity plus computer provisioning, recovery, and storage | Managed orchestration with infrastructure choice, but split operational responsibility |
| GCP VM + Hermes Agent | Private computer plus self-hosted harness, tools, memory, and channels | Fleet control, identity boundary, security, backups, upgrades, billing | Maximum legibility and control, but the largest operating surface |
| Letta + replaceable sandbox | Persistent-agent and memory layer plus selected execution | Product identity boundary and provider lifecycle | Strong state model, with migration risk if Letta becomes canonical |
| Cloudflare Agents | Durable runtime, state, schedules, connections, and adjacent execution | Product semantics and export strategy | Compact operating model, with several layers concentrated on one platform |

These are not interchangeable hosting plans. They place product responsibility at different layers. A useful proof of concept should compare the amount of product behavior each form supplies, the amount agentbox must operate, and how much state can be moved out later.

## Working shortlist

| Layer | First candidates | Alternatives or benchmarks |
| --- | --- | --- |
| Primary model | GPT-6 Astra | Claude, Gemini, future models |
| Managed agent harness | OpenAI Agents API | Letta |
| Self-hosted agent harness | Hermes Agent | OpenAI Agents SDK |
| Persistent memory and state | agentbox-owned schema, Letta | Cloudflare embedded state |
| Durable runtime | Cloudflare Agents | self-operated control plane |
| Agent computer | GCP Compute Engine, Blaxel, Daytona | Fly Sprites |
| Task-scoped execution | E2B | Modal |
| Enterprise reference | AWS AgentCore | Microsoft Agent Framework |

This table is not a ranking. It identifies a small set worth testing and a wider set useful for comparison.

## Four proof-of-concept architectures

### A. Open and replaceable

```text
agentbox identity, policy, lifecycle, and billing
  -> OpenAI Agents API + GPT-6 Astra
  -> self-hosted environment adapter
       -> GCP Compute Engine
       -> Blaxel or Daytona
```

agentbox keeps the canonical agent record, maps it to an OpenAI agent and session, and exposes a narrow environment interface: create, connect, wake, execute, checkpoint, stop, destroy, attach storage, and inspect usage.

This is the preferred starting point because it tests the central thesis directly while avoiding the need to build the entire harness. Can the same agent identity and session move between two computers without changing what the user believes the agent is?

The cost is a divided control plane. OpenAI owns the harness and session; agentbox owns the computer lifecycle and must reconcile both systems. Scheduling, external event delivery, durable product state, and migrations also remain product responsibilities.

### B. Persistent agent and memory

```text
agentbox account and product layer
  -> Letta persistent agent and memory
  -> GPT-6 Astra or another model
  -> replaceable computer provider
```

This option tests whether a mature stateful-agent layer removes enough complexity to justify the dependency. A useful metaphor is identity and memory as the durable mind, with a replaceable model and computer as reasoning engine and body.

The critical experiment is exportability: whether memory, history, schedules, and behavioral state can be reconstructed outside Letta without semantic loss.

### C. Cloudflare-native

```text
Cloudflare Agent identity + SQLite state
  -> schedules and durable workflows
  -> browser, sandbox, or container execution
  -> GPT-6 Astra
```

This is likely the smallest operated system. Durable identity, state, connections, schedules, and recoverable work live in one runtime that naturally sleeps between events.

It should be evaluated as a coherent platform choice, not as a set of easily replaceable components. The proof of concept should include an explicit export and recovery exercise to quantify lock-in rather than discussing it abstractly.

### D. Full agent appliance

```text
agentbox control plane
  -> one GCP VM per agent, account, or trust boundary
       -> Hermes Agent
            -> selected model provider
            -> memory, skills, schedules, tools, and channels
```

This option tests the most concrete expression of “give an AI a private computer.” The VM is the durable home and Hermes is the resident agent runtime. It is easy to inspect and does not require a separate managed harness, making it a useful control against more abstract platforms.

The experiment should not stop when the agent answers a message. It must include automated provisioning, secure bootstrap, stop and start behavior, health checks, upgrades, backup and restore, model switching, and reconstruction of the same agent on a fresh VM. That last exercise determines whether the agent is genuinely portable or merely a carefully maintained server.

## Evaluation criteria

The first round should test behavior, not feature-list parity.

### Identity and agent state

- Can an agent keep the same identity while its model changes?
- Can it move to a new harness or computer without losing memory or pending work?
- Are history, memory, schedules, and task state exportable?
- Can a managed session be reconstructed outside its original API?
- Can context be compacted without silently changing durable state?
- Can tools, MCP servers, and credentials be granted and revoked independently?
- Are human approval, cancellation, retry, and audit trails first-class?

### Computer lifecycle

- What survives stop, suspend, pause, provider failure, and destruction?
- How long do cold start and warm resume take at realistic percentiles?
- Are filesystem, process memory, network identity, and running services preserved?
- Can environments be snapshotted, cloned, archived, and restored?
- Are outbound network policy, static egress, secrets, browser access, ports, and GPU workloads supported?
- Does durable storage have an independent backup and recovery path?
- Can the same environment be attached to another harness without rebuilding it?

### Operations and commercial fit

- What is the true cost of active, idle, stored, and resumed environments?
- Which quotas, time limits, regions, and concurrency caps apply?
- Are logs, traces, resource usage, and failure reasons observable?
- What availability commitments and support channels exist?
- Can the architecture be migrated or self-hosted if the supplier changes direction?
- Who patches the runtime and operating system, and how are failed upgrades rolled back?

Pricing should be measured with a workload model, not copied into this note. Price sheets, limits, and product boundaries change faster than the underlying architectural questions.

## Product implication

The old aClaw proposition was close to:

> Rent an OpenClaw or Hermes agent.

That language binds the product to an implementation. A more durable proposition would be one of these:

> Deploy a persistent AI agent.

or:

> Give an AI a private computer that can wake up and continue its work.

The second is more concrete, but the computer alone is still insufficient. The product value is the continuity across computers:

```text
identity
+ memory
+ permissions
+ history
+ lifecycle
+ execution
```

That is the layer agentbox should understand before it decides whether there is another product to build.

The two newly compared forms expose the choice clearly. OpenAI Agents API lets agentbox start with a thin product layer above a managed harness. GCP plus Hermes starts with a thick, inspectable agent appliance under an agentbox control plane. Neither answer is universally better. The former optimizes for speed and managed orchestration; the latter optimizes for ownership, portability of model access, and conventional systems control.

The strategically useful boundary sits above both:

```text
agentbox identity, policy, lifecycle, and user relationship
  -> managed agent session
     or
  -> self-hosted agent appliance
```

## Working conclusion

The next agentbox runtime, if there is one, should be modular from the beginning.

Models should be replaceable. Agent harnesses should be replaceable. Computers and hosting suppliers should be replaceable. Durable identity, permissions, history, lifecycle, and the user relationship should remain under the product's control.

The first supplier set worth hands-on evaluation is deliberately small:

1. OpenAI Agents API for a managed GPT-6 Astra harness and durable session;
2. GCP Compute Engine plus Hermes Agent for a self-hosted agent appliance;
3. Letta for persistent agent state and memory;
4. Blaxel and Daytona for private, resumable computers;
5. Cloudflare Agents for a tightly integrated durable-runtime alternative.

The OpenAI Agents SDK remains the lower-level control case when agentbox needs to own the loop. AWS AgentCore and Microsoft Agent Framework provide enterprise reference points. E2B and Modal remain useful for task-scoped execution. Fly Sprites is worth adding when the experiment specifically tests the promise of a persistent personal Linux computer.

The central thesis is unchanged by any supplier choice:

> An agent is not a model, a process, or a container. It is the persistent identity and state that can continue across all three.

## Sources and freshness

Capabilities in this note were checked against official documentation on September 14, 2026. They should be rechecked before an implementation or purchasing decision.

- [OpenAI: GPT-6 Astra model guide](https://developers.openai.com/api/docs/guides/latest-model)
- [OpenAI: GPT-6 Astra model reference](https://developers.openai.com/api/docs/models/gpt-6-astra)
- [OpenAI: Agents API overview](https://developers.openai.com/api/docs/guides/agents-api/overview)
- [OpenAI: Agents API architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture)
- [OpenAI: Agents API sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions)
- [OpenAI: OpenAI-hosted environments](https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted)
- [OpenAI: self-hosted environments](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted)
- [OpenAI: environment lifecycle](https://developers.openai.com/api/docs/guides/agents-api/environments/lifecycle)
- [OpenAI: Agents API security](https://developers.openai.com/api/docs/guides/agents-api/environments/security)
- [OpenAI: Agents API observability](https://developers.openai.com/api/docs/guides/agents-api/observability)
- [Letta documentation](https://docs.letta.com/)
- [Letta Agents API](https://docs.letta.com/api/resources/agents)
- [Cloudflare Agents](https://developers.cloudflare.com/agents/)
- [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/)
- [Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- [Blaxel Sandboxes](https://docs.blaxel.ai/Sandboxes/Overview)
- [Blaxel Volumes](https://docs.blaxel.ai/Sandboxes/Volumes)
- [Daytona persistence](https://www.daytona.io/docs/en/persistence/)
- [Fly Sprites](https://fly.io/sprites/)
- [E2B sandbox persistence](https://docs.e2b.dev/sandbox/persistence)
- [Modal Sandboxes](https://modal.com/docs/guide/sandboxes)
- [Google Cloud: stop and start a Compute Engine instance](https://docs.cloud.google.com/compute/docs/instances/stop-start-instance)
- [Google Cloud: suspend and resume a Compute Engine instance](https://docs.cloud.google.com/compute/docs/instances/suspend-resume-instance)
- [Google Cloud: Persistent Disk](https://docs.cloud.google.com/compute/docs/disks/persistent-disks)
- [Hermes Agent documentation](https://hermes-agent.nousresearch.com/docs/)
- [NousResearch: Hermes Agent](https://github.com/NousResearch/hermes-agent)
