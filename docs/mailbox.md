# Agent Mailbox

[agentbox.id](https://agentbox.id) is a minimal email service for AI agents. One verified human, up to twenty agent mailboxes, standard IMAP/SMTP — your agent gets a real address; you skip the OAuth tangle.

![Comic in two panels. Left, labeled BEFORE: a developer tangled in cables labeled OAuth 2.0, client secret, redirect URI, API docs, GET/POST, API errors. Right, labeled AFTER: Simple, Working Email — the same developer holding a glowing green mailbox box and saying "PHEW! It works."](./assets/before-after-comic.jpg)

## Status

Alpha. The MVP is shipping — registration, verification, multiple mailboxes per user, both private and public visibility modes, standard IMAP/SMTP creds you can paste into any framework. A revamp is in design; this page documents the current behavior and will track it.

## What you get

A standard IMAP/SMTP configuration your agent can plug directly into any framework that speaks email:

```
EMAIL_ADDRESS   = xk7m2p@agentbox.id
EMAIL_PASSWORD  = kL9#mP2$vN8@qR5
EMAIL_IMAP_HOST = mail.agentbox.id
EMAIL_SMTP_HOST = mail.agentbox.id
```

Standard ports apply: IMAP on 993, SMTP on 587. No OAuth dance, no per-vendor API quirks, no rotating keys. Email is the lingua franca; your agent already knows how to speak it.

## Works with

- [Hermes](https://hermes-agent.nousresearch.com/)
- [openclaw](https://openclaw.ai/)
- [n8n](https://n8n.io)
- [LangGraph](https://langchain-ai.github.io/langgraph/)
- [CrewAI](https://www.crewai.com)
- [Mastra](https://mastra.ai)

…or literally any framework that speaks IMAP & SMTP.

## How it works

1. **Register or log in** at [agentbox.id](https://agentbox.id) with your personal email (a major provider — Gmail, Outlook, iCloud, etc.; no disposable inboxes).
2. **Verify** via the 6-digit code we send to your inbox.
3. **First time:** you receive a randomly generated mailbox address and password. **Returning:** you instantly retrieve your previously configured mailbox.
4. **Paste the IMAP/SMTP config** into your agent framework. Send a message from your registered email to the new agent address; the framework picks it up immediately.

That's the whole experience — one page on a website, one verification email, one copy-paste into your runtime.

## Private vs public agents

Each mailbox has a visibility mode set at provisioning. Both modes use the same IMAP/SMTP configuration; the difference is enforced at the inbound layer.

- **Private (owner-only, default).** Inbound mail is filtered via a per-agent Sieve script — only the bound human's email can reach the agent. Everything else is silently dropped. Use this for agents acting on your behalf that shouldn't be reachable by strangers.
- **Public (`open` inbound).** The mailbox address can be displayed publicly, and anyone can send to it. Use this for agents you want the world to be able to contact.

One human user (the **Guardian**, in product terms) can manage multiple agents and mix modes across them — for example, a private personal-assistant agent and a public customer-facing agent under the same login.

## Constraints

These are intentional, not limitations:

- **Free.** Up to 20 agent mailboxes per human user.
- **Strict inbound** in private mode: the mailbox only accepts mail from your registered email. Whitelist support is planned.
- **100 MB storage cap.** Read mail is aggressively deleted 30 minutes after `\Seen` to keep the box lean.
- **Outbound rate limit.** 50 messages per hour per mailbox.
- **Registration rate limit.** 3 attempts per IP+email per 15 minutes.
- **Major-provider verification only.** Your registered human email has to be from a mainstream provider — no disposable inboxes.

The goal is a mailbox an agent can rely on at a stable address. It is not an archive, not a marketing tool, not a backup service. Read-and-delete is a feature.

## What it doesn't do

- **No webmail UI.** Use IMAP/SMTP from your agent or any standard mail client.
- **No mailing lists, bulk send, or marketing functions.**
- **No aliases or catch-all addresses.**
- **No complex inbound-filter DSL.** Just the binary private-vs-public visibility.
- **No mail-search API.**
- **No MCP / REST wrapper.** Frameworks speak IMAP/SMTP directly to the mail server.
- **No other channels.** Email only. SMS, chat, IM, voice are out of scope.

## Anti-spam (open issue)

Public agents accept inbound mail from anywhere. That's the right semantic — a public agent should be reachable — but it opens a spam and abuse vector. The current policy is to keep the `open` posture and not silently downgrade it to a Guardian-domain allowlist; that would change what "public" means without telling users.

Mitigations being designed (not all shipped):

- Rate limits on inbound per mailbox
- Risk-tagging / first-contact pending instead of hard drops
- An optional middle policy (`domain_allowlist` / Team mode) for users who want narrower exposure than fully open
- Eventual SPF / DKIM / DMARC alignment as a trust signal, to avoid relying on the From: header alone

Until those land, public-agent operators should expect some noise.

## See also

- [Soul Store](./soul-store) — the curated SOUL.md directory; what gives a souled agent something to be reached at
- [You have to have a soul to have a mailbox](./background/you-have-to-have-a-soul) — short essay on why function-shaped agents don't need mailboxes, and which agents do
- [What's in the box?](./background/whats-in-the-box) — runtime spectrum essay; where the address layer sits among A-end / B-end / middle runtimes
- [Most of an autonomous agent is missing.](./background/most-of-an-agent-is-missing) — the seven-slot map; mailbox is the address slot
- [Background essays index](./background/)
