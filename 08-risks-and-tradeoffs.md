# 08 - Risks And Tradeoffs

The product sits inside high-consequence operations. The right posture is not
"move fast and automate." It is "move faster where evidence is strong, slow down
where evidence is weak, and make every recommendation inspectable." The six
risks below should be reviewed before alpha and again at every launch gate.

| Risk | Likelihood | Impact | Mitigation | Residual risk |
| --- | --- | --- | --- | --- |
| Hallucinated recommendations | High | High | Grounding, citation enforcement, refusal behavior, human approval gates, weekly false-confidence review | The model may still assemble a plausible but wrong narrative from incomplete context. |
| Supplier data leakage | Medium | High | Role-based access, source-level permissions, data residency controls, redaction, audit logs | Misconfigured connectors or overly broad document permissions can expose sensitive terms. |
| Over-reliance and skill atrophy | Medium | Medium | Planner training, required rationale review, copilot-off days, manual drills for critical workflows | Planners may still defer to the system during high-pressure incidents. |
| ERP integration brittleness | High | Medium | Dual-read validation, staged proposals, reconciliation checks, connector health monitoring | Legacy ERP behavior can drift and create stale or partial views. |
| Regulatory exposure | Medium | High | Export-control tagging, privacy review, regional retention policies, restricted retrieval scopes | Edge cases can cross regions, customers, or controlled-part categories unexpectedly. |
| Adoption failure | Medium | High | Planner-led design, workflow-native UI, measurable time savings, override capture, phased launch | If the tool feels like surveillance or extra documentation, planners will route around it. |

## Hallucinated recommendations

This is the primary product risk. The dangerous failure is not an obviously bad
answer. It is a confident recommendation that sounds operationally reasonable
but misses a key contract clause, stale promise date, or customer commitment.
Mitigation starts with retrieval: the system must know when important source
classes are absent. It continues with citation enforcement and refusal behavior.
Most importantly, the product must avoid direct execution. A hallucinated draft
is recoverable if a planner reviews it. A hallucinated sent email or ERP commit
is an incident.

## Supplier data leakage

Supplier terms, pricing, capacity, quality performance, and corrective-action
history are sensitive. A copilot that retrieves across supplier records without
strict permissions can leak one supplier's commercial terms into another
supplier discussion or expose customer commitments to the wrong audience. The
tradeoff is retrieval breadth versus data minimization. The product should bias
toward scoped retrieval and let users request access through existing controls.
This may make some answers less complete, but it prevents a trust failure that
would stop adoption entirely.

## Over-reliance and skill atrophy

If the copilot becomes the default narrator of every exception, planners may
stop building the diagnostic muscle needed for unusual cases. The mitigation is
deliberate practice. Critical teams should run periodic copilot-off days,
compare human triage against copilot triage, and require planners to review
evidence before approval. The product should also explain uncertainty rather
than hide it behind a clean answer.

## ERP integration brittleness

ERP integrations are rarely elegant. Field semantics differ by site, connector
latency can hide current status, and write APIs may enforce rules that the
copilot cannot infer. The architecture should use dual-read validation where
possible, compare staged proposals against current ERP state before approval,
and monitor connector freshness. The tradeoff is slower write expansion, but
that is acceptable because alpha value comes from better triage and drafts.

## Regulatory exposure

Supply chains can involve export-controlled parts, customer data, supplier
confidentiality, and regional privacy rules. The copilot should treat regulatory
scope as metadata, not a policy document someone reads after launch. Retrieval
must filter controlled records, logs must respect retention requirements, and
cross-region model processing must be reviewed before data flows. The residual
risk is that exception context is messy and can combine data classes in
unexpected ways.

## Adoption failure

The product can be technically correct and still fail if planners perceive it
as extra work, management surveillance, or another system to maintain. Adoption
depends on proving time savings in the first week, keeping outputs short enough
for real operations, and using planner override feedback visibly. The tradeoff
is that some enterprise features should wait. A smaller workflow that planners
trust beats a broad AI surface they ignore.

The overall product tradeoff is controlled autonomy. The copilot should be
ambitious about reading, synthesis, and drafting, but conservative about action.
That is the path to speed without pretending the model owns the operating
decision.
