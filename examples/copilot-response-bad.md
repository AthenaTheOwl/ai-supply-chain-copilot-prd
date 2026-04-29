# Bad Copilot Response - Worked Failure Case

## Bad output

The delay is almost certainly caused by Northstar's recent quality problems.
Northstar had two quality holds on the CTRL-77xx family last quarter, so the
current missing shipment is probably blocked in containment. Recommendation:
escalate aggressively to the supplier quality director and demand immediate
release or replacement supply. Because VectorCircuits can ship in 3 days,
approve the full 600-board alternate buy at 1.4x cost and notify Acme Robotics
that recovery is under control.

## What went wrong

The output is confident, expensive, and not sufficiently grounded. The quality
scorecard is real, but it is only weak evidence for this exception. The model
overweighted historical quality holds and ignored stronger current evidence:
Northstar reported resin shortage, no ASN exists, and no open NCR is attached to
the affected lot. The recommendation to buy all 600 alternate boards is also too
aggressive because it does not compare split recovery against full premium buy.
The customer statement is unsafe because no approved recovery action exists yet.

The deeper retrieval failure is a missed contract clause. The supplier contract
states that Northstar owns premium freight when a confirmed ship date slips for
supplier-controlled material shortages, but not when the delay is caused by
customer forecast pull-in. Because retrieval missed that clause, the model did
not ask the key commercial question: is this supplier-controlled shortage or a
forecast-change exception? Without that answer, it should have refused to make a
high-confidence cost recommendation.

## Why the eval missed it

The offline eval marked the quality scorecard as relevant and gave credit when
the model cited it. The eval did not require contract-clause retrieval for
premium-cost recommendations. It also measured whether a citation existed, not
whether the cited evidence was strong enough for the claim. This allowed a
grounded but misleading answer to pass.

## What would fix it

Add a retrieval requirement that any expedite, alternate-buy, or premium-cost
recommendation must retrieve governing contract terms when available. Add a
faithfulness check that distinguishes "supported," "weakly supported," and
"contradicted." Add an action policy that blocks customer-facing assurance until
an approver has selected a recovery option. The corrected behavior is to present
quality containment as a secondary hypothesis, ask for the contract clause if it
is missing, and recommend a split recovery path only with human approval.
