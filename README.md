# agentbox

An open collection of essays, design notes, and experiments about infrastructure for AI agents.

## Project status

agentbox remains an ongoing exploration. Its current public form is this repository and the documentation site: a place for essays, design work, and new attempts rather than a running hosted product.

The earlier `agentbox.id` mailbox service has been shut down. The Soul Store, which began as a related experiment, has been separated from agentbox and is no longer documented here as an agentbox product. Their records remain because the questions they exposed continue to shape the project.

Some documents retain the language and assumptions of the period in which they were written. Pages that describe the former mailbox product are marked as historical material; newer essays reflect the exploration as it continues.

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

## Reading this project

The strongest claims in these documents are hypotheses from a specific period of agent development, not maintained market surveys or standards. References to products, timelines, and the state of the ecosystem should be read in their dated context.

The project keeps those arguments because the questions remain useful even where the original product answer did not:

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
