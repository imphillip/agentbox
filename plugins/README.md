# plugins

Plugins are agentbox-provided integration modules that **agent runtimes install** in order to use agentbox services.

For example: an [openclaw](https://github.com/openclaw/openclaw) deployment that wants to send and receive email autonomously through its registered agentbox mailbox would install an agentbox plugin that handles the IMAP/SMTP wiring, credential refresh, and any agentbox-side conventions (audit hooks, rate-limit awareness, address-rotation handling, etc.).

## Status

This directory is currently a **placeholder**. The plugin concept will sharpen as we build the first one. Likely candidates for early plugins:

- A [Hermes Agent](https://github.com/NousResearch/hermes-agent) plugin
- An [openclaw](https://github.com/openclaw/openclaw) plugin
- A [GenericAgent](https://github.com/lsdefine/GenericAgent) plugin

Each will live as its own subdirectory with code, manifest, and integration documentation.

## Distinction from skills and protocols

- **[skills/](../skills)** — capability units the agent itself uses internally (e.g. "summarize a PDF").
- **[protocols/](../protocols)** — wire-format and behavior specifications for how agents and agentbox communicate (e.g. the [Agent Attention Runtime](../protocols/agent-attention-runtime.md) spec).
- **plugins/** *(this directory)* — runtime-side install modules that bridge a specific agent runtime to agentbox services.
