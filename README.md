# AI supply chain copilot PRD

A planner gets paged at 2 a.m. The supplier slipped, the part is late, and the copilot is allowed to recommend only what it can cite and route for approval.

This repo is a PRD plus a small runnable prototype. The center of gravity is product judgment: user, workflow, trust boundary, metric, risk, and build path.

## Read in order

1. [Problem](./01-problem.md) - A planner gets paged at 2 a.m. and the current tools make the wrong work easy.
2. [Users and workflows](./02-users-and-workflows.md) - Planner, sourcing lead, and operations director journeys.
3. [Current state](./03-current-state.md) - Planning tools, spreadsheet workarounds, and where exception triage falls through.
4. [Product requirements](./04-product-requirements.md) - Numbered requirements with priority, acceptance, and rationale.
5. [System architecture](./05-system-architecture.md) - Components, data flows, trust boundaries, and action surface.
6. [Eval and trust model](./06-eval-and-trust-model.md) - Retrieval quality, citation faithfulness, recommendation accuracy, false-confidence rate, and refusal contract.
7. [Metrics and launch plan](./07-metrics-and-launch-plan.md) - North star, input metrics, alpha/beta/GA, and rollback criteria.
8. [Risks and tradeoffs](./08-risks-and-tradeoffs.md) - Six risks with likelihood, impact, mitigation, and residual risk.
9. [Build plan](./09-build-plan.md) - The sequence that connects the portfolio's retrieval, graph, negotiation, and brief-cadence blocks.

## Prototype

```bash
npm install
npm run build
npm run dev
```

The app is static Vite React. It uses synthetic fixture data only: no backend, no auth, no supplier email, no live ERP, and no paid API dependency.

The first screen shows an exception queue, cited evidence snippets, bounded recommended actions, and approval gates before any external action.

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

## What to look for

- The recommendation is constrained by cited evidence.
- The UI separates explanation from action.
- The approval gate appears before the copilot can affect the outside world.
- The PRD names failure modes instead of burying them in a launch plan.

## Connects to

- `supplier-risk-rag-agent` for cited supplier-risk retrieval and refusal behavior.
- `chip-supply-chain-map` for dependency graph context and watchlist risk packets.
- `procurement-negotiation-lab` for approval gates and negotiation mechanics after an exception is triaged.
- `ai-field-brief` for the weekly operating cadence and source registry discipline.

## Governance

This repo is part of the [Cognitive Delivery Control Plane](https://github.com/AthenaTheOwl/athena-site/blob/main/ops/control-plane.md) portfolio. The adjacent product repos carry the same shape with code; this repo sits closer to the product-spec end and names how those blocks would assemble.

Every requirement has a priority. Every system component has a trust boundary. Every eval dimension has a metric. The [decisions/](./decisions) directory records the PRD-craft choices.

## Examples

- [exception-ticket.md](./examples/exception-ticket.md) - realistic input.
- [copilot-response-good.md](./examples/copilot-response-good.md) - ideal response with citations.
- [copilot-response-bad.md](./examples/copilot-response-bad.md) - worked failure case plus analysis.

## License

MIT.
