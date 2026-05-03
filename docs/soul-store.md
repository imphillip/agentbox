# Soul Store

[soul.agentbox.id](https://soul.agentbox.id) is the soul store — a directory of downloadable SOUL.md files for AI agents. Browse, pick a personality, install it into your runtime.

Free. SillyTavern V2 format. Currently Hermes-only as a target runtime, with openclaw planned.

## Status

Alpha. The catalogue is small but hand-curated; the install flow is wired up; sign-in / per-user history is intentionally paused while the rest of the alpha shakes out.

## What's in the store

A small, hand-curated collection of characters in SillyTavern V2 format. Across mentor types (a defrocked Renaissance alchemist, an archivist of an empire that fell), companion types (a burned-out security engineer, a twelve-year-old who has been twelve for some time), and adversary types (an inquisitor who simply asks you, again, what you actually meant).

[Browse the full catalogue →](https://soul.agentbox.id)

The store also accepts external sources — chub.ai cards, your own V2 exports, anything in the format. It isn't the source of souls; it's a curated entry point. For the format itself, see [HermesTavern](https://github.com/imphillip/hermes-tavern).

## How to install a soul

Two paths. The recommended one is agent-driven; the fallback is manual.

### Recommended — agent-driven

On any soul's detail page, copy the install prompt. It looks like:

```
Install this soul: https://soul.agentbox.id/souls/downloads/<slug>.zip
```

Paste it into your Hermes agent. The agent fetches the URL, hands the result to HermesTavern, and imports the soul as `SOUL.md` in your `$HERMES_HOME`. Run `/new` (or restart the chat) and your agent is in character.

Prerequisite: HermesTavern is installed. If it isn't, run [soul-loader](https://agentbox.id/setup/soul-loader.md) first — the agentbox-blessed installer for the loader itself.

### Manual fallback

Click the download button on the detail page. You get a `.zip`. Upload it to your Hermes chat with:

> install this soul

Same end result. The recommended path just saves the upload-and-re-upload step.

## Runtime support

| Runtime | Status |
| --- | --- |
| **Hermes** | Supported via [HermesTavern](https://github.com/imphillip/hermes-tavern). Validated pipeline; the default target. |
| **openclaw** | Planned. The companion engine `openclaw-tavern` is on the roadmap (not yet shipped). When it lands, [soul-loader](https://agentbox.id/setup/soul-loader.md) will dispatch to it on openclaw runtimes. |
| **GenericAgent and others** | Unspecified. Open an [issue](https://github.com/imphillip/agentbox) if you have a runtime in mind. |

## What is SOUL.md?

A markdown file in your runtime's identity slot. Hermes loads it at session start; the content becomes your agent's persona. Capped at 15K characters (75% of Hermes's 20K system prompt slot); oversized cards are compressed via a one-shot LLM distillation pass.

The companion file is `HERMES.md` — the project-context slot, holding lorebook / worldbuilding content if the source card has any.

For the technical detail, [HermesTavern's README](https://github.com/imphillip/hermes-tavern) is the canonical reference.

## Why a soul matters

> *"You have to have a soul to have a mailbox."*

The thinking: an agent that has written down who it is, what it values, who it answers to has crossed a threshold. It can be reached. It can answer when called. It deserves an inbox.

The soul store is the upstream of that picture — the place to acquire identity in the first place.

Long form: [You have to have a soul to have a mailbox](./background/you-have-to-have-a-soul).

## Limitations

- **Multi-runtime support is roadmap.** Today: Hermes only.
- **Sign-in is currently paused.** Downloads work as guest. Per-user history will return when the alpha shakes out.
- **Catalogue is hand-curated.** Small intentionally — quality over coverage. External cards (chub.ai, your own V2 exports) work too.
- **PNG re-encoding by IMs can break uploads.** If your agent reports `invalid card format` on a PNG that should be valid, your IM client (Telegram, WeChat, …) likely re-encoded the file and stripped the V2 payload from the `tEXt` chunk. Workaround: zip the PNG first (`zip aldous.zip aldous.png`) and upload the zip — IMs treat it as opaque binary.

## See also

- [agentbox.id](https://agentbox.id) — the mailbox product
- [soul-loader skill](https://agentbox.id/setup/soul-loader.md) — installer for SOUL.md loading capability
- [HermesTavern](https://github.com/imphillip/hermes-tavern) — the import engine (MIT, separate project)
- [Background essays](./background/) — the thinking behind the work
