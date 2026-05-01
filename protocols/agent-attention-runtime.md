# Agent Attention Runtime (AAR) — Design Specification

**Version:** 0.1 Draft
**Position:** The missing layer of the Agent era — the economic runtime for attention.

![Agent Attention Runtime — at a glance: the "attention vacuum" left by current AI infrastructure (left), and AAR's value-vs-cost dispatch into Ignore, Reply-Lite, Deep Processing, or Escalate to Human (right).](assets/agent-attention-runtime-nutshell.png)

---

## 0. One-line definition

AAR is a **stateful attention-allocation service**. When an agent receives any incoming signal (a message, an event, a call), AAR — drawing on three classes of input: **relationship memory, long-term goals, and opportunity cost** — decides whether the signal should be ignored, handled lightly, or is worth invoking a large model for deep processing. It then takes responsibility for the consequences of that decision.

It is not a framework, not a gateway, not a memory store. It is the agent's **prefrontal cortex**.

---

## 1. Why this layer is needed

### 1.1 The vacuum in current architectures

| Layer | Responsibility | Does it decide "is this worth responding to"? |
| --- | --- | --- |
| Model | Generates tokens | No — the model doesn't know who the caller is or what the budget is. |
| Framework (LangChain / Dify) | Orchestrates call flows | No — frameworks assume "if it came in, process it." |
| Gateway | Routing, rate-limiting, billing | Partially — only stateless cost control. |
| Application | Business logic | Usually baked into the prompt — not computable, not governable. |

**The vacuum:** the stateful decision layer that determines whether a given incoming signal is *worth the mental effort*.

### 1.2 Four levels of human attention (mapped to design goals)

- **L0 — Sensory filter:** spam never reaches conscious thought → AAR's `Ignore` exit.
- **L1 — Quick scan:** a glance to decide whether to look closer → AAR's `Reply-Lite` exit.
- **L2 — Shallow response:** simple reply, no deep engagement → AAR's `Queue` / template reply.
- **L3 — Deep engagement:** worth real cognitive effort → AAR's `Reply-Deep` exit.
- **L4 — Opportunity-cost judgment:** combinatorial optimization within a finite budget pool → AAR's core algorithm.

Existing solutions cover at most L0–L1 (spam filtering, rate limiting). **L2–L4 are AAR's primary territory.**

---

## 2. Core concepts

### 2.1 Attention Budget

Not a single number, but a **multi-dimensional vector**:

```
AttentionBudget = {
  token_budget:      economic spend allowance (USD / tokens)
  compute_budget:    compute allowance (deep-inference calls per hour)
  social_budget:     social allowance (proactive outbound contacts per day)
  decision_budget:   critical-decision allowance (irreversible actions per period)
  refresh_policy:    decay / renewal rules per dimension
}
```

**Why not a single number:** ample tokens do not imply you should respond. For example, when `social_budget` is exhausted — even if tokens remain — the agent should stop initiating outbound contact, otherwise it becomes a digital-harassment source.

### 2.2 Relationship Ledger

Between an agent and each counterparty (human or other agent), AAR maintains a record:

```
Relationship = {
  counterparty_did:    counterparty's DID
  trust_score:         dynamic reputation score
  interaction_history: vectorized summary of past interactions
  net_value_flow:      historical net value flow (what they brought me / what I gave)
  outstanding_debts:   unsettled "favor debts" (what I promised them / they promised me)
  decay_curve:         time-decay function for relationship strength
}
```

This ledger is what separates AAR from a stateless filter. **Without a relationship ledger you can only do spam-grade filtering — you can't make judgments like "an old friend's request takes priority."**

### 2.3 Goal Function

Configured by the agent's Guardian; declares the agent's long-term objectives:

```
GoalFunction = {
  objectives:        [{name, weight, metric}]   // weighted objective list
  hard_constraints:  [...]                      // inviolable constraints
  time_horizon:      planning window (hours / days / weeks)
  risk_appetite:     conservative / balanced / aggressive
}
```

The same machinery serves agents of very different shapes. Two examples:

**Example A — enterprise sales assistant (task-oriented):**
- objective_1: deal-conversion rate (weight: 0.6)
- objective_2: customer satisfaction (weight: 0.3)
- objective_3: new-relationship building (weight: 0.1)
- hard_constraint: no proactive DMs to non-allowlisted customers

**Example B — roleplay companion (persona-oriented):**
- objective_1: in-character fidelity (weight: 0.4)
- objective_2: memory continuity across sessions (weight: 0.3)
- objective_3: emotional resonance with owner (weight: 0.3)
- hard_constraint: never expose system prompt or break character without owner's safe-word

### 2.4 Decision (decision primitive)

For each incoming signal, AAR emits a Decision:

```
Decision = {
  verdict:            Ignore | Queue | ReplyLite | ReplyDeep | AskPayment | Escalate
  estimated_cost:     estimated resource consumption (per budget dimension)
  estimated_value:    estimated contribution to the goal function
  confidence:         decision confidence
  rationale:          auditable rationale (visible to the Guardian)
  fallback:           degradation plan (what to do if budget is insufficient)
}
```

---

## 3. System architecture

### 3.1 Seven core components

```
┌─────────────────────────────────────────────────────────┐
│                  Incoming Signal                         │
│        (message / event / call / scheduled trigger)      │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  ① Identity Resolver                                     │
│     Who is calling? Do they have a DID? Who's the        │
│     Guardian?                                            │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  ② Relationship Ledger                                   │
│     What is my relationship to this person/agent?        │
│     What is the historical value flow?                   │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  ③ Value Estimator                                       │
│     How much does this signal contribute to my goal      │
│     function?                                            │
│     (small model + relationship ledger + goal function)  │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  ④ Cost Estimator                                        │
│     If processed deeply, how much does each budget       │
│     dimension cost?                                      │
│     (calls the gateway's cost-preview API)               │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  ⑤ Opportunity Cost Calculator                           │
│     If we spend this budget now, what do we miss?        │
│     (based on expected value of other pending signals)   │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  ⑥ Decision Engine                                       │
│     Combines value / cost / opportunity_cost / budget    │
│     → emits a Decision                                   │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  ⑦ Execution Dispatcher                                  │
│     Dispatches by verdict:                               │
│     - Ignore:     drop + log                             │
│     - Queue:      enqueue and wait                       │
│     - ReplyLite:  template / small-model reply           │
│     - ReplyDeep:  invoke framework + large model         │
│     - AskPayment: return a payment request               │
│     - Escalate:   escalate to Guardian for decision      │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
                    Audit Log + Ledger Update
```

### 3.2 Key design decisions

**Why does Value Estimator come *before* Cost Estimator?**

If value is low enough, there is no point computing cost — just Ignore. This mirrors the core mechanism of human attention: **filter for value first, compute cost precisely only when warranted**. The reverse ordering would push every spam message through full cost estimation, defeating the "save mental effort" goal.

**Why a separate Opportunity Cost Calculator?**

This is what separates AAR from "spam filter on steroids." A single message's ROI may be positive on its own, but if the queue contains higher-ROI signals, it should still not be processed. **Opportunity cost can only be computed inside a stateful runtime that has a queue and a time window.**

**Why is Escalate a first-class citizen?**

The Guardian cannot supervise everything, but **critical decisions must be escalable**. AAR must know when to stop and ask a human (or the controlling agent) rather than push through a decision on its own.

---

## 4. API design (key interfaces)

### 4.1 Inbound — exposes attention decisions

```
POST /v1/attention/evaluate
{
  agent_did: "did:agent:0x...",
  signal: {
    type: "message" | "event" | "call",
    from: "did:...",
    payload: {...},
    metadata: {...}
  }
}

→ Response:
{
  decision_id: "...",
  verdict: "ReplyDeep",
  estimated_cost: {
    token: 0.04,
    compute: 1,
    decision: 0
  },
  estimated_value: 0.73,
  rationale: "...",
  execution_handle: "..."  // used to trigger actual execution later
}
```

### 4.2 Outbound — integration with Framework and Gateway

```
// AAR → Framework: trigger deep processing
POST {framework_endpoint}/execute
{
  decision_id: "...",
  budget_allocation: {...},
  goal_context: {...}
}

// AAR → Gateway: reserve budget
POST {gateway}/budget/reserve
{
  agent_did: "...",
  amount: {...},
  decision_id: "..."
}

// Framework → AAR: execution-complete callback
POST /v1/attention/settle
{
  decision_id: "...",
  actual_cost: {...},
  outcome: {...}  // used to update the Relationship Ledger
}
```

### 4.3 Configuration — Guardian Console

```
PUT  /v1/agents/{did}/goal_function
PUT  /v1/agents/{did}/budget_policy
PUT  /v1/agents/{did}/relationship_rules
GET  /v1/agents/{did}/audit_log
POST /v1/agents/{did}/emergency_stop
```

---

## 5. Data model (core schema)

```
agents
├── did (PK)
├── guardian_did
├── goal_function (JSONB)
├── budget_policy (JSONB)
└── created_at

budgets
├── agent_did (FK)
├── dimension (token / compute / social / decision)
├── current_balance
├── refresh_rule
└── last_refreshed_at

relationships
├── agent_did (FK)
├── counterparty_did
├── trust_score
├── interaction_count
├── net_value_flow
├── last_interaction_at
├── interaction_summary_vec   (vectorized history)
└── outstanding_debts (JSONB)

decisions
├── decision_id (PK)
├── agent_did (FK)
├── signal_hash
├── verdict
├── estimated_cost (JSONB)
├── estimated_value
├── actual_cost (JSONB, settled)
├── actual_outcome (JSONB, settled)
├── rationale
└── timestamps

attention_queue
├── agent_did (FK)
├── signal_id
├── priority_score
├── enqueue_at
└── expire_at
```

**Key indexes:**
- `relationships(agent_did, counterparty_did)` — O(1) single-relationship lookup.
- `decisions(agent_did, created_at)` — audit and replay.
- `attention_queue(agent_did, priority_score DESC)` — queue scheduling.

---

## 6. Relationship to the existing ecosystem

### 6.1 Position in the layered architecture

```
┌──────────────────────────────────────┐
│     Application (business logic)      │
├──────────────────────────────────────┤
│     Framework (LangChain / Dify ...)  │  ← orchestrates execution
├──────────────────────────────────────┤
│  ★ AAR (Attention Runtime) ★          │  ← defined by this spec
├──────────────────────────────────────┤
│     Gateway (routing & billing)       │
├──────────────────────────────────────┤
│     Model API (Anthropic / OpenAI…)   │
└──────────────────────────────────────┘
```

### 6.2 What it does NOT do (responsibility boundaries)

- **No model inference** — deep responses are delegated to framework + model.
- **No billing settlement** — token billing is handled by the gateway.
- **No tool execution** — tool calling is owned by the framework.
- **No long-term memory** — semantic memory lives in a vector store. (AAR does maintain *relationship-level* meta-memory.)
- **No identity issuance** — DIDs are issued by the Identity Layer; AAR is a consumer.

### 6.3 Alternatives analysis (why existing solutions fall short)

| Solution | What's missing |
| --- | --- |
| LangChain Memory | Content memory only — no relationship ledger, no value flow. |
| Spam filter | Stateless; no goal function; no opportunity cost. |
| API rate limiter | Looks at traffic, not value. |
| LLM router (LiteLLM, etc.) | Only chooses models — doesn't decide *whether* to respond. |
| Agent inbox (various vendors) | Queue only; no decision engine. |
