---
id: DEC-PRD-001-acceptance-criteria-with-p0-p1-p2-priority
spec: ./
requirement: R-PRD-001-1
date: 2026-05-24
status: approved
reversible: true
owner: product.prd-curator
decision: |
  Every functional and non-functional requirement in this PRD carries a
  P0, P1, or P2 priority plus an explicit acceptance criterion. P0 means
  required for alpha. P1 means required before beta expansion. P2 means
  useful for general availability or later scale.
alternatives:
  - label: flat numbered list with no priority
    rejected_because: |
      Tradeoff conversations get pushed into engineering planning
      instead of being resolved in the PRD.
  - label: MoSCoW (must, should, could, won't)
    rejected_because: |
      Does not map cleanly to the alpha, beta, GA phases that drive the
      launch plan in section 7.
  - label: severity-only labels (critical, normal)
    rejected_because: |
      Severity is about consequence of failure, not about shipping
      order.
rationale: |
  Priority discipline forces the PRD to take a position on what is
  required for alpha versus what can wait. A requirement without
  priority quietly becomes a P0 by the time engineering reads it, which
  inflates scope. Acceptance criteria turn each requirement into
  something testable; rationale lines make the prioritization
  auditable.

  The P0/P1/P2 ladder also aligns with the launch plan in section 7
  (alpha/beta/GA gates) and the eval thresholds in section 6, so the
  same scaffold runs end-to-end from requirement to gate.
evidence:
  - kind: spec
    ref: ./04-product-requirements.md
  - kind: spec
    ref: ./07-metrics-and-launch-plan.md
rollback: |
  To reverse, strip priority labels from section 4 and replace the
  launch plan in section 7 with a single-phase rollout. That would
  require rewriting the eval thresholds in section 6 because the
  false-confidence and override targets escalate by phase.
---

## decision

Every functional and non-functional requirement in this PRD carries a P0,
P1, or P2 priority plus an explicit acceptance criterion. P0 means
required for alpha. P1 means required before beta expansion. P2 means
useful for general availability or later scale.

## alternatives

- Flat numbered list with no priority — rejected_because tradeoff
  conversations get pushed into engineering planning instead of being
  resolved in the PRD.
- MoSCoW (must, should, could, won't) — rejected_because it does not map
  cleanly to the alpha, beta, GA phases that drive the launch plan in
  §7.
- Severity-only labels (critical, normal) — rejected_because severity is
  about consequence of failure, not about shipping order.

## rationale

Priority discipline forces the PRD to take a position on what is
required for alpha versus what can wait. A requirement without priority
quietly becomes a P0 by the time engineering reads it, which inflates
scope. Acceptance criteria turn each requirement into something
testable; rationale lines make the prioritization auditable.

The P0/P1/P2 ladder also aligns with the launch plan in §7
(alpha/beta/GA gates) and the eval thresholds in §6, so the same scaffold
runs end-to-end from requirement to gate.

## evidence

- [04-product-requirements.md](../04-product-requirements.md) — every FR
  and NFR carries `P0`, `P1`, or `P2` with acceptance and rationale.
- [07-metrics-and-launch-plan.md](../07-metrics-and-launch-plan.md) —
  alpha, beta, and GA gates that consume the same priority tiers.

## rollback

To reverse, strip priority labels from §4 and replace the launch plan in
§7 with a single-phase rollout. That would require rewriting the eval
thresholds in §6 because the false-confidence and override targets
escalate by phase.
