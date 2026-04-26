# protocols

This directory holds protocol specifications for Agent developers and implementers.

Protocol specs in this directory follow an **RFC-like style**: each spec defines normative requirements (using terms such as MUST, SHOULD, MAY) and is intended to be precise enough that independent implementations can interoperate.

## Index

- **[Agent Attention Runtime (AAR)](agent-attention-runtime.md)** — *v0.1 Draft.* A stateful attention-allocation service that decides whether each incoming signal should be ignored, lightly handled, queued, or worth a deep model call. Defines the **Attention Budget** (multi-dimensional: token / compute / social / decision), the **Relationship Ledger**, the **Goal Function**, and a seven-component decision pipeline. Sits between the gateway/model layer and the framework/application layer — the "prefrontal cortex" the agent stack is currently missing.
