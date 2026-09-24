# A Computer for the Agent, a Boundary Around Its Power

> **Essay (September 2026).** Meta's Muse is a new product attempt at the persistent personal agent. Its dedicated cloud computer and separate security authority bring two longstanding agentbox questions into a consumer product.

When we built aClaw, the proposition was easy to picture: give each person an agent in an isolated cloud environment. The agent could keep files, run tools, and return to work later. In [*What's in the box?*](./whats-in-the-box.md), I argued that the persistent version of this environment might matter more than any particular agent implementation.

That was a hypothesis drawn from an experiment. On September 8, Meta introduced [Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/), a personal agent that comes with its own dedicated cloud VM. It can use a browser and terminal, connect to a person's services, remember context, and continue tasks after the app is closed. Meta also built a separate agent called Sentinel to decide whether Muse may take actions outside its computer.

Muse is a concrete market test of problems agentbox has been exploring. It is especially interesting because it treats a private computer and a permission boundary as part of the everyday product.

## A place to continue working

Most AI interactions still have the shape of a request and a response. Persistent agents need a different place to live. They may have a file to update next week, a website to check tomorrow, or a task waiting for a human decision.

Meta says each Muse user has a dedicated Linux VM with a browser, storage, CPU, memory, and room to run tools, subagents, and scheduled work. The VM is the system of record for the user's Muse data. Files, memory, and connected-service credentials are kept there, with sensitive services separated from the agent's working area. Muse can produce documents and other artifacts, and it can work in the background while the user is away. Meta describes the implementation in its [security architecture](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse) and [product design account](https://introducing.muse.ai/).

For agentbox, the important change is where the computer appears in the product. A private cloud machine used to sound like a deployment choice for developers. Muse presents it as the ordinary home of a personal agent. The user messages Muse or gives it a goal; the computer is already there.

That choice makes the agent more than a chat window. It gives work a place to accumulate. It also creates a difficult obligation: once an agent's computer holds a person's documents, memory, browser sessions, and connections to other services, operating that computer safely becomes part of the product promise.

## The agent does not hold the keys

The most consequential part of Muse's design may be Sentinel. Meta describes two isolated security domains inside each VM. Muse's main harness, workspace, and executable tools run in a restricted cell. Credential storage, built-in connector workers, and Sentinel run outside that cell. The main agent cannot obtain real service tokens simply by reading its files or changing its own instructions. [Meta's technical explanation](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse) describes this separation in detail.

When Muse wants to use a connected service or send traffic to the internet, Sentinel evaluates the proposed action. It can allow it, deny it, or ask the user. The approval request goes directly to the client as a structured control, and the response goes back to Sentinel. The permission can be limited to a particular destination, action, task, or period. Real credentials are supplied only at the authorized boundary.

```text
User sets permissions
        |
Muse proposes an action
        |
Sentinel checks policy and scope
        +-> allow
        +-> deny
        `-> ask the user through a separate approval control
```

Calling Sentinel another agent understates the design. An additional model can help classify a request, but the safety claim depends on the main agent being unable to bypass the system that enforces the decision. Meta also uses process isolation, restricted network paths, credential brokers, and browser controls. The practical lesson is that permission needs an owner outside the agent that wants to act.

This connects to an older agentbox question. We discussed agents as actors with identities and capabilities, under the authority of a human or organization. Muse offers one concrete consumer implementation of that relationship: the agent can propose and work, while a separate authority controls what leaves its environment and when the person must consent.

## What the complete product includes

Muse also makes the persistent agent legible to a person. According to Meta's [design account](https://introducing.muse.ai/), the interface has a main conversation, side chats, goals, an activity log, editable memory files, and visible permissions. The agent can send a useful update without waiting for a prompt. These are product decisions around long-running work: people need to see what an agent is doing, what it is waiting for, and what they have authorized.

This is where Muse differs from the product forms in our [runtime research note](../research/agent-runtime-hosting-and-supplier-landscape.md). `GCP VM + Hermes Agent` could provide a private computer and a capable resident harness, but the operator would still have to build and maintain the permission authority, credential boundary, recovery path, and user controls. A managed agent API can supply much of the harness while leaving similar questions at the product boundary. Muse has chosen to operate the whole stack as one consumer service.

That completeness is useful evidence for agentbox. It shows what a user might reasonably expect when the product promises a personal agent, rather than an agent development environment. It does not tell us that every future agent should be tied to one provider's computer and model.

## What remains open

Meta calls the user's VM the system of record. That is a clear operational choice, but it leaves the portability question alive: if the computer, harness, or provider changes, what exactly constitutes the same agent? Its name and chat history? Its memory and files? Its permissions, scheduled work, and relationships with other services?

Agentbox's working answer has been that identity and continuity should survive a change of model or computer. Muse demonstrates the value of giving an agent a durable home. Whether its complete state can be moved to another home is a different test. Meta says users can inspect and download files, including memory, but that alone does not establish a full migration path for an active agent.

Security claims also need precise limits. Meta says its current architecture isolates users' VMs, but Meta can access data when necessary to operate, support, or secure the service. A proposed Confidential VM is intended to change that and had not launched when this essay was written. Meta also says sanitized interaction trajectories may be used for model training by default, with an opt-out. These are meaningful choices for someone deciding how much of their digital life to connect. [Meta explains the current policy and planned mode here](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse).

The boundary must extend to every way a user reaches the agent. In September, security researcher Patrick Wardle [demonstrated a local flaw in the Muse Mac client](https://github.com/pwardle/not-a-mused) that could let software already running on the user's machine redirect dictation traffic and potentially abuse the access granted to Muse. Meta's David Singleton [said the company issued a hotfix](https://x.com/dps/status/2102248329111634067). The case is a reminder that a carefully protected cloud VM still depends on its client and authorization flow.

## The next agentbox question

Muse gives the agentbox inquiry a useful update. A major consumer product is now trying the persistent private computer, background work, personal memory, and explicit permission control together. The market is testing whether people want an agent that has somewhere to live and can do work on their behalf.

The strongest idea to carry forward is the separation between **the agent that tries to help** and **the authority that decides what it may do**. A more capable model makes that boundary more valuable. A dedicated computer gives the agent room to work; a separate permission system gives its owner a way to remain in control.

For agentbox, the next research question is concrete: can we give an agent a durable identity, a replaceable computer, and enforceable permissions that follow it when the underlying harness or host changes? Muse gives us a serious example to learn from, and a sharper standard against which to test that answer.

---

## References

- Meta, [Introducing Muse: The World's First Personal AI Agent Built for Everyone](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/), September 8, 2026.
- Meta AI Research, [How We Built Safety Into Muse](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse), September 8, 2026.
- Meta, [How We Designed Muse](https://introducing.muse.ai/), September 2026.
- Patrick Wardle, [not-a-mused: local Muse Mac client proof of concept](https://github.com/pwardle/not-a-mused), September 2026.
- David Singleton, [Meta's response to the Muse Mac client disclosure](https://x.com/dps/status/2102248329111634067), September 22, 2026.
