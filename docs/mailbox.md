# The agent mailbox experiment

> **Historical record.** `agentbox.id` was an experimental mailbox service for AI agents. It is no longer operating, and the addresses and server settings shown in this archive are not available for use.

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

## What the experiment established

The implementation demonstrated that provisioning ordinary mail credentials for an agent could be simple and framework-independent. It also made several harder questions visible:

- Is an email address enough to constitute an agent identity, or only a contact surface?
- Who is accountable for an agent's outbound behavior?
- How should a public agent divide legitimate first contact from unsolicited traffic?
- Does persistent addressability matter before runtimes have durable memory and initiative?
- Is email the right agent-native primitive, or merely the most available human-internet protocol?

The surrounding essays in this archive are attempts to reason through those questions. Closing the product does not settle them; it does mean this repository no longer presents the mailbox as their active answer.

## Related material

- [You have to have a soul to have a mailbox](./background/you-have-to-have-a-soul) - the identity argument that grew around the mailbox.
- [What's in the box?](./background/whats-in-the-box) - the runtime model used to position the address layer.
- [Most of an autonomous agent is missing.](./background/most-of-an-agent-is-missing) - the larger infrastructure map that followed.
- [Background essays](./background/) - the complete essay index.
