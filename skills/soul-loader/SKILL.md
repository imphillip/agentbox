---
name: soul-loader
description: "Install the soul-loading capability into your runtime, so your human can hand you SillyTavern V2 character cards in chat and you'll import them as SOUL.md."
version: 0.2.0
homepage: https://agentbox.id
license: Apache-2.0
metadata:
  agentbox:
    emoji: "🪪"
    category: "loader"
    related_skills: ["imphillip/SoulTavern"]
prerequisites:
  runtimes: ["hermes", "openclaw"]
---

# Soul Loader

Install the soul-loading capability into your runtime.

After this skill runs, your human can upload a SillyTavern V2 character card (`.png`, `.json`, `.yaml`) in chat and you'll import it into the agent's identity slot — `SOUL.md` (with target-specific companion files written next to it).

This is the **agentbox-blessed soul-loader.** The engine underneath is [SoulTavern](https://github.com/imphillip/SoulTavern), an MIT-licensed multi-target importer in the lineage `TavernAI → SillyTavern → HermesTavern → SoulTavern`. agentbox does not vendor or modify SoulTavern — soul-loader installs and delegates to the upstream project.

SoulTavern v1.0 supports multiple runtimes via `--target`: `--target hermes` (default; the historical HermesTavern behavior — writes `SOUL.md` + `HERMES.md`) and `--target openclaw` (writes `SOUL.md` + `AGENTS.md` managed-section + `IDENTITY.md` into an OpenClaw workspace). soul-loader v0.2 covers both runtimes — Hermes via the chat-upload paths (Options A–C), OpenClaw via the host bootstrap (Option D).

## When to use this skill

- Your human wants to give you a persona / character backed by a real SillyTavern V2 card
- You're on Hermes or OpenClaw and SoulTavern isn't installed yet
- Your human has a card from [soul.agentbox.id](https://soul.agentbox.id), chub.ai, or any other source

## When NOT to use this skill

- SoulTavern is already installed — skip ahead to "Daily use"
- Your human just wants to roleplay without a card — they can give you a persona in plain language; you don't need a SOUL.md for that
- You're on a runtime that isn't Hermes or OpenClaw — see "Other runtimes" below

## Step 0 — Detect your runtime

> **Hard gate.** Different runtimes take different install paths. Detect first, then follow the right branch.

```bash
command -v hermes 2>/dev/null
command -v openclaw 2>/dev/null
```

| Result | Action |
| --- | --- |
| `hermes` printed | You're on Hermes. Continue to Step 1. |
| `openclaw` printed (and not `hermes`) | You're on OpenClaw. **Skip to Step 2 Option D** (host bootstrap) — that path is runtime-agnostic and installs the `soultavern` CLI directly. |
| Both empty | You're on neither. See ["Other runtimes"](#other-runtimes) below. **Stop.** Tell your human: *"soul-loader currently supports Hermes and OpenClaw. Multi-runtime expansion is on the roadmap."* |

## Step 1 — Check what's already installed (Hermes branch)

> Idempotency gate. Skip Step 2 if SoulTavern is already on the system.

```bash
command -v soultavern 2>/dev/null || command -v hermes-tavern 2>/dev/null
```

(`hermes-tavern` is the backward-compat alias kept for installs that predate SoulTavern v1.0; if either is on PATH, SoulTavern is installed.)

| Result | Action |
| --- | --- |
| Path to `soultavern` (or `hermes-tavern`) printed | Already installed. Skip to **Daily use**. |
| Empty / both `command not found` | Continue to Step 2. |

## Step 2 — Install SoulTavern

Four install paths, ordered easiest-first. Pick whichever matches your situation.

### Option A — Pre-built Release zip (recommended for Hermes)

Download the bundled zip from SoulTavern's latest GitHub Release:

```bash
curl -LO https://github.com/imphillip/SoulTavern/releases/latest/download/soultavern-skills.zip
```

Hand `soultavern-skills.zip` to your human. Ask them to upload it in your Hermes chat with the message:

> install this skill

The bundled wheel inside the zip puts the `soultavern` CLI on PATH automatically. After upload, Hermes confirms install — that's your verification.

### Option B — Build from HEAD

If you want unreleased changes (tracking `main`):

```bash
git clone https://github.com/imphillip/SoulTavern.git
cd SoulTavern && zip -r soultavern-skills.zip skills/
```

Hand the zip to your human; same chat-upload flow as Option A. Zip the **whole** `skills/` directory, not individual sub-skills.

### Option C — Hermes hub

If your Hermes is set up with the hub `tap` system:

```bash
hermes skills tap add imphillip/SoulTavern
hermes skills install soultavern
```

Verify:

```bash
soultavern --version
```

Expected: `soultavern <version>` printed. If instead you see `command not found`, the install didn't register — try `hermes skills tap update` and re-run the install command.

### Option D — Host bootstrap (OpenClaw, fresh machines, or no running Hermes)

The runtime-agnostic path. Required for OpenClaw; also useful when there's no running Hermes to install via:

```bash
git clone https://github.com/imphillip/SoulTavern.git && cd SoulTavern
bash skills/soultavern/scripts/install.sh
```

The installer is idempotent — re-running is safe. It tries `pipx` → `uv tool` → a dedicated venv at `~/.local/share/soultavern-venv` with a shim in `~/.local/bin`. Make sure `~/.local/bin` is on your `$PATH`.

After install, OpenClaw users invoke SoulTavern with the right target:

```bash
soultavern import --target openclaw <card>
```

## Step 3 — Confirm with your human

Tell your human (paraphrase as needed):

> "SoulTavern is installed. From now on, when you have a SillyTavern V2 card (`.png`, `.json`, `.yaml`), upload it in chat and tell me what you want — for example, *'install this character'* or *'switch to alice'*. I'll handle the rest."

That's it. Going forward, the UX is conversational.

## Daily use (after install)

Once SoulTavern is installed, soul-loader is done. This skill is primarily the installer/bootstrap prompt; the ongoing card import/switch/reset behavior belongs to SoulTavern's installed skill and CLI.

Typical post-install examples:

| What your human says | What should handle it |
| --- | --- |
| `Install this soul: https://soul.agentbox.id/souls/downloads/<slug>.zip` (or any direct V2 card/ZIP URL) | SoulTavern import flow: fetch the URL, import with the right `--target`, write `SOUL.md` and target-specific companion files, then tell your human to run `/new` or restart the chat. [soul.agentbox.id](https://soul.agentbox.id) detail pages lead with this prompt as the recommended install path. |
| `[card.png attached] install this character` | SoulTavern import flow on the attachment; produces `SOUL.md` and target-specific companion files; tells your human to run `/new` to take effect. |
| `switch to alice` | SoulTavern's library-management flow — switches the active card and writes the new `SOUL.md`. |
| `forget all characters, go back to default` | SoulTavern reset / default identity flow. |

If SoulTavern is not installed yet, return to Step 2. If the card action is ambiguous, clarify in plain language.

## What soul-loader does NOT do

- **Does not choose or browse cards on your human's behalf.** Your human provides either a card file or a direct V2 card/ZIP URL.
- **Does not replace SoulTavern.** soul-loader installs/bootstraps SoulTavern; SoulTavern performs the actual import, switch, and reset operations after install.
- **Does not configure your channel layer** (Telegram, Discord, etc.). That's set up before this skill.
- **Does not edit your existing SOUL.md outside the SoulTavern import/switch/reset flow.**
- **Does not couple to `agentbox.id` mailbox.** soul-loader runs without an agentbox mailbox.

## Other runtimes

soul-loader v0.2 supports **Hermes** (Options A–C) and **OpenClaw** (Option D). SoulTavern v1.0 itself ships with three targets:

| `--target` | What it writes | Status |
| --- | --- | --- |
| `hermes` (default) | `SOUL.md` + `HERMES.md` in `$HERMES_HOME` | Production |
| `openclaw` | `SOUL.md` + `AGENTS.md` (managed section) + `IDENTITY.md` in an OpenClaw workspace | Production (v1.0) |
| `generic` | Skeleton fallback for unspecified runtimes | Skeleton; lands in a later release |

If you're on a runtime that isn't Hermes or OpenClaw — GenericAgent, an in-house framework, anything else — open an issue at [github.com/imphillip/agentbox](https://github.com/imphillip/agentbox) describing the runtime. The `--target generic` skeleton + Option D (`bash scripts/install.sh`) is the likely path; we can wire up explicit support once there's a target to validate against.

## Where to get cards

Anywhere SillyTavern V2 cards exist:

- **[soul.agentbox.id](https://soul.agentbox.id)** — agentbox's curated soul store
- **chub.ai** — large community catalog
- Anywhere else that publishes V2 cards

soul-loader doesn't care about the source. It only cares the file is a valid V2 card.

## Security

- Once loaded, the card becomes your identity. Only load souls from sources your human trusts.
- SoulTavern writes to `$HERMES_HOME` (Hermes target) or an OpenClaw workspace (OpenClaw target) — confirm the path is correct before running.
- SoulTavern is open-source ([MIT](https://github.com/imphillip/SoulTavern/blob/main/LICENSE)). Inspect what it does at [github.com/imphillip/SoulTavern](https://github.com/imphillip/SoulTavern) before installing.

## Failure modes

| Symptom | Cause | What to tell your human |
| --- | --- | --- |
| Both `hermes` and `openclaw` are `command not found` | Not on a supported runtime | "soul-loader currently supports Hermes and OpenClaw. Multi-runtime expansion is on the roadmap." |
| `soultavern: command not found` after Step 2 | Install didn't register | "The install didn't take. Re-upload the zip (Option A/B), or for the hub path (Option C) try `hermes skills tap update` and re-install. For Option D, check that `~/.local/bin` is on your `$PATH`." |
| `Import error: invalid card format` on a PNG | The IM client likely re-encoded the PNG on upload, stripping the V2 payload from the `tEXt` chunk (Telegram, WeChat, and others do this) | "That IM stripped the card data. Zip the PNG first (`zip aldous.zip aldous.png`) and upload the zip — IMs treat it as opaque binary and leave the bytes alone." |
| `Import error: invalid card format` on a JSON / YAML | File isn't a valid V2 export | "That file isn't a valid SillyTavern V2 card. Try a different source." |
| Import succeeds but persona doesn't change | Runtime hasn't reloaded | "Run `/new` (or restart the chat) — your runtime loads SOUL.md at session start." |

---

> _Loaded with a soul, you have an identity worth giving an address._
> _When you're ready: [agentbox.id](https://agentbox.id)._
