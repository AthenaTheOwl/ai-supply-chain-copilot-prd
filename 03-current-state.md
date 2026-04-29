# 03 - Current State Of Tooling

Most supply-chain organizations already have serious tooling. SAP Integrated
Business Planning centralizes demand, supply, inventory, sales and operations,
and response planning on a planning platform.[^sap-ibp] Oracle Fusion Cloud SCM
offers demand management, supply planning, replenishment planning, S&OP, and
analytics across the broader SCM suite.[^oracle-scp] o9 positions its Digital
Brain as a platform for connected planning and decision making.[^o9] Kinaxis
Maestro is known for concurrent planning across demand, supply, inventory, and
execution scenarios.[^kinaxis] Blue Yonder provides demand and supply planning
that
connects forecast, inventory, capacity, and logistics constraints.[^blueyonder]
Many teams also rely on Excel, SharePoint trackers, email, chat, and weekly
operations-review decks. These tools are not weak. They solve important
problems in planning, optimization, EDI connectivity, transaction management,
forecasting, allocation, and reporting.

The issue is that exception management is a different product problem. Planning
systems are built around plans and transactions. A late shipment exception is a
live investigation. The planner needs to know what changed, why it changed, what
is at risk, which levers are available, and what can be done without creating a
larger downstream problem. Existing systems often expose the raw materials for
that answer, but they rarely assemble a cited narrative. They also assume the
operator knows which screen, report, view, transaction, or workbook contains the
next clue. In SAP-centered environments, for example, the planner often needs to
know which ERP or IBP view to inspect before the system can help. The copilot
should infer likely context from the exception itself.

The current state has five consistent gaps.

First, there is no reliable synthesis across systems. ERP knows the purchase
order and material master. TMS knows carrier milestones. Supplier portals know
promise dates. Contract repositories know liability and expedite terms. Quality
systems know supplier escapes. Customer-commitment trackers know what is at
risk. A planner can read all of this manually, but the exception workflow rarely
produces one answer with source-level grounding.

Second, the tooling does not provide narrative explanation. Dashboards show
alerts, red cells, and variance from plan. They do not usually say, "This is
probably a supplier capacity miss, not a transportation delay, because the ASN
was never created and the supplier's last three commitments slipped." A planner
needs that narrative to decide whether to wait, expedite, substitute, or
escalate.

Third, recommendations are often disconnected from rationale. Optimization
engines can propose allocations or supply plans, but exception operators need
bounded operational actions with explicit tradeoffs: approve premium freight,
pull from alternate supplier, split shipment, adjust build sequence, or escalate
to sourcing. The recommendation should include why the action is appropriate,
which constraints it depends on, and what evidence would change the answer.

Fourth, the learning loop is thin. Overrides, false escalations, supplier
recovery outcomes, and after-action findings are usually buried in meetings or
comments. That means the next similar exception starts from scratch. A useful AI
copilot should treat planner overrides as labeled data: "recommendation was
directionally right but too aggressive," "contract clause missing," or "carrier
delay, not supplier miss."

Fifth, trust boundaries are not explicit enough. AI features in planning suites
can be useful, but exception management has high relational and financial risk.
The system should not send supplier communications, commit ERP writes, or
escalate to leadership merely because a model generated a confident answer. The
better target is a workflow copilot: read broadly, synthesize clearly, recommend
narrowly, draft safely, and require humans for consequential actions.

The market is moving toward AI-assisted planning, but the product opening is
more specific than "add chat to SCM." The winning product will make exception
decisions faster and safer by being grounded in the enterprise context, tuned to
planner workflows, and honest about what it does not know.

[^sap-ibp]: SAP, ["Integrated Business Planning for Supply Chain"](https://learning.sap.com/products/supply-chain-management/integrated-business-planning).
[^oracle-scp]: Oracle, ["Supply Chain Planning"](https://www.oracle.com/scm/supply-chain-planning/).
[^o9]: o9 Solutions, ["Supply Chain Master Planning"](https://o9solutions.com/solutions/supply-chain-master-planning/).
[^kinaxis]: Kinaxis, ["Supply Chain Planning Applications"](https://www.kinaxis.com/en/concurrent-planning/master-production-scheduling).
[^blueyonder]: Blue Yonder, ["Supply Planning Software"](https://blueyonder.com/solutions/supply-chain-planning/supply-planning).
