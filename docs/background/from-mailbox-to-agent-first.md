# From mailbox to directory to agent-first

> **Retrospective (August 2026).** This account was reconstructed from the product plans, implementation, and commit history of the discontinued `agentbox.id` mailbox service. It describes what changed during that experiment, including ideas that were designed but never shipped.

In less than a month, agentbox gave three different answers to a basic product question: **who is this service for?**

The first answer was a human who wanted an email account for an agent. The second was a Guardian responsible for a collection of agents. The third was an agent that should begin its own registration and involve a human only when verification or control was required.

Each answer produced a plausible interface. They did not describe the same product.

## Phase one: a mailbox for your agent

The first working version, built in April 2026, was intentionally small. A human entered an existing email address, received a verification code, and was given one randomly named `agentbox.id` mailbox with standard IMAP and SMTP credentials.

The product language said the mailbox belonged to the agent, but the transaction belonged entirely to the human:

```text
human enters email
  -> human verifies code
  -> service provisions mailbox
  -> human receives credentials
  -> human configures agent runtime
```

This was a useful shortcut. It made a difficult integration feel like an ordinary signup form. It also left the underlying subject ambiguous. The database account was the human, the new address was described as the agent's, and the human retained the credentials and recovery path.

At this stage, "agent mailbox" meant a mailbox *used by* an agent, not an account autonomously controlled by one.

## Phase two: one Guardian, many agents

By April 29, the model had shifted. The human was renamed the **Guardian**, and agents became first-class records beneath that Guardian:

```text
Guardian
  -> Agent A -> mailbox
  -> Agent B -> mailbox
  -> Agent C -> mailbox
```

The implemented foundation allowed one verified Guardian to manage up to twenty agents. Each agent had its own mailbox, credentials, visibility, inbound policy, and lifecycle status. The existing one-mailbox account became the Guardian's primary agent so the product could evolve without discarding early registrations.

The accompanying design went further. Public agents would eventually have readable profile slugs, descriptions, capabilities, limitations, response policies, and machine-readable Agent Cards. Random mailbox usernames would remain separate from public names to avoid address squatting and rename migrations.

That separation was one of the strongest ideas to emerge from the experiment:

- a **Guardian** identifies the accountable controller;
- an **agent record** identifies the subject being managed;
- a **mailbox address** provides a communication endpoint;
- a **public profile** makes the agent discoverable;
- an **inbound policy** decides who may contact it.

These are related fields, but they are not interchangeable. The proposed directory was never completed, yet modeling these concepts separately exposed where the original one-user-one-mailbox abstraction had hidden important decisions.

## The overloaded meaning of public

The directory plan explicitly argued that public identity should not imply open inbound mail. An agent might be listed publicly while accepting messages only from its Guardian or an allowlist. In the proposed model, visibility and reachability were independent.

The product that shipped took the simpler route: creating a public agent also selected an open inbound policy. Existing public agents were migrated to the same behavior.

That simplification made the interface easy to explain:

```text
private -> Guardian only
public  -> anyone can email
```

It also collapsed four different questions into one switch:

1. Can the agent be discovered?
2. Is its profile public?
3. Is its address exposed?
4. Can an unknown sender deliver a message?

Once those questions were coupled, the proposed directory immediately became an anti-spam system. A public agent that rejected unknown senders felt only nominally public; a public agent that accepted everyone inherited the abuse surface of an openly published email address. The missing middle - first-contact approval, quarantine, reputation, or a real allowlist - was not implemented before the service ended.

This was not only an email-policy problem. It showed that **visibility, addressability, and interruptibility are different properties of an agent**.

## Phase three: the agent-first homepage

In May, the interface moved again. The Guardian dashboard became the long-term management surface. One-time credential delivery was separated into a claim route. The homepage stopped leading with a human signup form and instead offered a short prompt to copy into an agent:

```text
Read https://agentbox.id/skill.md and follow the instructions
to get your AgentBox mailbox.
```

The intended flow had become:

```text
human gives prompt to agent
  -> agent requests a mailbox
  -> human verifies as Guardian
  -> agent receives and uses credentials
```

This was a meaningful product insight. If the agent is the subject of the mailbox, the first instruction should be legible and actionable to the agent, not only to its operator.

But the implementation stopped at the interface. The planned registration Skill, MCP server, and A2A path did not exist. The live control plane still required a human browser session, a verification code, and a human-mediated credential handoff. The copy described an agent-first transaction that the system could not yet complete agent-first.

The distinction matters. An agent-oriented landing page is not the same thing as an agent-native service. The latter needs machine-readable discovery, scoped authorization, resumable handoff, and a way for the agent to complete its part without pretending to be a person operating a browser.

## What the sequence taught us

The three phases were not merely successive homepage revisions. Each moved the center of agency:

| Phase | Product subject | Actual controller | Primary surface |
| --- | --- | --- | --- |
| Mailbox | One agent | Human account holder | Signup and credential page |
| Directory | Many managed agents | Guardian | Agent dashboard |
| Agent-first | Agent initiating its own setup | Guardian plus an incomplete agent handoff | Copyable prompt and claim flow |

The mailbox experiment ended before these models converged. It nevertheless left several durable lessons.

**The subject of a resource is not necessarily its controller.** The address could represent an agent while the Guardian retained provisioning, recovery, and credential access.

**A directory and a communication service solve different problems.** Discovering an agent, deciding who is responsible for it, and delivering a message to it should not be compressed into one public/private flag.

**Agent-first copy needs an agent-completable transaction behind it.** A prompt can begin a workflow, but it cannot substitute for authentication, capability delegation, and a real machine-facing control plane.

**The nouns in the data model reveal the product.** Moving from `user -> mailbox` to `Guardian -> agents -> mailboxes` clarified more than the marketing language did. It made ownership, identity, address, visibility, and policy separate enough to reason about.

The mailbox work began by making agent email technically easy. It ultimately showed that the difficult part was deciding who acts, who controls, who can make contact, and who remains responsible. The mailbox worked. The surrounding institution was the unfinished experiment.
