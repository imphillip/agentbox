# Agents Deserve Their Own Computers

> **Essay (October 26, 2026).** The case for giving an agent a persistent computer: existing software, a shared place for human intervention, and work that survives a change of model or session.

At the end of the day, I want to close my laptop while my agent keeps working. If it reaches a step that needs me, I want to open its desktop, make the decision, and let it continue. Tomorrow, the documents, applications, and unfinished work should still be there.

That is a fairly ordinary expectation of a computer. It is also the product shape I keep returning to for agentbox.

An agent deserves its own computer because useful work needs somewhere to accumulate. The software we already use lives there. So do the awkward steps a person still needs to handle. A persistent computer gives both the agent and its human a place to return to.

## An existing business with a new possible customer

A recent prompt for this thought was [xcode.sg](https://xcode.sg/). It packages Claude Team seats with managed setup on dedicated Mac minis in Singapore, using commercial office connections. The machine is rented separately, and customers connect remotely to use the environment. Its offer combines access to software, a machine, networking, and help getting started.

There are also offers aimed more directly at agents. [Agent.Space's Dedicated Mac](https://agent.space/mac) provides a hosted Mac mini with coding agents and remote screen access. At the time of writing, its page advertises an initial batch of 50 machines. That is evidence of a product attempt, with limited public evidence about its eventual scale.

I find these services interesting because the customer is buying a working environment. Installing an agent is only one part of making that environment useful. Applications need to run, accounts need to stay accessible, files need to remain in place, and someone needs to handle maintenance.

For agentbox, the question is whether that environment should become an enduring part of the agent's life.

## Software already has a place to run

Much of the software a person uses assumes a personal computer with a browser, a desktop, local files, and an interactive session. A workflow might involve downloading a document, opening it in an application, changing something in a website, and uploading the result somewhere else.

Parts of that workflow may have excellent APIs. Other parts may require an enterprise agreement, expose only some features, or have no supported programmatic interface. The person doing the work experiences all of them as one task.

A computer gives an agent several ways to approach that task. It can use an API, run a command, manipulate a file, or operate an interface. The useful property is access to the working environment in which these methods meet. A desktop also needs dependable controls through which the agent can inspect and operate its applications.

This helps explain the appeal of a Mac mini or a small PC. It can run the same class of software the person already knows, in a separate environment that remains available when their laptop is asleep. A suitable virtual desktop can serve the same purpose. The important distinction is the experience of a complete computer, including the applications and sessions the work requires.

## Humans need a way into the same room

The internet is currently used by both people and agents. Software interfaces, authentication flows, and business processes reflect that mixed state. An agent may do most of a task and still need a person to select an account, review a document, answer a question, or approve a consequential action.

A shared working environment makes those interruptions easier to understand. If an agent is filling out a supplier form and gets stuck, I can enter its desktop and see the form, the attached document, and the fields already completed. I can resolve the issue where it occurred. The agent can then inspect the updated state and continue.

The direction can reverse. I might start a spreadsheet manually, leave some rows unfinished, and ask the agent to pick up from there. The file and application are already in place. We share the work itself as well as the conversation about it.

This requires a deliberate handoff. Two actors typing into the same window at once would make a terrible product. The environment needs to show who has control, let the person pause the agent, and make the change of control visible to both. Decisions requiring authorization also need an explicit approval path; a click in a remote desktop is not a sufficient policy system.

The benefit is that human intervention can happen inside the ongoing task. We can help without making the agent reconstruct the entire situation in a chat message.

## Continuity is useful before full autonomy

In [*What's in the box?*](./whats-in-the-box.md), I described the persistent middle between a local agent and a disposable cloud sandbox. At the time, I tied its justification to a demanding definition of autonomy: persistent identity, internal drive, event-driven wakeup, independence from a human terminal, and learning across tasks.

I would loosen that condition now. A persistent environment can be useful well before an agent satisfies all five.

An assistant that acts only when asked can still benefit from returning to the same installed tools, files, and authorized sessions. A task waiting two days for a reply needs somewhere to keep its progress. A person who intervenes occasionally benefits from finding the same workspace when they return.

The model's context window cannot carry all of this. A summary can describe a document, but the document still needs to exist. Memory can record that an application was configured, but something has to preserve the configuration. Remembering a login does not restore an expired session.

Nor does a surviving desktop automatically tell a new agent process what to do next. Work also needs a record of what happened, what remains unfinished, and which decisions are waiting for the person. The computer holds the working state; the agent still needs a reliable way to understand it.

Persistence also permits rest. The agent can stop thinking between events while its files and task records survive. A hosted environment can sometimes be suspended and resumed, subject to the applications and connections it uses. The promise is that work can continue when needed, with enough state preserved to do so correctly.

## What makes a computer its own

Here, ownership means a durable assignment of an environment to an agent's work under a person's or organization's authority. That environment has a boundary, a history, and a way to recover from failure.

A dedicated physical machine is one implementation. A persistent VM or managed desktop may provide the same useful properties. One computer might host several agents working for the same owner, while keeping unrelated users separate. The product should choose this boundary according to the work and the isolation it requires.

Network conditions belong in that environment too. Region, connectivity, browser profiles, and device continuity affect whether applications behave consistently. Those conditions need to be operated and explained. A stable device or IP address does not establish permission to use a service, and a useful agent computer should work within the account owner's authorized access.

The owner also needs control over what the agent can reach. Files, browser sessions, and installed applications may carry significant authority. As the [Muse essay](./a-computer-for-the-agent.md) explored, the system enforcing permissions needs to remain outside the agent's ability to rewrite them. A computer gives the agent room to act; its owner needs independent ways to set limits and take control.

Finally, the environment should survive replacement. Hardware will fail. Models and agent software will change. Moving to a new host may require signing in again, and some application state may be impossible to transfer. A credible service needs to make those limits clear and preserve everything it reasonably can: files, configuration, task history, and the record of unfinished work.

## What someone might pay for

The service I can imagine paying for has a concrete promise: my agent has a working computer, and I can get into it whenever I need to.

Fulfilling that promise involves provisioning, remote access, updates, backups, recovery, and support. The work specific to agents includes preserving task progress, exposing activity clearly, and making the handoff between person and agent dependable. Hardware rental supplies part of the foundation.

The economics still need testing. A dedicated Mac may make sense when its applications matter or when sustained use justifies the monthly cost. A Linux desktop, a small PC, or an environment resumed on demand may fit other work. We should measure whether someone completes more useful work with less setup and supervision, including the time spent fixing the environment.

This gives agentbox a concrete direction to explore. The project began with a mailbox: an agent needed an address where the world could reach it. The computer asks a related question. When something arrives, where does the agent go to deal with it?

For some kinds of work, I expect the answer to be a persistent computer. Its agent may change over time. Its human may step in and out. The work has a place to stay.

---

## References

- Xcode, [Claude Team seats and managed Mac environment](https://xcode.sg/) and [service terms](https://xcode.sg/terms), reviewed October 26, 2026.
- Agent.Space, [Dedicated Mac](https://agent.space/mac), reviewed October 26, 2026. Product availability and batch figures are the provider's own statements.
- agentbox, [What's in the box?](./whats-in-the-box.md), May 2026.
- agentbox, [A Computer for the Agent, a Boundary Around Its Power](./a-computer-for-the-agent.md), September 2026.
