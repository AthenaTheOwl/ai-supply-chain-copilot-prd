# 01 - The Problem

At 2:07 a.m., Priya gets paged because a tier-2 supplier missed a delivery for
a constrained controller board. The tier-1 contract manufacturer can still build
for another thirty-six hours, but a customer shipment is due in seven days and
the alternate supplier is quoting a five-day expedite at 1.4x unit cost. Priya
opens the ERP shortage list, the purchase order history, the transportation
portal, a supplier scorecard, an email thread from sourcing, a customer
commitment tracker, and the last weekly risk review. She now has fourteen tabs
and no synthesis. The question in front of her is not "what does the data say?"
It is "which data matters enough to act on before the morning standup?"

This is the normal failure mode of exception management. Planning systems are
good at representing plans, constraints, and transactions, but exceptions cross
system boundaries. A late shipment is also a supplier reliability question, a
contract question, a logistics question, a customer-commitment question, and a
cost-to-serve question. The planner is asked to connect those contexts under
time pressure, often while the best evidence is buried in stale notes or
semi-structured email. In a realistic high-mix manufacturing environment, one
planner may triage 40 to 70 exception items per day, with only a small fraction
needing true escalation. The painful part is that the system rarely tells the
planner which few exceptions are the dangerous ones.

Industry data supports the urgency. McKinsey reports that material disruptions
lasting a month or longer occur every 3.7 years on average and that companies
can lose almost 45 percent of one year's profits over a decade from supply-chain
disruptions.[^mckinsey-risk] McKinsey's 2024 supply-chain leader survey also
found that comprehensive tier-one supplier visibility reached only 60 percent,
and that once a disruption occurs, companies take about two weeks on average to
plan and execute a response.[^mckinsey-2024] Gartner has separately argued that
scenario planning and data visibility are still immature: in a 2024 survey, only
19 percent of organizations fully integrated scenario planning into supply-chain
strategy.[^gartner-2025] Gartner's 2024 event-driven decision-making benchmark
is sharper: only 9 percent of supply chains had the technology framework needed
to support event-driven decision making.[^gartner-2024] ASCM's SCOR model
frames performance around reliability, responsiveness, agility, cost, assets,
and other attributes, which is useful because exception management is exactly
where those attributes collide.[^ascm-scor]

The practical cost is not only delay. A missed escalation can create premium
freight, missed revenue, line-down exposure, customer penalty risk, and supplier
relationship damage. A false escalation is also expensive: it burns leadership
attention, pressures suppliers without evidence, and can cause teams to expedite
against the wrong constraint. Incomplete information is the default. The planner
may know the promised dock date but not the contract clause that changes
expedite ownership. The sourcing lead may know the supplier has had quality
escapes but not that this delay is a customs hold. The ops director may know the
customer commitment but not the cost of the alternate buy.

The problem statement: supply-chain exception teams need a trusted workflow
layer that can ingest operational signals, retrieve the relevant context,
explain the likely root cause, recommend a bounded next action, and preserve a
human approval gate before any external or system-of-record action. The product
is not a chatbot. It is a decision-support copilot for high-consequence,
time-sensitive exception work.

[^mckinsey-risk]: McKinsey Global Institute, ["Risk, resilience, and rebalancing in global value chains"](https://www.mckinsey.com/capabilities/operations/our-insights/risk-resilience-and-rebalancing-in-global-value-chains).
[^mckinsey-2024]: McKinsey, ["McKinsey Global Supply Chain Leader Survey 2024"](https://www.mckinsey.com/capabilities/operations/our-insights/supply-chain-risk-survey-2024).
[^gartner-2025]: Gartner, ["Supply Chain Leaders Should Prioritize Advanced Data Visibility and Scenario Planning"](https://www.gartner.com/en/newsroom/press-releases/2025-05-19-gartner-says-supply-chain-leaders-should-prioritize-advanced-data-visibility-and-scenario-planning-to-drive-competitive-advantage-amid-global-uncertainty).
[^gartner-2024]: Gartner, ["Highlights from Gartner Supply Chain Symposium/Xpo 2024"](https://www.gartner.com/en/articles/highlights-from-gartner-supply-chain-symposium-xpo-2024).
[^ascm-scor]: ASCM, ["SCOR Digital Standard, Version 14.0"](https://scor.ascm.org/api/files/24?v=1707513273348).
