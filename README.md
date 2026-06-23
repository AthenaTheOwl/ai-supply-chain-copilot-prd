# N° 10 · ai-supply-chain-copilot-prd

Not a chatbot. A product teardown and PRD for an AI copilot that helps
supply-chain teams triage exceptions, explain root causes, recommend
actions, and escalate with receipts.

This is a markdown-first PRD with a tiny runnable prototype. The artifact is
still the judgment and build path: who the user is, what the workflow looks
like, what the trust boundaries are, what success means, what the risks are,
and how the existing portfolio blocks would assemble into the product.

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
9. [Build plan](./09-build-plan.md) - Concrete phases that map
   procurement-negotiation-lab, supplier-risk-rag-agent,
   chip-supply-chain-map, and ai-field-brief/CDCP into the product.

## Prototype

```bash
npm install
npm run build
npm run dev
```

The app is static Vite React. It uses synthetic fixture data only: no backend,
no auth, no supplier email, no live ERP, and no paid API dependency. The first
screen shows an exception queue, cited evidence snippets, bounded recommended
actions, and approval gates before any external action.

## Live demo

Deploy the prototype to Vercel with:

```text
build command: npm run build
output directory: dist
```

Local verification:

```bash
npm install
npm run test:smoke
npm run build
```

## Connects to

- `supplier-risk-rag-agent` for cited supplier-risk retrieval and refusal behavior.
- `chip-supply-chain-map` for dependency graph context and watchlist risk packets.
- `procurement-negotiation-lab` for approval gates and negotiation mechanics after an exception is triaged.
- `ai-field-brief` for the weekly operating cadence and source registry discipline.

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
around it" PRDs. Section 9 maps the implementation sequence to existing
portfolio blocks.

## Governance

This repo is part of a portfolio that runs the [Cognitive Delivery
Control Plane](https://github.com/AthenaTheOwl/athena-site/blob/main/ops/control-plane.md)
operating model. The other product repos (ai-field-brief,
procurement-negotiation-lab, supplier-risk-rag-agent,
chip-supply-chain-map) carry the same shape with code; this PRD lives at
the artifact-only end of the spectrum and now names how those blocks
would support a build.

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
