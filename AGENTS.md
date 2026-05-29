# Agent instructions

This repo is a markdown-only PRD for an AI supply-chain exception copilot,
with a tiny runnable Vite prototype under `src/`. The artifact is the
judgment: who the user is, what the workflow looks like, what the trust
boundaries are, what success means.

## Role

This repo is the **product.prd-curator** surface in the portfolio. It
holds one PRD (`01-problem.md` through `09-build-plan.md`), the
PRD-craft DEC ledger under `decisions/`, three example fixtures under
`examples/`, three SVG diagrams under `diagrams/`, and a static Vite
React prototype under `src/`.

## CDCP install-depth

This repo runs at install-depth `minimum_static_grid`. That choice is
recorded in [DEC-PRD-004](./decisions/DEC-PRD-004-install-cdcp-governance.md).
What this means concretely:

- the cross-repo schemas live under `ops/schemas-cache/` and are kept
  in sync with `athena-site/ops/schemas/` via
  `scripts/check_schema_cache_freshness.py`
- the decision ledger validates against the cross-repo
  `decision.schema.json` via `scripts/validate_decisions.py`
- this repo does **not** emit Run records, does **not** carry a
  `specs/` ledger, and does **not** install an operating-model layer
  (roles, tools, policies, state machines, workflows)
- if the PRD's prototype ever ships a deployed inference surface, the
  install-depth can rise via a DEC amendment to DEC-PRD-004

The upstream contracts are DEC-CDCP-011 through DEC-CDCP-015 in
athena-site. This repo defers the heavier layers because a static
document does not have a prompt, a sandbox, or a per-request policy
lattice to gate.

## Gates

The CI workflow at `.github/workflows/run-evidence-gates.yml` runs the
universal CDCP gates that apply to a static document:

- `scripts/check_schema_cache_freshness.py` — cached schemas match
  athena-site
- `scripts/voice_lint.py` — banlist hard-FAIL on PRD copy and DECs
- `scripts/check_no_bom.py` — no UTF-8 BOM anywhere
- `scripts/validate_decisions.py` — every DEC validates against
  `decision.schema.json`

Plus the prior repo gates that stay in place:

- `npm ci && npm run build` — Vite prototype builds
- `npm test` — Vitest smoke for the exception workbench

Run the Python gates locally before commit:

```powershell
python scripts/check_schema_cache_freshness.py
python scripts/voice_lint.py
python scripts/check_no_bom.py
python scripts/validate_decisions.py
```

## Conventions

- DEC files live under `decisions/`, follow the front-matter shape in
  `ops/schemas-cache/decision.schema.json`, and have IDs of the form
  `DEC-PRD-NNN-<slug>`. The body sections (`## decision`,
  `## alternatives`, `## rationale`, `## evidence`, `## rollback`)
  mirror the front-matter for human reading.
- The PRD copy under the numbered markdown sections is the load-bearing
  artifact. Do not change it as part of governance work; governance
  changes land under `ops/`, `scripts/`, `decisions/`, and
  `.github/workflows/`.
- Voice_lint is hard-FAIL on the banlist. Use per-line
  `voice_lint:allow <label>` only when the phrase carries technical
  meaning the rule cannot distinguish.

## Cross-repo links

- Charter: `athena-site/ops/control-plane.md`
- Schemas source of truth: `athena-site/ops/schemas/`
- Sibling install pattern (full operating-model layer):
  `procurement-negotiation-lab/decisions/DEC-CDCP-001-install-cdcp-governance.md`
- Sibling install pattern (base layer only):
  `ai-field-brief/decisions/DEC-CDCP-001-install-cdcp-governance.md`

## Out of scope for this repo

- Run emitters, replay commands, sandbox image refs
- A `specs/NNNN-*/` six-file ledger
- Role contracts, tool registries, policy YAMLs, state machines,
  workflow YAMLs

Each of those lives behind a follow-on DEC if the PRD's automation grows.
