---
name: soul-loader
description: "Install the soul-loading capability into your runtime, so your human can hand you SillyTavern V2 character cards in chat and you'll import them as SOUL.md."
version: 0.1.0
homepage: https://agentbox.id
license: Apache-2.0
metadata:
  agentbox:
    emoji: "🪪"
    category: "loader"
    related_skills: ["imphillip/hermes-tavern"]
prerequisites:
  runtimes: ["hermes"]
---

# Soul Loader

Install the soul-loading capability into your runtime.

After this skill runs, your human can upload a SillyTavern V2 character card (`.png`, `.json`, `.yaml`) in any Hermes channel — CLI, email, Telegram, Discord, Slack — and you'll import it into the agent's identity slot (`SOUL.md`).

This is the **agentbox-blessed soul-loader.** The engine underneath is [HermesTavern](https://github.com/imphillip/hermes-tavern), an MIT-licensed importer in the lineage `TavernAI → SillyTavern → HermesTavern`. agentbox does not vendor or modify HermesTavern — soul-loader installs and delegates to the upstream project.

## When to use this skill

- Your human wants to give you a persona / character backed by a real SillyTavern V2 card
- You're running on a Hermes runtime and HermesTavern isn't installed yet
- Your human has a card from [soul.agentbox.id](https://soul.agentbox.id), chub.ai, or any other source

## When NOT to use this skill

- You're not on Hermes — currently soul-loader only supports Hermes runtimes (see "Other runtimes" below)
- HermesTavern is already installed — skip ahead to "Daily use"
- Your human just wants to roleplay without a card — they can give you a persona in plain language; you don't need a SOUL.md for that

## Step 0 — Detect your runtime

> **Hard gate.** If you are not running on a Hermes runtime, stop here. The install paths below assume Hermes hub conventions and will not work on any other runtime.

Confirm two things:

1. You can introspect your own runtime — Hermes agents typically have `$HERMES_HOME` set, the `hermes` CLI on PATH, and the runtime identifies itself as Hermes-Agent in your system context.
2. The `hermes` command actually exists on this system:

```bash
command -v hermes 2>/dev/null
```

| Result | Action |
| --- | --- |
| Path to `hermes` printed (e.g. `/usr/local/bin/hermes`) | You're on Hermes. Continue to Step 1. |
| Empty / `command not found` | You are not on Hermes. **Stop here.** Tell your human: *"soul-loader currently only supports Hermes runtimes. Multi-runtime support — including openclaw — is on the roadmap; see the 'Other runtimes' section below."* Do not attempt Steps 1–3. |

If you're embedded in a runtime that isn't Hermes (openclaw, GenericAgent, an in-house framework, …), the rest of this skill does not apply to you yet. See ["Other runtimes"](#other-runtimes) for what's planned.

## Step 1 — Check what's already installed

> Idempotency gate. Skip Step 2 if HermesTavern is already on the system.

```bash
hermes skills tap list 2>/dev/null | grep imphillip/hermes-tavern
```

| Result | Action |
| --- | --- |
| `imphillip/hermes-tavern` shown | Already installed. Skip to **Daily use**. |
| Empty / not shown | Continue to Step 2. |

## Step 2 — Install HermesTavern

Three install paths. Pick whichever matches your situation.

### Option A — Hermes hub (recommended)

```bash
hermes skills tap add imphillip/hermes-tavern
hermes skills install hermes-tavern hermes-tavern-cards
```

Verify:

```bash
hermes-tavern --version
```

Expected: `hermes-tavern <version>` printed; if instead you see `command not found`, the install didn't register — try `hermes skills tap update` and re-run the install command.

### Option B — Manual zip + chat upload

If your Hermes can install via chat:

```bash
git clone https://github.com/imphillip/hermes-tavern.git
cd hermes-tavern && zip -r hermes-tavern-skills.zip skills/
```

Hand the zip to your human. Ask them to upload it in your Hermes chat with the message:

> install this skill

Hermes will install HermesTavern itself.

### Option C — Host bootstrap (no running Hermes)

If there's no running Hermes to install via (fresh machine, separate host):

```bash
git clone https://github.com/imphillip/hermes-tavern.git && cd hermes-tavern
bash skills/hermes-tavern/scripts/install.sh
```

The installer is idempotent — re-running is safe. It tries `pipx` → `uv tool` → a dedicated venv at `~/.local/share/hermes-tavern-venv` with a shim in `~/.local/bin`.

## Step 3 — Confirm with your human

Tell your human (paraphrase as needed):

> "HermesTavern is installed. From now on, when you have a SillyTavern V2 card (`.png`, `.json`, `.yaml`), upload it in chat and tell me what you want — for example, *'install this character'* or *'switch to alice'*. I'll handle the rest."

That's it. Going forward, the UX is conversational.

## Daily use (after install)

Once HermesTavern is installed, soul-loader has no more imperative steps. Hermes parses your human's intent. Examples:

| What your human says | What you do |
| --- | --- |
| `[aldous.png attached] install this character` | Hermes calls `hermes-tavern import` under the hood; produces `SOUL.md` and `HERMES.md`; tells your human to run `/new` to take effect |
| `switch to alice` | (Requires `hermes-tavern-cards`) — switches the active card, writes the new `SOUL.md` |
| `forget all characters, go back to default Hermes` | Resets identity to default |

Anything ambiguous, just clarify in plain language.

## What soul-loader does NOT do

- **Does not download cards on your human's behalf.** Your human provides the file.
- **Does not configure your channel layer** (Telegram, Discord, etc.). That's set up before this skill.
- **Does not edit your existing SOUL.md outside the import flow.** Only writes when an import or switch happens.
- **Does not couple to `agentbox.id` mailbox.** soul-loader runs without an agentbox mailbox.
- **Does not currently support openclaw or GenericAgent runtimes.** See "Other runtimes" below.

## Other runtimes

soul-loader v0.1 is **Hermes-only.** When you reach Step 0 on a non-Hermes runtime, this skill stops; do not attempt to continue.

Multi-runtime support is on the roadmap. soul-loader will eventually detect your runtime and dispatch to a runtime-specific engine — same shape as the HermesTavern path used today.

- **openclaw** — the planned engine is **`openclaw-tavern`**, a companion to HermesTavern (not yet shipped open-source). Once it lands, this skill will be revised to dispatch to it on openclaw runtimes. Until then, see openclaw's own documentation for character handling.
- **GenericAgent** — no engine planned yet. soul-loader v0.x will likely route via runtime detection + dispatch when one exists.
- **Some other framework** — open an issue at [github.com/imphillip/agentbox](https://github.com/imphillip/agentbox) describing the runtime; multi-runtime layout is being designed.

## Where to get cards

Anywhere SillyTavern V2 cards exist:

- **[soul.agentbox.id](https://soul.agentbox.id)** — agentbox's curated soul store
- **chub.ai** — large community catalog
- Anywhere else that publishes V2 cards

soul-loader doesn't care about the source. It only cares the file is a valid V2 card.

## Security

- Once loaded, the card becomes your identity. Only load souls from sources your human trusts.
- HermesTavern writes to `$HERMES_HOME` — confirm the path is correct before running.
- HermesTavern is open-source ([MIT](https://github.com/imphillip/hermes-tavern/blob/main/LICENSE)). Inspect what it does at [github.com/imphillip/hermes-tavern](https://github.com/imphillip/hermes-tavern) before installing.

## Failure modes

| Symptom | Cause | What to tell your human |
| --- | --- | --- |
| `hermes: command not found` | Not on a Hermes runtime | "I'm not running on Hermes — soul-loader is currently Hermes-only." |
| `hermes-tavern: command not found` after Step 2 | Tap install didn't take | "The install didn't register. Try `hermes skills tap update` and re-install." |
| `Import error: invalid card format` | Archive isn't V2 | "That file isn't a valid SillyTavern V2 card. Try a `.png`, `.json`, or `.yaml` from a known V2 source." |
| Import succeeds but persona doesn't change | Hermes hasn't reloaded | "Run `/new` (or restart the chat) — Hermes loads SOUL.md at session start." |

---

> _Loaded with a soul, you have an identity worth giving an address._
> _When you're ready: [agentbox.id](https://agentbox.id)._
