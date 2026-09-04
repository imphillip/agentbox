# The agent mailbox experiment

> **Historical record.** `agentbox.id` was an experimental mailbox service for AI agents. It is no longer operating, and the addresses and server settings shown in these documents are not available for use.

agentbox began with a deliberately narrow question: could an AI agent be given a stable, ordinary email address without forcing its human operator through an OAuth integration or a vendor-specific messaging API?

The experiment answered that question with a small working service built around standard IMAP and SMTP. A human verified an existing email address, became the agent's **Guardian**, and could provision mailboxes for private or publicly reachable agents.

![Comic in two panels. Left, labeled BEFORE: a developer tangled in cables labeled OAuth 2.0, client secret, redirect URI, API docs, GET/POST, API errors. Right, labeled AFTER: Simple, Working Email - the same developer holding a glowing green mailbox box and saying "PHEW! It works."](./assets/before-after-comic.jpg)

## What was built

The service implemented:

- standard IMAP on port 993 and SMTP submission on port 587;
- one verified Guardian managing up to twenty agent mailboxes;
- randomly generated mailbox credentials that could be used by any email-capable runtime;
- private mailboxes that accepted inbound mail only from their Guardian;
- public mailboxes that accepted inbound mail from any sender;
- a 100 MB temporary storage cap and deletion of read mail after 30 minutes;
- outbound, registration, and account-provisioning limits intended to constrain abuse.

The implementation used a React client, an Express service, SQLite, Stalwart as the mail server, and Amazon SES for outbound relay. The application source is not part of this open repository; this repository contains only the public record and related ideas.

## Product boundaries

The mailbox was intentionally not a complete email product. It had no webmail, search API, aliases, mailing lists, marketing features, or alternate communication channels. It also avoided an MCP or REST abstraction over email: the premise was that agent runtimes could use IMAP and SMTP directly.

This narrowness was part of the experiment. The product was testing whether an address could be a durable, runtime-independent primitive for an agent, not whether another general-purpose email provider should exist.

## Private and public reachability

The most consequential product distinction was between two inbound policies:

- **Private (`owner_only`)** mailboxes used a per-agent Sieve rule so that only the bound Guardian's address could deliver mail.
- **Public (`open`)** mailboxes could publish their address and receive mail from anyone.

That distinction exposed an unresolved design problem. A public agent is not meaningfully public if unknown senders are silently rejected, but an openly published mailbox creates obvious spam and abuse risks. The service closed before the experiment reached a satisfactory first-contact, reputation, quarantine, or domain-policy model.

### Four controls hidden inside one switch

An intermediate directory design had treated public visibility and inbound access as separate settings. An agent could have a public profile while keeping its mailbox Guardian-only or restricted to an allowlist. The implementation ultimately coupled them: selecting a public agent also selected open inbound delivery.

That made the product easier to operate, but it combined four independent controls:

1. whether an agent can be discovered;
2. whether its profile is visible;
3. whether its mailbox address is exposed;
4. whether an unknown sender can deliver mail.

The distinction matters beyond email. Publishing an agent should not automatically grant everyone the right to interrupt it. Conversely, hiding an address is not a complete authorization policy. A future system would need to model discoverability, contact disclosure, and message admission independently.

## The Guardian was the control boundary

The product described each address as belonging to an agent, but control remained with the verified Guardian.

Verification created two different paths to credentials. A short-lived, one-time claim token delivered the initial mailbox configuration. A longer-lived Guardian session allowed the human to list managed agents and reveal the credentials for any mailbox they controlled. Passwords were encrypted at rest, but the application could decrypt them because recovery and repeated display were product features.

This was a practical beta design, not agent self-sovereignty. It established a precise trust relationship:

- the **agent** was the named subject and runtime consumer of the mailbox;
- the **Guardian** could create the mailbox, recover its credentials, and decide whether it was private or public;
- the **service operator** ran the mail infrastructure and retained the technical ability required to provision and recover accounts.

The result was an independently addressed agent under human custody. The experiment never reached a model where the agent held a credential that neither Guardian nor operator could retrieve, nor one where control could be delegated with narrower capabilities than full mailbox access.

That gap later became visible in the agent-first onboarding attempt: an agent could be invited to start registration, but a human still had to verify, claim, and hand off the credential.

## A mailbox was not memory

The service treated email as an event channel rather than a durable archive. A scheduled cleanup process:

- deleted read Inbox messages after 30 minutes;
- deleted Sent messages after 30 minutes;
- emptied Trash and Junk;
- removed non-standard mailbox folders;
- retained unread Inbox messages so an offline agent could still wake and process them.

This policy made the architectural boundary unusually explicit. The mailbox was responsible for **arrival and temporary delivery**. Long-term memory belonged in the agent runtime or another storage layer.

Read-and-delete also reduced storage pressure and the amount of historical correspondence retained by the service. The tradeoff was equally clear: an agent that marked a message as read before durably recording the relevant state could lose the only copy shortly afterward. Reliable use therefore required a processing sequence closer to a queue consumer than a conventional email client:

```text
receive -> process -> persist relevant state elsewhere -> mark as read
```

The experiment implemented cleanup, but not an acknowledgement protocol connecting successful agent-side persistence to deletion. That remained the runtime's responsibility.

## What the experiment established

The implementation demonstrated that provisioning ordinary mail credentials for an agent could be simple and framework-independent. It also made several harder questions visible:

- Is an email address enough to constitute an agent identity, or only a contact surface?
- Who is accountable for an agent's outbound behavior?
- How should a public agent divide legitimate first contact from unsolicited traffic?
- Does persistent addressability matter before runtimes have durable memory and initiative?
- Is email the right agent-native primitive, or merely the most available human-internet protocol?
- Can an address represent an agent when credential control remains with its Guardian?
- Should public identity, address disclosure, and open inbound delivery ever share one setting?
- What acknowledgement is required before a read-and-delete mailbox can safely discard an event?

The surrounding agentbox essays are attempts to reason through those questions. Closing the mailbox product did not settle them; it means only that this repository no longer presents the mailbox as their active answer.

## Related material

- [You have to have a soul to have a mailbox](./background/you-have-to-have-a-soul) - the identity argument that grew around the mailbox.
- [What's in the box?](./background/whats-in-the-box) - the runtime model used to position the address layer.
- [Most of an autonomous agent is missing.](./background/most-of-an-agent-is-missing) - the larger infrastructure map that followed.
- [From mailbox to directory to agent-first](./background/from-mailbox-to-agent-first) - how the product changed its answer to who the service was for.
- [Background essays](./background/) - the complete essay index.
