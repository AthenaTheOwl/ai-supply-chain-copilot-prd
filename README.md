# N° 10 · ai-supply-chain-copilot-prd

Not a chatbot. A product teardown and PRD for an AI copilot that helps
supply-chain teams triage exceptions, explain root causes, recommend
actions, and escalate with receipts.

This is a markdown-only PRD — no code, no demo. The artifact is the
judgment: who the user is, what the workflow looks like, what the
trust boundaries are, what success means, what the risks are.

## Read in order

1. [Problem](./01-problem.md) — A planner gets paged at 2am. Why current
   tooling fails her.
2. [Users and workflows](./02-users-and-workflows.md) — Three archetypes
   (planner, sourcing lead, ops director) with concrete journeys.
3. [Current state](./03-current-state.md) — SAP IBP, o9, Kinaxis,
   Excel-based workflows. What they do well, where they fail.
4. [Product requirements](./04-product-requirements.md) — 20+ numbered
   requirements with P0/P1/P2 priority + acceptance + rationale.
5. [System architecture](./05-system-architecture.md) — Components,
   data flows, trust boundaries, action surface.
6. [Eval and trust model](./06-eval-and-trust-model.md) — Retrieval
   quality, citation faithfulness, action-recommendation accuracy,
   false-confidence rate, refusal contract.
7. [Metrics and launch plan](./07-metrics-and-launch-plan.md) — North
   star + input metrics + phased alpha/beta/GA + rollback criteria.
8. [Risks and tradeoffs](./08-risks-and-tradeoffs.md) — Six risks,
   each with likelihood + impact + mitigation + residual risk.

## For your role

**Hiring manager.** Five minutes: skim §1 and §6. §1 names a concrete
user pain in one paragraph. §6 names the trust boundaries and refusal
contract — that is where TPM judgment shows up most.

**Commercial / Sales.** §2 (user archetypes) plus §4 (requirements with
priority) gives you the buyer profile and the feature set at a glance.

**Operations.** §5 (system architecture) plus §7 (launch plan) shows what
this would mean for your incident-response, audit, and training stacks.

**Curious visitor.** Open [§1 Problem](./01-problem.md) and read for three
minutes. It is a real planner's day, not a hypothetical.

**Engineering leader.** §4 (numbered requirements with acceptance) plus
§5 (architecture with trust boundaries) plus §6 (eval methodology). The
trust-boundary discussion is where the PRD departs from "wrap an LLM
around it" PRDs.

## Governance

This repo is part of a portfolio that runs the [Cognitive Delivery
Control Plane](https://github.com/AthenaTheOwl/athena-site/blob/main/ops/control-plane.md)
operating model. The other product repos (ai-field-brief,
procurement-negotiation-lab, supplier-risk-rag-agent) carry the same
shape with code; this PRD lives at the artifact-only end of the
spectrum.

The discipline visible here: every requirement names a P0/P1/P2
priority. Every system component names a trust boundary. Every eval
dimension is named with a metric. The PRD itself is the artifact, and
the [decisions/](./decisions) directory records the PRD-craft choices.

## Examples

- [exception-ticket.md](./examples/exception-ticket.md) — realistic input
- [copilot-response-good.md](./examples/copilot-response-good.md) —
  ideal response with citations
- [copilot-response-bad.md](./examples/copilot-response-bad.md) — worked
  failure case plus analysis

## License

MIT.
