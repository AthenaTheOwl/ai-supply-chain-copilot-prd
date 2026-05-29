---
id: DEC-PRD-003-no-auto-execute-supplier-facing-actions
spec: ./
requirement: R-PRD-003-1
date: 2026-05-24
status: approved
reversible: true
owner: product.prd-curator
decision: |
  The copilot will not auto-execute supplier-facing actions. Outbound
  supplier communication, ERP writes, supplier corrective-action
  requests, leadership escalations, and customer-impact statements all
  require a named human approver before the action layer can execute.
alternatives:
  - label: full automation for low-risk actions
    rejected_because: |
      Supplier communication is high-stakes (financial and relational),
      and the product cannot reliably classify low-risk versus
      high-risk at alpha.
  - label: opt-in automation per tenant
    rejected_because: |
      Shifts the unbounded-downside risk to the buyer's configuration
      choices and weakens the eval and audit story.
  - label: no automation at all (read-only synthesis)
    rejected_because: |
      The product still needs to draft, stage, and propose so planners
      save time; drafting is reversible and inspectable.
rationale: |
  Supplier-facing actions have unbounded downside. A hallucinated email
  sent to a supplier can damage a multi-year commercial relationship,
  trigger contract disputes, or move premium-freight liability. The
  cost of a human approval gate is bounded: a few seconds of planner
  time per action. The cost of an autonomous wrong action is not.

  The decision also matches how planners want to use the tool. Priya,
  Marcus, and Dana all benefit from drafts, proposals, and escalation
  packets they can edit and send. None of them are asking for a system
  that sends supplier emails on its own. The product surface should
  match the operator's accountability model.
evidence:
  - kind: spec
    ref: ./04-product-requirements.md
  - kind: spec
    ref: ./06-eval-and-trust-model.md
  - kind: spec
    ref: ./08-risks-and-tradeoffs.md
rollback: |
  To reverse, downgrade FR-12 and FR-13 from P0 to P1, add an autonomy
  tier to the action layer in section 5, and rewrite the
  false-confidence rollback criteria in section 7 so that autonomous
  actions can be gated by confidence threshold instead of human
  approval. Each of those changes would require fresh risk review.
---

## decision

The copilot will not auto-execute supplier-facing actions. Outbound
supplier communication, ERP writes, supplier corrective-action requests,
leadership escalations, and customer-impact statements all require a
named human approver before the action layer can execute.

## alternatives

- Full automation for low-risk actions — rejected_because supplier
  communication is high-stakes (financial and relational), and the
  product cannot reliably classify low-risk versus high-risk at alpha.
- Opt-in automation per tenant — rejected_because it shifts the
  unbounded-downside risk to the buyer's configuration choices and
  weakens the eval and audit story.
- No automation at all (read-only synthesis) — rejected_because the
  product still needs to draft, stage, and propose so planners save
  time; drafting is reversible and inspectable.

## rationale

Supplier-facing actions have unbounded downside. A hallucinated email
sent to a supplier can damage a multi-year commercial relationship,
trigger contract disputes, or move premium-freight liability. The cost
of a human approval gate is bounded: a few seconds of planner time per
action. The cost of an autonomous wrong action is not.

The decision also matches how planners want to use the tool. Priya,
Marcus, and Dana all benefit from drafts, proposals, and escalation
packets they can edit and send. None of them are asking for a system
that sends supplier emails on its own. The product surface should match
the operator's accountability model.

## evidence

- [04-product-requirements.md](../04-product-requirements.md) — FR-7
  (human approval gate), FR-12 (no auto-send), FR-13 (no autonomous ERP
  write).
- [06-eval-and-trust-model.md](../06-eval-and-trust-model.md) — autonomy
  boundaries and refusal behavior sections.
- [08-risks-and-tradeoffs.md](../08-risks-and-tradeoffs.md) — risk row
  for hallucinated recommendations and the worked mitigation.

## rollback

To reverse, downgrade FR-12 and FR-13 from P0 to P1, add an autonomy
tier to the action layer in §5, and rewrite the false-confidence
rollback criteria in §7 so that autonomous actions can be gated by
confidence threshold instead of human approval. Each of those changes
would require fresh risk review.
