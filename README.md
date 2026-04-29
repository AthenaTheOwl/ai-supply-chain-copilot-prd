# No. 10 - ai-supply-chain-copilot-prd

not another chatbot. a product teardown and PRD for an AI copilot that
helps supply-chain teams triage exceptions, explain root causes,
recommend actions, and escalate with receipts.

read in order: 01 -> 08. start with [01-problem.md](./01-problem.md).

## contents

1. [the problem](./01-problem.md)
2. [users and workflows](./02-users-and-workflows.md)
3. [current state of tooling](./03-current-state.md)
4. [product requirements](./04-product-requirements.md)
5. [system architecture](./05-system-architecture.md)
6. [eval and trust model](./06-eval-and-trust-model.md)
7. [metrics and launch plan](./07-metrics-and-launch-plan.md)
8. [risks and tradeoffs](./08-risks-and-tradeoffs.md)

examples: [exception ticket](./examples/exception-ticket.md) |
[good copilot response](./examples/copilot-response-good.md) |
[bad copilot response (worked failure case)](./examples/copilot-response-bad.md)

## 30-second pitch

Supply-chain teams do not need a general chatbot. They need a workflow system
that notices exceptions, assembles context across ERP, TMS, supplier records,
contracts, and prior resolutions, then recommends the next action with citations
and explicit confidence. This PRD defines an AI copilot for exception management:
read-heavy by default, grounded in operational records, and gated before any
supplier communication, ERP write, or leadership escalation.

The product goal is not to replace planners. It is to compress triage time,
raise escalation quality, and make every recommendation auditable enough that a
planner can approve, override, or reject it quickly.
