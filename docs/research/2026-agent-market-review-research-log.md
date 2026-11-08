# 2026 Agent Market Review: Working Research Log

> **Working research note v0.1 (November 9, 2026).** An initial evidence file for a year-end review. The year is still in progress. Sources were checked on November 9; product access, prices, and policies may change before the final article.

The starting observation is that OpenClaw made a persistent personal agent tangible early in 2026. By autumn, Anthropic, OpenAI, Google, and Meta were presenting their own answers, alongside products such as Instinct. An assistant that stays around, has somewhere to work, and contacts its owner when necessary is becoming a recurring product proposition.

That is a useful starting hypothesis. Establishing how widely these products are used, whether they earn lasting trust, and whether they improve work requires more evidence.

This log starts with six reference products: OpenClaw, Claude Duet, OpenAI dots, Gemini Spark, Meta Muse, and Instinct. It is a deliberately bounded first collection, rather than a census of the worldwide agent market. Coding agents, enterprise workflow products, and the Chinese agent ecosystem need their own coverage before a broad annual review can be considered complete.

## Evidence rules

The first collection uses official announcements, documentation, and policies. These establish what suppliers describe and offer. They do not independently establish reliability, adoption, or commercial success. No comparative hands-on testing has been performed for this note.

For subsequent additions, keep these fields together:

- **Event date and publication date:** an announcement, a beta, a regional expansion, and general availability are different events. A policy revision is not a launch date.
- **Last checked:** when the source was read, including the product name and destination after any redirect.
- **Access conditions:** plan, region, age, platform, waitlist, and workspace-admin requirements.
- **Claim and evidence:** identify whether a capability is vendor-described, independently reported, or observed in a reproducible test. Keep unknowns explicit.
- **Changes:** append material changes and retain the earlier dated record. Record conflicting sources rather than resolving them by assumption.

Short summaries and links are the source ledger. The repository history preserves revisions to this log; it is not an archive of the vendors' web pages.

## A first timeline

| Date | Recorded event | What this establishes |
| --- | --- | --- |
| November 2025 | The [OpenClaw introduction][oc-intro] dates its predecessor Clawd to this month. | The project's origin predates 2026. January is an attention and naming milestone, not its creation date. |
| January 29, 2026 | The same post announces the OpenClaw name and reports more than 100,000 GitHub stars. | A dated, self-reported indicator of early attention; stars are not active users or revenue. |
| May 19 | Google [introduces Gemini Spark][spark-intro], starting with trusted testers and a planned U.S. Ultra beta. | Platform entry was already visible in the first half of the year. |
| June 30 | Google's [release notes][gemini-releases] record Spark in the macOS app for eligible Ultra subscribers. | A dated desktop rollout, distinct from the May announcement. |
| July 30 | Google [announces Chrome integration and broader Pro access][spark-july]. | Expansion continued through summer; the Chrome capability initially had its own U.S. restriction. |
| August 26 | Instinct's [privacy policy][instinct-privacy] and [terms][instinct-terms] carry this revision date. | A dated policy record. The exact public launch date is still unverified in this collection. |
| September 8 | Meta [introduces Muse][muse-intro], describing a U.S. rollout. | A consumer product announcement with a dedicated cloud computer. The newsroom page also shows a September 30 update. |
| September 29 | OpenAI's [DevDay record][dots-devday] introduces dots with gradual rollout. OpenClaw separately [announces Enterprise][oc-enterprise] for internal pilots ahead of 1.0. | Managed products and open infrastructure were both developing through autumn. |
| October 21 and 23 | Anthropic [introduces Duet][duet-intro] and publishes its [safety design][duet-safety]. | A waitlisted research preview, followed by a more detailed architecture account. |
| November 5 | OpenClaw [announces Multiplayer][oc-multiplayer]. | OpenClaw's story continues into shared work; it should not appear only in the January chapter. |
| By November 9 | Google's [current task documentation][gemini-tasks] explicitly says Spark was renamed Task. | A confirmed naming change, with existing tasks and schedules retained. Its exact change date remains to be established. |

The working chronology is therefore more gradual than “open source in the first half, big companies in the second.” A better draft is: **an early open-source breakthrough in visibility, platform launches and expansion from spring onward, and a concentrated autumn wave of persistent-agent products.** This is a chronology of public evidence, not proof that one launch caused another.

## Six product records

### OpenClaw: a reference for operating your own agent

The [official project site][oc-home] presents an open-source assistant running on infrastructure the user chooses, reached through existing messaging apps. Its significance to this review is the ability to assemble an agent around one's own environment and model choices.

The autumn story also matters. The September [Enterprise announcement][oc-enterprise] describes a control plane with replaceable harness, model, and sandbox components, initially suitable for internal pilots. November's [Multiplayer post][oc-multiplayer] describes people collaborating with a shared agent and context.

**Collect next:** deployment and upgrade effort, security maintenance, recovery, sustained usage, and evidence that personal installations become dependable shared systems. Separate the core project, Enterprise, and third-party hosting businesses in any adoption count.

### Claude Duet: proactive assistance for working life

Anthropic's [October 21 announcement][duet-intro] describes background work on a virtual machine with its own browser, an ongoing conversation, and attention to connected accounts. Access starts as a waitlisted research preview for U.S. Pro, Max, and Ultra subscribers.

The [October 23 safety account][duet-safety] describes credential separation, approval mechanisms, and a classifier for outgoing sensitive information. These are documented design claims, not results from our own security testing.

**Collect next:** access beyond the initial preview, useful versus unnecessary notifications, approval frequency, and how well work survives interruptions. Check the actual enforcement of permission boundaries separately from the quality of the model's judgment.

### OpenAI dots: ongoing responsibility across tools and tasks

The [official overview][dots-overview] describes a dot with its own cloud computer and browser, continuity across conversations, and delegation to Work or Codex. An optional connected personal computer is a separate resource with its own availability requirements. Messaging access does not automatically grant access to apps or local files.

The [September 29 record][dots-devday] establishes the announcement. Current documentation describes gradual access depending on plan, region, and workspace settings; the [November 2–6 update][dots-november] separately records enterprise-family enablement and a November 18 billing milestone. These should remain distinct dated events.

**Collect next:** the cost of delegated work as well as the conversation, context shared across channels, administrative controls, and whether persistent responsibility reduces repeated briefing. Avoid using the existence of an account-level rollout as evidence that every eligible person already has access.

### Gemini Spark, now Task: the agent becoming part of the assistant

The [May announcement][spark-intro] describes cloud execution, Workspace integration, recurring work, and approvals for consequential actions. June's [release notes][gemini-releases] and the [July update][spark-july] establish later desktop and browser developments.

For the current name, Google's [task help page][gemini-tasks] is explicit: Spark was renamed Task, and users retain their tasks and schedules. The old Spark product URL also redirected to the broader Gemini overview when checked. Preserve “Spark” for the historical record and follow “Task” or “Tasks in Gemini” in subsequent research. Establish the rename date before placing it precisely on the timeline.

**Collect next:** current access by tier and region, which work runs remotely versus on the user's device, and how migration affects workflows. Earlier rollout announcements should not be reused as a complete November availability matrix.

### Meta Muse: a personal agent with a dedicated environment

The [September announcement][muse-intro] describes a dedicated cloud VM and browser, background work, and contact through the Muse app or WhatsApp. It describes U.S. availability and a combination of free use and subscriptions, without establishing comparative economics.

Meta's [launch security account][muse-security] describes the agent inside an isolated runtime cell and Sentinel outside it, controlling connector actions and network egress. The relevant architectural distinction is where authority is enforced. The account explicitly describes the system at launch; it is not a guarantee that failures cannot occur.

**Collect next:** changes since launch, real permission flows, recovery and export, and useful work completed over time. Keep the personal-agent product Muse separate from model names such as Muse Spark and from Google's Gemini Spark.

### Instinct: an assistant reached through ordinary communication

The [official homepage][instinct-home] emphasizes text and calls, with phone and computer use behind familiar everyday errands. This makes it useful as a reference for a simple interaction model. It does not establish the size of the company, its operating costs, or its market share.

Its [privacy policy][instinct-privacy] deserves a separate record: it describes model-training uses of information and an opt-out with exceptions, while excluding directly received Google Workspace data from model training. A minimal interface can still involve substantial data access. The [terms][instinct-terms] identify the operator as Spear Street Technology doing business as Instinct; neither document's revision date proves launch timing.

**Collect next:** launch and access history, pricing, how permissions and spending approvals work in practice, the execution environment, and the extent of any human operational assistance. These are open questions, not allegations about how the service operates.

## What the final comparison should measure

A checklist of features would miss much of the change. The comparison needs to follow a responsibility through time, including the moments when the agent waits, fails, or asks for help.

| Dimension | Evidence to collect |
| --- | --- |
| Continuity | What survives a closed app, device shutdown, restart, expired login, and model or runtime replacement? |
| Initiative and attention | Does it act only on request, on a schedule, on an event, or by deciding to follow up? How many interruptions are useful? |
| Computer and applications | Whose machine is used? Which desktop, browser, mobile, and API workflows work? Can a person take over? |
| Authority and identity | Which accounts represent the agent? Who grants permission, enforces it, records an action, and revokes access? |
| Memory and exit | Can users inspect, correct, export, or move accumulated context, files, tasks, and permissions? |
| Completed work and cost | Record outcome quality, elapsed time, model and environment charges, retries, and human review or recovery time. |
| Adoption and business | Seek dated active-use, retention, paid-use, and revenue evidence with clear definitions. Label supplier-reported numbers. |

“Always on” needs a definition for each product. A persistent identity, an available cloud computer, a running process, and scheduled or event-driven wake-ups describe different properties. Likewise, a cloud agent's ability to work without a laptop does not imply that its optional local-computer tasks can do so.

## Questions to carry into the year-end article

**Is the market moving toward an enduring relationship?** Look for accumulated context, responsibilities that last across sessions, and a usable way to correct the agent. A name and avatar alone would not establish this.

**Does a computer become part of the product?** Compare application compatibility and human handoffs alongside compute capacity. The relevant environment may be a cloud VM, a connected laptop, or dedicated physical hardware; each has different continuity and operational costs.

**Does governance become a reason to choose a product?** Study permission enforcement, credential custody, recoverability, and visibility into actions. Compare evidence of failure and recovery as carefully as successful demonstrations.

**Where can an independent business still contribute?** Managed platforms may absorb setup work. They may also leave needs around software compatibility, customer-controlled environments, migration, collaboration, and support. Test those possibilities against actual customer demand rather than treating every new agent launch as validation of agentbox's own ideas.

Our earlier [computer essay](../background/agents-deserve-their-own-computers.md), [business-model comparison](../background/a-computer-for-your-agent-five-ways-to-build-the-business.md), and [runtime landscape](./agent-runtime-hosting-and-supplier-landscape.md) supply adjacent research. They cover a different layer from a complete personal-agent product. Their supplier details retain their own review dates.

## Collection backlog and article outline

Before the year-end draft, the highest-value additions are:

1. Recheck the six products near the editorial cutoff, preserving launch claims alongside current names, access, pricing, and limits. Resolve Instinct's launch date and Gemini's rename date.
2. Run a small, comparable set of ordinary workflows where access permits: a recurring brief, a project with a changed deadline, and a browser task requiring human approval. Record setup, outcomes, interventions, and recovery. Publish the protocol and account conditions with any results.
3. Collect independent longitudinal accounts and reproducible incident analyses. Separate first-hand observations, vendor testimonials, and second-hand reports; a dramatic success or failure is not a representative rate.
4. Seek commercial evidence with denominators and periods: active users versus sign-ups, paid retention versus initial trials, and total cost versus a subsidized subscription. Record missing figures as missing.
5. Broaden coverage beyond this initial personal-agent group, including Chinese products, coding and enterprise agents, open harnesses, and environment providers. State the final review's selection criteria and geographic limits.

A provisional article structure is: **the early OpenClaw moment; the spring-to-autumn platform wave; competing forms of persistent assistance; computers and permission boundaries; evidence of useful work and commercial demand; the position of independent providers; and questions still open for 2027.** The emphasis can change as evidence arrives.

## Primary source register

All sources below were checked on **November 9, 2026**. Dates identify publication or revision where available, not necessarily first customer access.

- **OpenClaw:** [project site][oc-home]; [introduction, January 29][oc-intro]; [Enterprise announcement, September 29][oc-enterprise]; [Multiplayer, November 5][oc-multiplayer].
- **Anthropic:** [Duet introduction, October 21][duet-intro]; [safety, privacy, and security, October 23][duet-safety].
- **OpenAI:** [DevDay, September 29][dots-devday]; [current dots overview and access][dots-overview]; [November 2–6 changes][dots-november]. These are official OpenAI documentation records.
- **Google:** [Gemini announcement, May 19][spark-intro]; [dated Gemini release notes][gemini-releases]; [Spark expansion, July 30][spark-july]; [current task documentation, including the rename FAQ][gemini-tasks]. The current help page is undated; do not infer the rename date from its retrieval date.
- **Meta:** [Muse announcement, September 8; page also updated September 30][muse-intro]; [launch security design, September 8][muse-security].
- **Instinct:** [product page][instinct-home]; [privacy policy][instinct-privacy] and [terms][instinct-terms], both revised August 26. Public launch timing, full access conditions, and comparative performance remain unverified here.

## Revision log

- **November 9, 2026 — v0.1:** Established the six-product source collection, separated announcement and rollout milestones, recorded Spark's confirmed rename with an unresolved date, and defined evidence needed for the year-end review.

[oc-home]: https://openclaw.ai/
[oc-intro]: https://openclaw.ai/blog/introducing-openclaw
[oc-enterprise]: https://openclaw.ai/blog/openclaw-enterprise
[oc-multiplayer]: https://openclaw.ai/blog/shattering-silos-with-openclaw-multiplayer
[duet-intro]: https://claude.com/resources/articles/claude-duet
[duet-safety]: https://claude.com/resources/articles/claude-duet-safety-privacy-and-security
[dots-overview]: https://learn.chatgpt.com/docs/dots
[dots-devday]: https://learn.chatgpt.com/docs/whats-new/devday-2026
[dots-november]: https://learn.chatgpt.com/docs/whats-new/november-2-6-2026
[spark-intro]: https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/
[gemini-releases]: https://gemini.google/release-notes/
[spark-july]: https://blog.google/innovation-and-ai/products/gemini-app/gemini-spark-updates-july-2026/
[gemini-tasks]: https://support.google.com/gemini/answer/17094507
[muse-intro]: https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/
[muse-security]: https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse
[instinct-home]: https://instinct.com/
[instinct-privacy]: https://instinct.com/privacy-policy
[instinct-terms]: https://instinct.com/terms
