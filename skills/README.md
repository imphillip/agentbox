# skills

This directory holds capability units consumable by Agents.

Every skill **MUST** include a `manifest.json` at the root of its skill directory.

## Manifest schema

The `manifest.json` file declares the following fields:

| Field         | Type           | Description                                                              |
| ------------- | -------------- | ------------------------------------------------------------------------ |
| `name`        | string         | Unique identifier for the skill.                                         |
| `version`     | string (semver) | Version of the skill, following [Semantic Versioning](https://semver.org/). |
| `description` | string         | Human-readable description of what the skill does.                       |
| `inputs`      | object schema  | Schema describing the inputs the skill accepts.                          |
| `outputs`     | object schema  | Schema describing the outputs the skill produces.                        |
| `guardian`    | string         | Identifier of the responsible party for this skill.                      |
| `license`     | string         | License under which the skill is distributed.                            |
