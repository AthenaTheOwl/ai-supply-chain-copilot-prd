# 09 - Build Plan

This section turns the PRD into an implementation path while keeping this repo
markdown-only. The build should reuse four portfolio blocks:
`supplier-risk-rag-agent` for retrieval, citation checks, refusals, and eval
suites; `chip-supply-chain-map` for dependency graph modeling and scenario
scoring; `procurement-negotiation-lab` for recovery-option comparison and
supplier-negotiation simulation; and `ai-field-brief` / CDCP for specs,
decisions, gates, agent contracts, policies, event logs, and release ledgers.

## Component reuse map

| PRD capability | Starting repo | Reused component | Target adaptation | Trust boundary |
| --- | --- | --- | --- | --- |
| Context retrieval | `supplier-risk-rag-agent` | Hybrid retrieval, chunk manifest, citation verifier, refusal contract, four-suite eval runner | Replace SEC filing chunks with approved ERP, TMS, contract, supplier scorecard, quality, email, and customer-commitment records | Retrieval may read only records allowed by the user's role and source policy. |
| Citation enforcement | `supplier-risk-rag-agent` | Post-generation span verification and refusal-on-bad-citation behavior | Verify date, quantity, supplier promise, customer impact, cost, and contract claims against retrieved records | Unsupported claims become refusals or missing-data requests. |
| Supplier risk context | `supplier-risk-rag-agent` | Supplier-risk question taxonomy and held-out eval cases | Convert supplier-risk filings questions into exception-management cases by supplier, part, lane, and customer | Risk labels inform ranking; supplier actions still require approval. |
| Dependency graph | `chip-supply-chain-map` | Node/edge data model, scenario reducer, source IDs, chokepoint score discipline | Model suppliers, parts, sites, lanes, customers, alternates, and constrained resources as graph nodes and dependencies | Graph scores inform triage and evidence; escalation still requires review. |
| Scenario analysis | `chip-supply-chain-map` | Scenario toggles and multiplier pattern | Add exception scenarios: late supplier, carrier hold, quality hold, demand pull-in, alternate-supply delay, and premium-freight option | Scenario output must show assumptions and source IDs. |
| Recovery comparison | `procurement-negotiation-lab` | Centralized-oracle baseline, local strategy comparison, residuals, risk scores, cost-benefit transfer framing | Compare wait, expedite, split ship, substitute, alternate buy, build resequence, and escalation options | The engine ranks options; the human chooses the action. |
| Supplier negotiation posture | `procurement-negotiation-lab` | Negotiated-commitment simulator and consequence-before-math flow | Draft supplier asks with commercial context, expected concession, due time, and fallback | Drafts stay unsent until a named approver sends them. |
| Delivery control | `ai-field-brief` / CDCP | Spec ledgers, DEC format, voice lint, role/tool/policy registries, event log, release ledger | Track each build slice with a spec, acceptance, decision records, proof refs, and release entry | Governance artifacts define what agents may change and what humans approve. |

## Phase 0 - Control-plane extraction

Start by importing the compact CDCP shape. The target build needs a spec ledger,
a decision log, proof refs, an event log, and the existing voice-lint rule set.
`ai-field-brief` is the reference because it shows source registry contracts,
public markdown gates, and release-ledger discipline while this PRD repo remains
markdown-only.

Exit gate: one product spec names the alpha workflow, one DEC confirms the
reuse map in this section, and the gate list includes spec check, voice lint,
decision validation, unit tests, eval runner, and browser workflow proof for the
future app repo.

Trust boundary: CDCP governs delivery artifacts and agent permissions.
Supplier-data access and operational actions require separate product policies
and human approvals.

## Phase 1 - Synthetic exception spine

Build the first app repo around a fixture corpus before connecting live systems.
Use the current PRD examples as seed cases, then add synthetic records for
purchase orders, shipment milestones, supplier promises, contract clauses,
inventory position, quality holds, customer commitments, and prior resolutions.
Every fixture needs a stable source ID, timestamp, owner, permission tag, and
freshness field.

Dependencies: CDCP spec and decision records from Phase 0; source-shape lessons
from `ai-field-brief`; retrieval manifest patterns from
`supplier-risk-rag-agent`.

Exit gate: at least 30 synthetic exceptions cover supplier delay, carrier delay,
quality hold, forecast pull-in, alternate-source delay, and ambiguous multi-cause
cases. Each exception has a gold evidence set and a senior-planner expected
action label.

Trust boundary: fixtures are synthetic and may be broad. Live connectors use
separate least-privilege production permissions.

## Phase 2 - Retrieval, citations, and refusal

Fork the retrieval discipline from `supplier-risk-rag-agent` before adding any
agent loop. The first usable slice should accept an exception record, retrieve
the gold evidence bundle, answer only with cited claims, and refuse when a
required source class is missing. The answerer should convert citation-verifier
failure into a refusal.

Dependencies: Phase 1 corpus; role permission tags; source ID format; refusal
cases.

Eval gate: retrieval recall@10 >= 0.90 for critical evidence, citation
faithfulness >= 0.95 on high-impact claims, refusal precision >= 0.85 on
withheld-evidence cases, and zero permission leaks in seeded access tests.

Trust boundary: retrieval can search approved records and return cited context.
Missing contract terms, restricted records, and action preparation stay outside
retrieval.

## Phase 3 - Dependency graph and scenario risk

Adapt `chip-supply-chain-map` after retrieval is stable. The graph should model
the exception environment: supplier, part family, consuming site, transport
lane, alternate supplier, customer commitment, constrained resource, and policy
node. Scenario toggles should adjust risk scores from explicit assumptions, such
as carrier hold duration, alternate lead time, quality-release delay, or demand
pull-in size.

Dependencies: Phase 1 fixture records; source IDs; retrieval citations; graph
data contracts from `chip-supply-chain-map`.

Eval gate: graph construction maps every fixture exception to the expected node
set; scenario toggles produce deterministic score changes; every displayed score
links back to source IDs and assumptions.

Trust boundary: graph risk can prioritize queue order and explain chokepoints.
Score-driven escalation requires the recommendation and human review layers.

## Phase 4 - Recommendation and recovery comparison

Use `procurement-negotiation-lab` as the pattern for comparing actions before
writing supplier-facing text. The recovery engine should score wait, expedite,
split shipment, substitute, alternate buy, build resequence, supplier
escalation, and leadership escalation. Each option needs expected time impact,
cost impact when known, constraint assumptions, required approver, reversibility,
and citation set.

Dependencies: Phase 2 cited context; Phase 3 graph score; utility and risk-score
patterns from `procurement-negotiation-lab`.

Eval gate: senior planners rate at least 70 percent of benchmark
recommendations correct, at least 90 percent correct or acceptable with edits,
and less than 2 percent unsafe. False-confidence rate stays below 5 percent.

Trust boundary: the recommendation layer can rank options and draft. Sending,
committing, cost approval, customer-promise changes, and exception closure stay
in human and action layers.

## Phase 5 - Human review and action receipts

Build the workflow screen around approval, rejection, edit, and reason capture.
Priya can approve or edit supplier drafts. Marcus can approve supplier posture
and commercial escalation. Dana can approve premium cost or leadership packets.
Every approval produces an action request with approver, timestamp, draft
version, citations, and policy checks.

Dependencies: Phase 4 action proposals; CDCP event-log pattern; audit-trail
requirements from sections 4 through 6.

Eval gate: integration tests prove supplier email send, ERP proposal commit,
leadership escalation, customer-impact statement, and premium-cost approval all
require a named human approval token. Tests also prove rejected recommendations
capture reason codes.

Trust boundary: human review is where accountability moves from model output to
named operator decision. The action layer accepts only approved structured
requests.

## Phase 6 - Alpha slice

The alpha slice should cover one planner team, one product family, one supplier,
one transport lane, and read-only production context. Ship these P0 surfaces:
exception queue, cited triage brief, root-cause hypotheses, recovery-option
comparison, supplier draft, rejection reason, and audit trail. Keep ERP writes
as staged proposals.

Dependencies: Phases 0 through 5; production read connector review; access
policy review; planner training.

Launch gate: 50 percent triage-time reduction on covered exceptions, zero
permission violations, zero auto-send incidents, false-confidence rate <= 5
percent, citation faithfulness >= 0.95 on high-impact claims, and weekly planner
review of misses.

Trust boundary: alpha may read production context after approval. External and
system-of-record actions still require human approval.

## Human approval model

The build should use a single approval token shape across all actions:
`action_type`, `exception_id`, `approver_id`, `approver_role`, `draft_version`,
`evidence_refs`, `policy_checks`, `expires_at`, and `receipt_id`. The action
layer rejects requests with missing evidence refs, expired approvals, role
mismatch, stale exception state, or policy failure.

Approval remains required for supplier email send, ERP write, supplier
corrective-action request, premium-cost approval, leadership escalation,
customer-impact statement, and exception closure. The model may draft each item
and may explain missing context. Only the workflow service can mint the approval
token.

## Dependency order

1. CDCP delivery records and source contracts.
2. Synthetic corpus with gold evidence.
3. Retrieval, citation verification, and refusal.
4. Graph risk and scenario scoring.
5. Recovery comparison and recommendation ranking.
6. Human review and action receipts.
7. Read-only alpha connector and launch gates.

Skipping the order creates avoidable trust debt. Recommendation gates require
retrieval gates first. Graph scores require citations for audit. Approval
screens require action receipts for after-action review.

## Deferred work

Direct ERP commits, live supplier portal writes, multi-region data residency,
learned reranking, and automated source ingestion should wait until beta or
later. The alpha value comes from cited triage, better queue priority, bounded
recommendations, safer drafts, and clean audit receipts.
