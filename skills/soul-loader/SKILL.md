---
name: soul-loader
description: "Install the soul-loading capability into your runtime, so your human can hand you SillyTavern V2 character cards in chat and you'll import them as SOUL.md."
version: 0.3.0
homepage: https://agentbox.id
license: Apache-2.0
metadata:
  agentbox:
    emoji: "🪪"
    category: "loader"
    related_skills: ["imphillip/SoulTavern"]
prerequisites:
  runtimes: ["hermes", "openclaw", "claude-code"]
---

# Soul Loader

Install the soul-loading capability into your runtime.

After this skill runs, your human can hand you a SillyTavern V2 character card (`.png` or `.json`) — uploaded in chat or pointed at by URL — and you'll import it into the agent's identity slot: `SOUL.md`, with target-specific companion files written next to it.

This is the **agentbox-blessed soul-loader.** The engine underneath is [SoulTavern](https://github.com/imphillip/SoulTavern), an MIT-licensed multi-target importer in the lineage `TavernAI → SillyTavern → HermesTavern → SoulTavern`. agentbox does not vendor or modify SoulTavern — soul-loader installs and delegates to the upstream project.

SoulTavern v2.0 is a single self-contained skill folder following the [Claude skills](https://github.com/anthropics/skills) folder layout. The same install methods work across any runtime that scans a skills directory (Hermes, OpenClaw, Claude Code, in-house frameworks). What changes per runtime is *where* the `soultavern/` folder lands. SoulTavern picks the right target (`hermes` / `openclaw` / `generic`) per import.

## When to use this skill

- Your human wants to give you a persona / character backed by a real SillyTavern V2 card
- You're running on a Claude-skills-aware runtime and SoulTavern isn't installed yet
- Your human has a card from [soul.agentbox.id](https://soul.agentbox.id), chub.ai, or any other source

## When NOT to use this skill

- SoulTavern is already installed — skip ahead to "Daily use"
- Your human just wants to roleplay without a card — they can give you a persona in plain language; you don't need a SOUL.md for that
- Your runtime doesn't have a skills directory or doesn't follow the Claude skills layout — see "Other runtimes" below

## Step 0 — Detect your runtime

> Identify which runtime you're embedded in so Steps 1 and 2 can target the right skills directory.

```bash
command -v hermes 2>/dev/null      # Hermes
command -v openclaw 2>/dev/null    # OpenClaw
command -v claude 2>/dev/null      # Claude Code
```

| Runtime | Skills directory |
| --- | --- |
| Hermes | `$HERMES_HOME/skills/` (or hub-managed) |
| OpenClaw | `~/.openclaw/workspace/skills/` |
| Claude Code | `~/.claude/skills/` |
| Other | Wherever your runtime scans for `skills/<name>/SKILL.md` |

If none of `hermes`, `openclaw`, `claude` is on PATH and you're not sure where your runtime lives, ask your human or check the runtime's docs. SoulTavern v2.0's install is just "place the `soultavern/` folder in your runtime's skills directory" — anywhere that scans for the [Claude skills](https://github.com/anthropics/skills) layout works.

## Step 1 — Check what's already installed

> Idempotency gate. Skip Step 2 if `soultavern/` is already in your runtime's skills directory.

Look for `soultavern/SKILL.md` in the directory you identified in Step 0:

```bash
# Whichever runtime applies:
ls "$HERMES_HOME/skills/soultavern/SKILL.md"                2>/dev/null
ls "$HOME/.openclaw/workspace/skills/soultavern/SKILL.md"   2>/dev/null
ls "$HOME/.claude/skills/soultavern/SKILL.md"               2>/dev/null
```

| Result | Action |
| --- | --- |
| Any path printed | SoulTavern is installed. Skip to **Daily use**. |
| All empty / `No such file` | Continue to Step 2. |

If you're unsure which directory applies, just continue to Step 2 — its install methods are all idempotent (re-running overwrites with identical content, no harm).

## Step 2 — Install SoulTavern

Three install paths. All install the same `soultavern/` skill folder; they only differ in delivery.

### Option A — Pre-built Release zip (recommended for chat-upload runtimes)

Download the bundled zip from SoulTavern's latest GitHub Release:

```bash
curl -LO https://github.com/imphillip/SoulTavern/releases/latest/download/soultavern-skills.zip
```

Hand `soultavern-skills.zip` to your human. Ask them to upload it in your runtime's chat with the message:

> install this skill

The zip contains a `skills/soultavern/` folder in the [Claude skills](https://github.com/anthropics/skills) layout. Any claude-skills-aware runtime (Hermes, Claude Code, …) recognizes it and places it correctly. After upload, your runtime confirms install — that's your verification.

### Option B — Direct copy (universal, runtime-agnostic)

If you have shell access on the host where your runtime runs, this is the most direct path:

```bash
git clone https://github.com/imphillip/SoulTavern.git
cp -r SoulTavern/skills/soultavern <YOUR_RUNTIME_SKILLS_DIR>/
```

Where `<YOUR_RUNTIME_SKILLS_DIR>` is the path identified in Step 0 (`$HERMES_HOME/skills/`, `~/.openclaw/workspace/skills/`, `~/.claude/skills/`, or wherever your runtime scans).

Only requirement: Python ≥ 3.10. Stdlib-only — no third-party Python dependencies. This is the path [SoulTavern's README](https://github.com/imphillip/SoulTavern) documents canonically.

### Option C — Hermes hub

Hermes hub users have a one-line shortcut:

```bash
hermes skills tap add imphillip/SoulTavern
hermes skills install soultavern
```

Same skill folder, different delivery. Verify with:

```bash
ls "$HERMES_HOME/skills/soultavern/SKILL.md"
```

## Step 3 — Confirm with your human

Tell your human (paraphrase as needed):

> "SoulTavern is installed. From now on, when you have a SillyTavern V2 card (`.png` or `.json`), upload it in chat and tell me what you want — for example, *'install this character'* or *'switch to alice'*. I'll handle the rest."

That's it. Going forward, the UX is conversational.

## Daily use (after install)

Once SoulTavern is installed, soul-loader is done. This skill is primarily the installer/bootstrap prompt; the ongoing card import/switch/reset behavior belongs to SoulTavern's installed skill.

Typical post-install examples:

| What your human says | What should handle it |
| --- | --- |
| `Install this soul: https://soul.agentbox.id/souls/downloads/<slug>.zip` (or any direct V2 card/ZIP URL) | SoulTavern import flow: fetch the URL, import with the right `--target`, write `SOUL.md` and target-specific companion files, then tell your human to restart the session. [soul.agentbox.id](https://soul.agentbox.id) detail pages lead with this prompt as the recommended install path. |
| `[card.png attached] install this character` | SoulTavern import flow on the attachment; produces `SOUL.md` and target-specific companion files; tells your human to restart the session for the new identity to load. |
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

soul-loader v0.3 supports any runtime that follows the [Claude skills](https://github.com/anthropics/skills) folder layout — at minimum **Hermes**, **OpenClaw**, and **Claude Code**. SoulTavern v2.0 itself ships with three targets:

| `--target` | What it writes | Status |
| --- | --- | --- |
| `hermes` (default) | `SOUL.md` + `HERMES.md` in `$HERMES_HOME` | Production |
| `openclaw` | `SOUL.md` + `AGENTS.md` (managed section) + `IDENTITY.md` in an OpenClaw workspace | Production |
| `generic` | Skeleton fallback for unspecified runtimes | Skeleton; fills in a later release |

If your runtime is something else (an in-house framework, GenericAgent, etc.) — as long as it scans a skills directory for `skills/<name>/SKILL.md` and runs Python ≥ 3.10, dropping the `soultavern/` folder there should work. SoulTavern picks the `generic` target in unrecognized environments. Open an issue at [github.com/imphillip/agentbox](https://github.com/imphillip/agentbox) if you want explicit per-runtime support wired up.

## Where to get cards

Anywhere SillyTavern V2 cards exist:

- **[soul.agentbox.id](https://soul.agentbox.id)** — agentbox's curated soul store
- **chub.ai** — large community catalog
- Anywhere else that publishes V2 cards

soul-loader doesn't care about the source. It only cares the file is a valid V2 card (PNG or JSON; YAML was dropped in SoulTavern v2.0).

## Security

- Once loaded, the card becomes your identity. Only load souls from sources your human trusts.
- SoulTavern writes to runtime-specific paths (`$HERMES_HOME` for Hermes, an OpenClaw workspace for OpenClaw, etc.) — confirm the path is correct before running.
- SoulTavern is open-source ([MIT](https://github.com/imphillip/SoulTavern/blob/main/LICENSE)) and stdlib-only (no third-party Python deps). Inspect what it does at [github.com/imphillip/SoulTavern](https://github.com/imphillip/SoulTavern) before installing.

## Failure modes

| Symptom | Cause | What to tell your human |
| --- | --- | --- |
| Step 0 finds neither `hermes`, `openclaw`, nor `claude` on PATH | Runtime not auto-detected | "I can't auto-detect a runtime. soul-loader works on any runtime that follows the Claude skills spec — please tell me which directory your runtime scans for skills, or try Option B in Step 2 directly with that path." |
| `soultavern/SKILL.md` not found after Step 2 | Install didn't land in the expected directory | "The skill folder isn't in the runtime's skills directory. Re-upload the zip (Option A) or rerun the `cp -r` (Option B). All Step 2 methods are idempotent — re-running is safe." |
| `Import error: invalid card format` on a PNG | The IM client likely re-encoded the PNG on upload, stripping the V2 payload from the `tEXt` chunk (Telegram, WeChat, and others do this) | "That IM stripped the card data. Zip the PNG first (`zip aldous.zip aldous.png`) and upload the zip — IMs treat it as opaque binary and leave the bytes alone." |
| `Import error: format not supported` on a YAML card | SoulTavern v2.0 dropped YAML support; only JSON and PNG are accepted | "Convert the card to JSON or PNG first — V2 cards exported as YAML aren't accepted in SoulTavern v2.0." |
| `Import error: invalid card format` on a JSON | File isn't a valid V2 export | "That file isn't a valid SillyTavern V2 card. Try a different source." |
| Import succeeds but persona doesn't change | Runtime hasn't reloaded | "Restart the session — your runtime loads `SOUL.md` at session start (Hermes: `/new` or `/reset`; others: restart your agent invocation)." |

---

> _Loaded with a soul, you have an identity worth giving an address._
> _When you're ready: [agentbox.id](https://agentbox.id)._
