---
id: DEC-PRD-004-install-cdcp-governance
spec: ./
requirement: R-PRD-004-1
date: 2026-05-29
status: approved
reversible: true
owner: product.prd-curator
decision: |
  Install Cognitive Delivery Control Plane discipline in this markdown-only
  PRD repo at install-depth `minimum_static_grid`: add the cross-repo
  schemas-cache under `ops/schemas-cache/`, add the
  `check_schema_cache_freshness.py` and `validate_decisions.py` validators,
  retrofit the existing DEC-PRD-001 through DEC-PRD-003 front-matter to
  the cross-repo `decision.schema.json` shape, add `AGENTS.md` naming the
  governance contract, and extend the CI workflow to fail on cache drift
  or decision-schema violations. Do not install a Run emitter, a specs
  ledger, or any operating-model layer; the PRD is a static document.
alternatives:
  - label: static_grid_plus_validators
    rejected_because: |
      Adding a specs ledger and a static PRD manifest hash file would
      double the surface area for a document whose load-bearing artifact
      is the README plus the nine numbered sections. The repo already
      makes its requirements (R-PRD-*) implicit in section 04; promoting
      them into a specs/0001-prd/ six-file pattern would copy text
      without adding a check the existing structure does not.
  - label: full_run_evidence
    rejected_because: |
      Treating each PRD revision as a Run with prompt_snapshot_hash and
      sandbox_image_ref overfits the framework to a static doc. No
      replay command would have anything to execute, and the
      gate_results_summary would be a renaming of voice-lint plus
      check-no-bom plus the cache gates. The cost is conceptual debt;
      the benefit is zero new verification.
  - label: stay outside the cross-repo grid
    rejected_because: |
      Phase A flagged this repo as the only product repo without an
      `ops/` directory and outside the schema-cache pattern. Codex's
      review punch list named the same gap. Leaving it unaddressed
      means the portfolio's audit story stops at four repos and the PRD
      lives at a different governance altitude than every other product
      surface.
rationale: |
  The PRD is a static document with a tiny runnable prototype. The
  prototype builds and tests, but it does not emit Run records. A markdown
  PRD has no programmatic boundary that maps to the Run schema: there is
  no prompt, no sandbox, no policy lattice firing per request, no
  replayable trace. Forcing the schema onto a doc would make every
  validator pass on technicalities while saying nothing about the PRD's
  actual quality.

  What the PRD does have is a DEC ledger (three records of PRD-craft
  choices) and a voice-lint discipline already running in CI. Bringing
  that ledger into the cross-repo `decision.schema.json` shape closes
  the only real audit gap. The schemas-cache plus the freshness gate
  keeps the repo wired to athena-site so future deepenings (option 2
  or 3) do not have to re-install the base layer. The AGENTS.md names
  the install-depth choice so a future agent does not silently slide
  the repo upward.

  Option 1 also matches the repo's actual shape: voice_lint already
  runs, check_no_bom already runs, the Vite prototype builds and tests
  in CI. Adding two validator scripts and a schemas-cache earns its
  weight; adding a specs ledger and a Run emitter does not.
evidence:
  - kind: doc
    ref: https://raw.githubusercontent.com/AthenaTheOwl/athena-site/main/ops/control-plane.md
  - kind: doc
    ref: https://raw.githubusercontent.com/AthenaTheOwl/athena-site/main/ops/schemas/decision.schema.json
  - kind: decision
    ref: ../procurement-negotiation-lab/decisions/DEC-CDCP-001-install-cdcp-governance.md
  - kind: doc
    ref: ./README.md
  - kind: spec
    ref: ./04-product-requirements.md
rollback: |
  Delete `ops/schemas-cache/`, delete
  `scripts/check_schema_cache_freshness.py` and
  `scripts/validate_decisions.py`, drop the two new gate steps from
  `.github/workflows/run-evidence-gates.yml` (or revert to the prior
  `gates.yml`), and revert the front-matter on DEC-PRD-001 through
  DEC-PRD-003 to the prior four-key shape. Delete this file. The PRD
  content under the numbered markdown sections, the prototype under
  `src/`, and the prior CI gates (voice_lint, check_no_bom, npm build,
  npm test) all stay untouched. No cross-repo dependency is created
  that other repos rely on: the schemas-cache is a read mirror, not a
  source of truth.
systems_map: |
  Install-depth as a deliberate axis: a repo can join a cross-repo
  governance grid at the smallest layer that earns its weight, not at
  the depth a sibling chose. The schemas-cache plus validator pair is
  the base layer; specs ledgers, role contracts, and Run emitters are
  optional deepenings behind explicit DEC amendments.
transferable_principle: |
  Cross-repo control-plane discipline should support a graded install:
  static-document repos run the base validators, full-stack repos run
  the operating-model layer, and each tier is named so a future agent
  cannot silently slide the repo upward or downward.
falsification_test: |
  If a portfolio-wide audit at six months finds that
  minimum_static_grid repos either drift out of schema sync or carry
  the same incident class that the operating-model layer was supposed
  to gate, the graded install was the wrong factoring and the
  portfolio should converge on a single depth.
adoption_ladder:
  minimum_viable: |
    schemas-cache + check_schema_cache_freshness.py +
    validate_decisions.py + AGENTS.md naming the install-depth.
  mid_adoption: |
    Add a specs/0001-prd/ six-file ledger plus a static PRD manifest
    hash gate (lands as an amendment to this DEC if the PRD grows
    machine-consumed structure).
  full_adoption: |
    Run emitter for the Vite prototype if it gains a deployed
    inference surface, plus role contracts and policy YAMLs for the
    action layer (lands as a further amendment).
  monitoring_signals:
    - schema-cache-freshness gate exit code on every push
    - validate-decisions warning and error counts per week
    - whether the prototype gains a deployed inference surface
---

## decision

Install CDCP discipline in this markdown-only PRD repo at install-depth
`minimum_static_grid`. The install adds the cross-repo schemas-cache,
two validator scripts (`check_schema_cache_freshness.py`,
`validate_decisions.py`), an `AGENTS.md` governance contract, and an
extended CI workflow. The existing DEC-PRD-001 through DEC-PRD-003
front-matter is retrofitted to the cross-repo `decision.schema.json`
shape so the new validator passes. No Run emitter, no specs ledger, no
operating-model layer ships in this pass.

## alternatives

- `static_grid_plus_validators` — would add a `specs/0001-prd/` six-file
  ledger and a static PRD manifest hash file. Rejected because the PRD
  is already organized by the README plus nine numbered sections; a
  specs ledger would copy text without adding a check the existing
  structure does not already perform.
- `full_run_evidence` — would treat each PRD revision as a Run. Rejected
  because no replayable trace exists for a markdown edit; the gate
  results would be a renaming of voice-lint plus check-no-bom plus the
  schema gates.
- Stay outside the cross-repo grid — rejected because Phase A flagged
  this repo as the only portfolio repo without an `ops/` directory and
  Codex's review punch list named the same gap.

## rationale

The PRD is a static document with a tiny runnable prototype. It has no
prompt boundary, no sandbox, no policy lattice firing per request. The
real audit gap the install closes is bringing the existing DEC ledger
into the cross-repo `decision.schema.json` shape and wiring the
schemas-cache to athena-site. Voice_lint and check_no_bom already run;
adding two validator scripts and a freshness gate earns its weight,
adding a specs ledger and a Run emitter does not.

## run boundary

The PRD does not emit Runs. A Run is a single invocation of a coding or
reasoning surface with a prompt_snapshot_hash, a sandbox_image_ref, a
policy lattice, and a gate_results_summary. None of those apply to a
markdown edit. The Vite prototype under `src/` builds and tests, but it
does not produce evidence records that would map to the Run schema; if
the prototype ever ships a deployed surface that talks to a model, this
DEC is the place to amend.

## evidence

- The cross-repo charter at
  `https://raw.githubusercontent.com/AthenaTheOwl/athena-site/main/ops/control-plane.md`.
- The `decision.schema.json` source of truth at
  `https://raw.githubusercontent.com/AthenaTheOwl/athena-site/main/ops/schemas/decision.schema.json`.
- `../procurement-negotiation-lab/decisions/DEC-CDCP-001-install-cdcp-governance.md`
  — the worked install pattern from the sibling product repo.
- `./README.md` — the PRD's entry surface.
- `./04-product-requirements.md` — the document whose requirements the
  DEC ledger resolves.

## coverage

This DEC introduces one new requirement ID for the install itself:

- `R-PRD-004-1` — the markdown-only PRD repo runs the CDCP base-layer
  gates (schema-cache-freshness, voice-lint, check-no-bom,
  validate-decisions) on every push to main.

## rollback

Delete `ops/schemas-cache/`, delete the two new validator scripts, drop
the two new gate steps from the CI workflow, revert the front-matter on
DEC-PRD-001 through DEC-PRD-003 to the prior four-key shape, and delete
this file. The PRD content, the prototype, and the prior CI gates stay
untouched.

## follow-on

A future pass can move the install-depth from `minimum_static_grid` to
`static_grid_plus_validators` by adding `specs/0001-prd/` and a static
manifest hash. A further pass can move to `full_run_evidence` if the
prototype gains a deployed inference surface that earns Run records.
Both follow-ons land via DEC amendments to this record.
