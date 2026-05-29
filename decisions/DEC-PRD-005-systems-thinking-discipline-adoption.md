---
id: DEC-PRD-005-systems-thinking-discipline-adoption
spec: ./
requirement: R-PRD-5..8
date: 2026-05-29
status: approved
reversible: true
owner: product.prd-curator
amends: DEC-PRD-004-install-cdcp-governance
decision: |
  ai-supply-chain-copilot-prd adopts DEC-CDCP-020's systems-thinking
  discipline. Concretely: the schemas-cache is refreshed from
  athena-site so decision, dream-output, and run schemas carry the
  four new optional fields (systems_map, transferable_principle,
  falsification_test, adoption_ladder). AGENTS.md gains a top-level
  section naming the discipline. validate_decisions.py is extended to
  emit a stderr warning (exit code 0) when an approved DEC is missing
  any of the four fields. The three most recent DECs in this repo
  (DEC-PRD-002 through DEC-PRD-004) are retrofitted with substantive
  values for the four fields.
alternatives:
  - label: skip the per-repo adoption and let the schema-cache drift in
    rejected_because: |
      The schema-cache freshness gate would flag the drift on the next
      push and AGENTS.md would silently misname the contract. The
      portfolio's discipline only earns its weight when each repo
      names which version of the schema it runs against and the
      validator emits a signal when authors forget the new shape.
  - label: ratchet to hard failure on day one
    rejected_because: |
      DEC-PRD-001 is intentionally left as a warning surface to mirror
      DEC-CDCP-020's 30-day bootstrap window. Switching the warning to
      a failure now would force a backfill sweep on an in-flight repo
      and break the consistency with athena-site's own ratchet plan.
  - label: retrofit all four existing DECs in this pass
    rejected_because: |
      The task scope names "3 most recent" so that the discipline is
      demonstrated on the freshest decisions and DEC-PRD-001 stays as
      a visible warning until a deliberate pass closes it. Doing all
      four would hide the validator's warning behavior in this repo's
      day-one CI run.
rationale: |
  The discipline lands portfolio-wide only if every repo runs the same
  schema version and the same validator. This DEC is the per-repo
  acknowledgment that the four fields are now part of the contract
  surface, that AGENTS.md names them, that the validator surfaces
  missing fields, and that the three most recent DECs carry the
  shape end-to-end. The amendment to DEC-PRD-004 keeps the
  install-depth record honest: the base layer just got two new gates
  (warning category in validate_decisions plus the refreshed cache).
evidence:
  - kind: decision
    ref: ../athena-site/decisions/DEC-CDCP-020-systems-thinking-discipline.md
  - kind: decision
    ref: ./DEC-PRD-004-install-cdcp-governance.md
  - kind: doc
    ref: ./AGENTS.md
  - kind: doc
    ref: ./scripts/validate_decisions.py
rollback: |
  Revert the AGENTS.md systems-thinking section, revert
  scripts/validate_decisions.py to the pre-warning shape, restore the
  prior schemas-cache files from git history, strip the four fields
  from DEC-PRD-002..004 front-matter, and delete this DEC. The CDCP
  base layer continues to run; only the systems-thinking surface goes
  away.
systems_map: |
  Per-repo adoption of cross-repo control-plane discipline; the schema
  cache is the contract, AGENTS.md is the readme, validator is the
  enforcement, retrofit is the demonstration.
transferable_principle: |
  Any cross-repo schema discipline lands via (cache then AGENTS.md
  then validator then retrofit) — the same pattern applies to future
  portfolio-wide schemas.
falsification_test: |
  If new DECs in this repo over 30 days populate the four fields at
  less than 20 percent rate despite the validator warning, the
  discipline isn't taking hold — escalate.
adoption_ladder:
  minimum_viable: |
    Cache refreshed; validator emits warnings.
  mid_adoption: |
    AGENTS.md updated; new DECs populate fields organically.
  full_adoption: |
    Validator fails on missing fields; at least 80 percent of
    historical DECs retrofitted.
  monitoring_signals:
    - new-DEC field-population rate per week
    - validator warning count trend
---

## decision

ai-supply-chain-copilot-prd adopts DEC-CDCP-020's systems-thinking
discipline. The schemas-cache is refreshed; AGENTS.md names the
four-field shape; validate_decisions.py emits a warning when an
approved DEC is missing any of `systems_map`,
`transferable_principle`, `falsification_test`, or `adoption_ladder`;
DEC-PRD-002 through DEC-PRD-004 are retrofitted with substantive
values.

## alternatives

- Skip the per-repo adoption and let the schema-cache drift in —
  rejected_because the freshness gate would flag the drift and
  AGENTS.md would silently misname the contract.
- Ratchet to hard failure on day one — rejected_because DEC-PRD-001
  stays as a visible warning, mirroring DEC-CDCP-020's 30-day
  bootstrap window.
- Retrofit all four existing DECs in this pass — rejected_because the
  task scope names three; the fourth stays as a deliberate warning
  surface until a later pass.

## rationale

The discipline lands portfolio-wide only if every repo runs the same
schema version and the same validator. This DEC is the per-repo
acknowledgment that the four fields are now part of the contract
surface, that AGENTS.md names them, that the validator surfaces
missing fields, and that the three most recent DECs carry the
shape end-to-end. The amendment to DEC-PRD-004 keeps the
install-depth record honest: the base layer just got an extra
warning category in validate_decisions plus the refreshed cache.

## evidence

- `../athena-site/decisions/DEC-CDCP-020-systems-thinking-discipline.md`
  — upstream portfolio DEC.
- `./DEC-PRD-004-install-cdcp-governance.md` — the install record this
  DEC amends.
- `./AGENTS.md` — the new top-level systems-thinking section.
- `./scripts/validate_decisions.py` — the extended validator.

## coverage

This DEC opens the R-PRD-5..8 requirement range for the
systems-thinking discipline:

- `R-PRD-5` — schemas-cache carries the four optional fields.
- `R-PRD-6` — AGENTS.md names the four-field shape.
- `R-PRD-7` — validate_decisions.py warns on missing fields when
  status is approved.
- `R-PRD-8` — DEC-PRD-002 through DEC-PRD-004 carry substantive values
  for the four fields.

## rollback

Revert the AGENTS.md systems-thinking section, revert
scripts/validate_decisions.py to the pre-warning shape, restore the
prior schemas-cache files from git history, strip the four fields
from DEC-PRD-002..004 front-matter, and delete this DEC. The CDCP
base layer continues to run; only the systems-thinking surface goes
away.

## follow-on

After 30 days, an amendment DEC can switch the validator from warning
to failure when an approved DEC lacks the four fields, matching the
ratchet path in DEC-CDCP-020. A separate later pass can retrofit
DEC-PRD-001 so the warning count reaches zero before the ratchet.
