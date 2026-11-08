# A Computer for Your Agent: Five Ways to Build the Business

> **Essay (November 9, 2026).** Five commercial approaches to giving agents somewhere to work, from managed setup and collaboration to device control and customer-owned hardware.

In [*Agents Deserve Their Own Computers*](./agents-deserve-their-own-computers.md), I argued for a persistent working environment: applications, files, signed-in sessions, and a place a person can enter when the agent needs help.

The next question is commercial. What, exactly, would someone pay for?

Recent services offer several answers. One sells a configured software environment. Another organizes people and agents around shared work. Others supply rented machines, expose real devices through an API, or keep a computer the customer already owns online. These choices assign costs and responsibilities to different parties.

The observations below come from public product pages and documentation; they are not results from comparative hands-on testing. Prices are snapshots from November 9 and cover different bundles.

## Five things a customer can buy

The common need is easy to describe. A person wants an agent to work somewhere other than their everyday laptop, using existing software, with enough continuity to return later. The businesses differ in how much they take on.

| Approach | Example | What the customer pays the provider to handle |
| --- | --- | --- |
| Managed software setup | xcode.sg | Software access, machine setup, and a configured network environment |
| Collaboration around computers | Agent.Space | Shared work, agent sessions, human participation, and access to connected computers |
| Rental supply and fulfillment | myusmini | Finding, delivering, and maintaining an available computer |
| Device control through an API | Glasshand | A dedicated device and an interface an existing agent can operate |
| Colocation | NetworkFlows | Space, power, connectivity, custody, and agreed physical assistance for the customer's Mac |

These approaches can overlap. The table describes the part of each offer that makes it useful to this inquiry.

## Start with the setup people struggle to assemble

[xcode.sg](https://xcode.sg/) packages Claude Team seats with setup on dedicated Mac minis in Singapore and commercial office connectivity. Its advertised Premium seat costs ¥1,500 per month, with the machine priced separately. The provider handles account allocation and configuration; the customer connects remotely to use the environment.

The commercial proposition is practical: someone else assembles the prerequisites and helps keep them usable. The site emphasizes software access and continuity of environment. Its [terms](https://xcode.sg/terms) also acknowledge that third-party service restrictions can interrupt that access.

For agentbox, this suggests that setup and support can have value before a new agent platform exists. The business depends on keeping the whole bundle useful, including the upstream software relationship. Its economics therefore involve more than the cost of a machine.

## Make the computer a place people can share work

[Agent.Space](https://agent.space/workspace) puts collaboration around the environment. People and different agents can work on shared project files, inspect conversations, and hand work onward. It supports cloud computers, connected personal computers, and separately rented Macs.

The [Dedicated Mac](https://agent.space/mac) offer currently advertises an M4 Mac mini with 16 GB of memory and 256 GB of storage at an early price of $160 per month. Model access is separate from the machine rental. The significance is how the computer joins the workspace: the person can reach its desktop while agent work is managed through the same broader product.

Its [environment handbook](https://agent.space/learn/cloud-workspace) usefully distinguishes remote screen control, invoking an agent installed on a computer, and viewing a read-only mirror of local conversations. It also distinguishes saved files from surviving processes: a restart can interrupt programs even when files remain. The cloud environment sleeps when idle, and a workspace's cloud-versus-local placement currently cannot simply be switched after creation.

The [collaboration handbook](https://agent.space/learn/work-together) makes another useful distinction. Shared files do not automatically give each conversation the same context, and simultaneous edits are not reliably merged. Handoffs still need goals, decisions, file references, and a next step.

That is a substantial product problem. A computer can hold the work while a coordination layer helps people understand who is doing what, what needs attention, and how someone else can continue.

## Organize the supply of computers

[myusmini](https://myusmini.com/) approaches the physical supply. Alongside its own rentals, it recruits hosts whose machines can enter its inventory. Under the [official host program](https://myusmini.com/join), the host supplies hardware, power, connectivity, and on-site intervention. The platform handles sales, payment, automated delivery, and settlement, charging $30 per rented machine per month.

It also operates a separate [listing marketplace](https://myusmini.com/market). There, hosts set their offers and arrange rental directly with customers; the platform says it does not handle their rent or guarantee fulfillment. That distinction matters: a listing service and a unified rental service carry different obligations.

My interpretation is that the host program tests whether distributed small operators can supply a consistent service. Adding capacity can involve recruiting another host instead of buying every machine centrally. The hard work moves toward standards, incident handling, utilization, and dependable delivery across locations.

## Give an existing agent eyes and hands

[Glasshand](https://glasshand.com/) makes the interface smaller. It supplies dedicated physical iPhones and Macs that an external agent can control. Its published [monthly prices](https://glasshand.com/pricing/) are $60 for an iPhone and $90 for a Mac, before applicable taxes. Setup persists across tasks until the rental ends.

Its [agent documentation](https://glasshand.com/agents.md) describes authorization, rental management, screenshots, and keyboard or pointer input. A person approves agent access and separately completes payment. When the person takes control through the browser, the agent receives a signal to pause. The device interface exposes screen capture and input rather than a native shell or filesystem API.

This separates the agent's execution from the device it operates. An agent can remain in its existing environment and use a remote phone or Mac when the task calls for it. A phone adds another surface for native applications and workflows that a desktop browser alone cannot cover.

The interface resembles an infrastructure primitive, but the rental remains a persistent monthly physical device. A concise API tells us little about the amount of work required underneath. Glasshand's [terms](https://glasshand.com/terms/) say it uses Solid and other infrastructure providers to supply and operate devices. Hardware operations can be delegated while the customer-facing product concentrates on authorization and control.

## Keep a computer the customer owns online

With NetworkFlows, the starting point is ownership. A customer ships an existing Mac mini or commissions a US purchase and deployment. The Mac belongs to the customer, who manages the operating system, applications, accounts, and data. Hosting supplies the physical conditions for remote use.

The current [offer](https://networkflows.com/en/service) is based in California. [Pricing starts at $59 per month](https://networkflows.com/en/pricing) for hosting, with hardware, procurement, intake, and optional services quoted separately. Network addressing, bandwidth, support hours, and extra physical work need agreement. The base offer does not include a residential IP, dedicated public IPv4, remote KVM, or an uptime SLA by default.

This is a deliberately limited service boundary. A customer can retain an existing remote-access setup, or arrange UU Remote setup for handover. Other software and agent configuration remain with the customer. The operator provides custody and agreed physical assistance, and the customer can arrange return of the machine.

That makes the model lighter in one particular sense: the provider need not fund every customer's computer or maintain their chosen agent stack. The customer takes on hardware cost and software administration. Whether that trade is attractive depends on duration, configuration, support needs, and the value of retaining the machine.

Colocation offers a way to test one part of the agentbox idea with a narrow service scope. A customer can change models or agent software while keeping their computer. Moving or retrieving it remains a physical process, and continuity across that move still needs preparation.

NetworkFlows' [preparation guide](https://networkflows.com/en/prepare) asks customers to test remote access after sign-out, sleep, and restart, and to maintain their own backups and recovery path. Those details are central to making colocation useful for agents. A successful remote login on delivery day is only the beginning of a useful long-term environment.

## What gets lighter, and for whom?

It is tempting to arrange these services from heavy to light. Three different questions are hidden in that description.

**How much must the customer assemble?** A managed bundle reduces setup. An API can make device access easy for an existing agent. Colocation leaves more software work with the owner.

**Who pays for the hardware?** Rental transfers the initial purchase to a supplier. A host network distributes that investment. Colocation places it with the customer. The cost still exists; its owner changes.

**Who must solve an incident?** A provider can offer the application, control interface, physical machine, or only agreed on-site assistance. A small interface can sit above substantial operations. A narrow hosting service can be simple to describe while requiring careful custody and reliable physical work.

These choices determine what a monthly price means. Comparing $59 hosting, $90 device access, and a $160 Mac connected to a collaboration product by their headline prices would hide hardware ownership, software charges, support, and recovery responsibilities.

They also show that a business around agent computers can choose a specific layer. The layer needs to remove enough work from the customer to justify its price, and its boundaries need to hold when something breaks.

## The test is what survives an interruption

Public offers give us evidence that providers are testing these product shapes. They give us less evidence about retention, margins, or how much completed work the environments enable. Availability counters and utilization claims are supplier statements, and I would not treat them as proof that a category has settled.

For the agentbox inquiry, I would start with an ordinary task that spans several days. Let the agent make progress, wait for a person, accept a manual intervention, and continue. Then restart the environment and see what can be recovered.

The useful measurements are concrete: how much setup was required, how often a person intervened, whether the agent found the correct next step, and how much time recovery consumed. The bill includes software, models, hardware or rent, and the customer's attention. Keeping a machine powered on is one contribution to that result.

There is room here for different businesses. Some customers will want a complete service. Others will bring their own agent, computer, or operating knowledge. The work takes place in an internet where people and agents still use the same applications, and where a human often needs to enter halfway through.

The question I want to keep testing is whether we can give that work a dependable place to stay, with a clear account of who owns it, who can enter it, and who helps when it stops.

---

## Sources and scope

Product descriptions and prices were reviewed on November 9, 2026. Links above point to the providers' own pages and documentation. The examples illustrate commercial approaches rather than an exhaustive market survey. This essay follows [*Agents Deserve Their Own Computers*](./agents-deserve-their-own-computers.md).
