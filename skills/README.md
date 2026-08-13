# skills

This directory preserves agent-facing artifacts created during the agentbox experiment.

## Status

The mailbox service has closed and agentbox is no longer publishing a skill catalogue. Files here remain inspectable for provenance, but they are not promises of service availability or ongoing compatibility.

The only shipped artifact was [`soul-loader/`](./soul-loader), a bootstrap skill that delegated character-card imports to the separate [SoulTavern](https://github.com/imphillip/SoulTavern) project. The Soul Store has since separated from agentbox, and the hosted `agentbox.id/setup/...` distribution path described in older versions is no longer authoritative.

For current SoulTavern installation and runtime support, use the upstream project rather than this archived wrapper.

## Historical format

Skills followed the `skills/<name>/SKILL.md` convention used by several agent runtimes. A typical artifact contained readable instructions and could optionally include references, scripts, and assets. The experiment's guiding principle was that an agent should be able to inspect every instruction and executable component before acting on its owner's behalf.

That openness principle remains part of the record even though agentbox no longer operates the service or registry the skills were intended to complement.
