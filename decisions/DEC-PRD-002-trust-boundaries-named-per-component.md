---
id: DEC-PRD-002-trust-boundaries-named-per-component
date: 2026-05-24
status: approved
reversible: true
---

## decision

Every component in the system architecture names its own trust boundary.
Event sources name data provenance. Ingestion and context builder name
access control plus citation. The agent loop names recommendation versus
execution. Human review names accountability. The action layer names
deterministic policy checks.

## alternatives

- One overall trust statement in a security section — rejected_because
  AI products fail at component seams, not at a single perimeter.
- A separate security appendix — rejected_because reviewers read the
  architecture section and stop there; the boundary needs to live where
  the component is described.
- No explicit trust boundaries, relying on infrastructure controls —
  rejected_because the eval and refusal contract in §6 cannot reference
  boundaries that the architecture never named.

## rationale

Trust boundaries are where AI products fail. A retrieval layer that
ignores permissions, an agent loop that calls a write API, or an action
layer that accepts unsigned proposals each produces a different failure
mode with different mitigation. Naming the boundary per component forces
the PRD to say what each piece is allowed to do and what evidence makes
the boundary inspectable.

This is also what makes the no-auto-execute decision in DEC-PRD-003
implementable: without an explicit recommendation-versus-execution
boundary in the agent loop, there is no place to put the human-approval
gate.

## evidence

- [05-system-architecture.md](../05-system-architecture.md) — each
  component subsection ends with a trust-boundary statement.
- [06-eval-and-trust-model.md](../06-eval-and-trust-model.md) — autonomy
  boundaries section references the boundaries set in §5.

## rollback

To reverse, collapse the per-component boundaries into a single security
section. That would require rewriting the autonomy boundaries section in
§6, because the refusal contract and action-gate enforcement depend on
component-level trust statements.
