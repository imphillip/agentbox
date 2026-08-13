# agentbox

An open archive of writing and design work from the `agentbox.id` experiment.

## Project status

The experimental `agentbox.id` mailbox service has been shut down. The Soul Store, which began as a related experiment, has been separated from agentbox and is no longer documented here as an agentbox product.

This repository now preserves the useful public record of that work: the questions that motivated it, the product and infrastructure ideas it tested, and the specifications and agent-facing artifacts that came out of it. It is not an active service, ecosystem, or product roadmap.

Some archived documents retain the language and assumptions of the period in which they were written. Pages that describe a once-live product are marked as historical material.

## Contents

- [`docs/background/`](./docs/background) - essays and retrospectives about agent identity, addressability, infrastructure, autonomy, and responsibility.
- [`docs/mailbox.md`](./docs/mailbox.md) - a retrospective record of the mailbox experiment and its design boundaries.
- [`protocols/`](./protocols) - design specifications produced during the experiment, including the unimplemented Agent Attention Runtime draft.
- [`skills/`](./skills) - archived agent-facing artifacts. These are retained for provenance and should not be treated as currently supported agentbox services.
- [`docs/soul-store.md`](./docs/soul-store.md) - a short record of the Soul Store's former relationship to agentbox and its subsequent separation.

The rendered documentation site uses [VitePress](https://vitepress.dev/):

```bash
npm install
npm run docs:dev
```

Build the static site with:

```bash
npm run docs:build
```

## Reading this archive

The strongest claims in these documents are hypotheses from a specific period of agent development, not maintained market surveys or standards. References to products, timelines, and the state of the ecosystem should be read in their dated context.

The archive preserves those arguments because the questions remain useful even where the original product answer did not:

- What does it mean for an agent to have a durable identity?
- How should an agent remain reachable across runtimes and sessions?
- Which decisions can be delegated, and where does human responsibility remain?
- What infrastructure is actually missing beneath claims of autonomy?
- What has to change before an agent-first interface becomes an agent-completable transaction?

## Repository boundaries

- The closed-source `agentbox.id` application is not published here.
- The mailbox service is no longer available.
- The Soul Store is now independent of this repository.
- The Agent Attention Runtime document is a draft, not an implementation or adopted standard.
- No new agentbox plugins or product integrations are promised.

## License

Unless a file states otherwise, the contents are licensed under the [Apache License 2.0](./LICENSE).

Historical product names and links are retained where they are necessary to understand the record; their presence does not imply that a service is still operating.
