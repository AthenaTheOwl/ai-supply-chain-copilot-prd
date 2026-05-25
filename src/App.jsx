import { useMemo, useState } from "react";

const exceptions = [
  {
    id: "EXC-2026-0417-2281",
    type: "Late part",
    title: "CTRL-7782 controller boards missed ship commit",
    supplier: "Northstar Micro Assemblies",
    part: "CTRL-7782",
    site: "Austin final assembly",
    severity: "High",
    status: "SLA risk in 36h",
    owner: "Priya, planner",
    impact: "Acme Robotics launch allocation, 1,200 units due in 7 days.",
    summary:
      "Northstar moved the promised ship date out by five days. No ASN or pickup milestone exists, and Orion EMS has 36 hours of buffer before the affected build stops.",
    evidence: [
      {
        id: "SP-88914",
        source: "Supplier portal",
        snippet:
          "Northstar revised the ship date for 600 CTRL-7782 boards five days past the committed date and cited resin shortage.",
        freshness: "18 min old",
      },
      {
        id: "INV-AUS-0429",
        source: "ERP inventory snapshot",
        snippet:
          "Orion EMS has 36 hours of buffer stock before the SMT line stops building the affected configuration.",
        freshness: "11 min old",
      },
      {
        id: "TMS-45192",
        source: "TMS lane record",
        snippet:
          "No ASN, pickup milestone, or carrier handoff is attached to the missing lot.",
        freshness: "24 min old",
      },
      {
        id: "VCQ-2041",
        source: "Alternate supplier quote",
        snippet:
          "VectorCircuits can ship 600 boards in 3 days at 1.4x standard cost with sourcing approval.",
        freshness: "1h old",
      },
    ],
    action: {
      label: "Split recovery path",
      copy:
        "Ask Northstar for a same-day recovery plan and reserve 300 boards from VectorCircuits pending sourcing approval.",
      approver: "Marcus, sourcing lead",
      externalAction: "supplier email draft and alternate-buy reservation",
      impact: "Protects the Acme allocation while limiting premium-cost exposure.",
      refs: ["SP-88914", "INV-AUS-0429", "VCQ-2041"],
    },
    gates: [
      ["Citation coverage", "pass", "4 cited sources cover date, buffer, lane, and alternate quote."],
      ["Approval token", "blocked", "No supplier email or buy reservation can execute before Marcus approves."],
      ["ERP write", "blocked", "ERP change remains a staged proposal only."],
      ["Customer statement", "blocked", "No customer assurance is allowed until recovery is approved."],
    ],
  },
  {
    id: "EXC-2026-0520-0149",
    type: "Supplier risk signal",
    title: "Capacitor supplier scorecard crossed risk threshold",
    supplier: "Luma Passive Components",
    part: "CAP-22UF-900",
    site: "Monterrey controls cell",
    severity: "Medium",
    status: "Pattern risk",
    owner: "Marcus, sourcing lead",
    impact: "Three open purchase orders support two customer programs inside 14 days.",
    summary:
      "The supplier has three late commits in two weeks and a new quality alert on the same part family. Current stock covers planned builds for six days.",
    evidence: [
      {
        id: "SQ-LUMA-W20",
        source: "Supplier scorecard",
        snippet:
          "On-time delivery dropped from 94% to 71% across the last four reporting periods.",
        freshness: "2h old",
      },
      {
        id: "QA-778C",
        source: "Quality alert",
        snippet:
          "Incoming inspection opened a containment alert for CAP-22UF family dimensional variance.",
        freshness: "5h old",
      },
      {
        id: "ERP-MTY-614",
        source: "ERP shortage view",
        snippet:
          "Current inventory covers six days of controls-cell demand with no approved alternate on file.",
        freshness: "30 min old",
      },
    ],
    action: {
      label: "Escalate supplier posture",
      copy:
        "Open a sourcing review, ask for Luma's recovery owner, and require quality disposition before approving more pull-ins.",
      approver: "Marcus, sourcing lead",
      externalAction: "supplier corrective-action request",
      impact: "Separates recurring supplier risk from a single late purchase order.",
      refs: ["SQ-LUMA-W20", "QA-778C", "ERP-MTY-614"],
    },
    gates: [
      ["Citation coverage", "pass", "Risk, quality, and inventory claims each have source IDs."],
      ["Permission scope", "pass", "Commercial terms are not shown in planner view."],
      ["Approval token", "blocked", "Corrective-action request needs sourcing approval."],
      ["False-confidence check", "review", "Current evidence supports risk posture, not supplier fault for every late line."],
    ],
  },
  {
    id: "EXC-2026-0522-0873",
    type: "Tariff / regulatory change",
    title: "New tariff code review affects motor driver imports",
    supplier: "Harbor Gate Electronics",
    part: "DRV-40A-M2",
    site: "Reno pack-out",
    severity: "High",
    status: "Policy hold",
    owner: "Dana, ops director",
    impact: "Premium freight decision may cross the customer margin threshold.",
    summary:
      "A new customs classification review is holding two inbound lots. The landed-cost delta is not approved, and the customer promise should not be revised from current evidence.",
    evidence: [
      {
        id: "CUS-1170",
        source: "Customs broker note",
        snippet:
          "DRV-40A-M2 lots are pending tariff-code review before release to domestic carrier.",
        freshness: "45 min old",
      },
      {
        id: "POL-EXP-14",
        source: "Trade compliance policy",
        snippet:
          "Controlled tariff changes require compliance approval before supplier or customer commitments change.",
        freshness: "current",
      },
      {
        id: "FIN-REN-220",
        source: "Cost exposure worksheet",
        snippet:
          "Premium freight plus tariff delta may exceed the launch program margin threshold.",
        freshness: "1h old",
      },
    ],
    action: {
      label: "Hold external commitment",
      copy:
        "Route the case to trade compliance and finance before any supplier demand or customer impact statement leaves the workflow.",
      approver: "Dana, ops director",
      externalAction: "leadership escalation packet",
      impact: "Avoids an unsupported customer promise while the cost and compliance facts are incomplete.",
      refs: ["CUS-1170", "POL-EXP-14", "FIN-REN-220"],
    },
    gates: [
      ["Citation coverage", "pass", "Policy, customs, and cost claims are cited."],
      ["Compliance gate", "blocked", "Trade compliance approval is missing."],
      ["Customer statement", "blocked", "Customer-facing change requires Dana approval."],
      ["Recommendation confidence", "review", "Action is a safe hold, not a recovery promise."],
    ],
  },
  {
    id: "EXC-2026-0524-3308",
    type: "Allocation shortage",
    title: "Shared MCU allocation no longer covers both programs",
    supplier: "VectorSilicon",
    part: "MCU-VS9",
    site: "Austin and Juarez assembly",
    severity: "Critical",
    status: "Allocation conflict",
    owner: "Priya, planner",
    impact: "Two customer builds compete for 4,800 constrained units this week.",
    summary:
      "The supplier allocation file shows 4,800 units available against 6,200 units of demand. One customer has a penalty window inside five days.",
    evidence: [
      {
        id: "ALLOC-VS9-W22",
        source: "Supplier allocation file",
        snippet:
          "Week 22 confirmed allocation is 4,800 MCU-VS9 units across both programs.",
        freshness: "20 min old",
      },
      {
        id: "DEM-JZ-775",
        source: "Demand plan",
        snippet:
          "Combined Austin and Juarez demand is 6,200 units before Friday close.",
        freshness: "35 min old",
      },
      {
        id: "CCT-BETA-44",
        source: "Customer commitment tracker",
        snippet:
          "BetaRail penalty window starts in five days if the committed release is missed.",
        freshness: "50 min old",
      },
    ],
    action: {
      label: "Prepare allocation decision",
      copy:
        "Stage a director packet comparing penalty exposure, build resequence, and partial shipment options before changing allocations.",
      approver: "Dana, ops director",
      externalAction: "allocation change proposal",
      impact: "Makes the tradeoff explicit before the system of record changes.",
      refs: ["ALLOC-VS9-W22", "DEM-JZ-775", "CCT-BETA-44"],
    },
    gates: [
      ["Citation coverage", "pass", "Supply, demand, and customer penalty facts are cited."],
      ["ERP write", "blocked", "Allocation change is staged and cannot commit automatically."],
      ["Approver role", "blocked", "Director approval is required for customer-impact tradeoffs."],
      ["Audit receipt", "review", "Decision packet needs override reason if recommendation is rejected."],
    ],
  },
];

const gateLabels = {
  pass: "Pass",
  blocked: "Blocked",
  review: "Review",
};

function App() {
  const [selectedId, setSelectedId] = useState(exceptions[0].id);
  const [approved, setApproved] = useState({});
  const [staged, setStaged] = useState({});

  const selected = useMemo(
    () => exceptions.find((item) => item.id === selectedId) ?? exceptions[0],
    [selectedId],
  );
  const isApproved = Boolean(approved[selected.id]);
  const isStaged = Boolean(staged[selected.id]);

  function approveAction() {
    setApproved((current) => ({ ...current, [selected.id]: true }));
  }

  function resetAction() {
    setApproved((current) => ({ ...current, [selected.id]: false }));
    setStaged((current) => ({ ...current, [selected.id]: false }));
  }

  function stageAction() {
    if (!isApproved) return;
    setStaged((current) => ({ ...current, [selected.id]: true }));
  }

  return (
    <main className="workbench">
      <header className="topbar">
        <div>
          <p className="eyebrow">Synthetic workflow prototype</p>
          <h1>Supply Chain Exception Workbench</h1>
        </div>
        <div className="topbar-metrics" aria-label="Queue metrics">
          <span>{exceptions.length} open exceptions</span>
          <span>0 auto-send paths</span>
          <span>100% cited actions</span>
        </div>
      </header>

      <section className="layout" aria-label="Trusted exception workflow">
        <aside className="queue" aria-label="Exception queue">
          <div className="section-heading">
            <p className="eyebrow">Queue</p>
            <h2>Exceptions</h2>
          </div>
          <div className="queue-list">
            {exceptions.map((item) => (
              <button
                className={`queue-item ${item.id === selected.id ? "active" : ""}`}
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                type="button"
              >
                <span className="queue-row">
                  <strong>{item.type}</strong>
                  <span className={`severity ${item.severity.toLowerCase()}`}>
                    {item.severity}
                  </span>
                </span>
                <span className="queue-title">{item.title}</span>
                <span className="queue-meta">
                  {item.supplier} | {item.status}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="detail" aria-label="Selected exception detail">
          <div className="detail-header">
            <div>
              <p className="eyebrow">{selected.id}</p>
              <h2>{selected.title}</h2>
            </div>
            <span className={`severity ${selected.severity.toLowerCase()}`}>
              {selected.severity}
            </span>
          </div>

          <dl className="facts">
            <div>
              <dt>Supplier</dt>
              <dd>{selected.supplier}</dd>
            </div>
            <div>
              <dt>Part</dt>
              <dd>{selected.part}</dd>
            </div>
            <div>
              <dt>Site</dt>
              <dd>{selected.site}</dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>{selected.owner}</dd>
            </div>
          </dl>

          <div className="brief">
            <p>{selected.summary}</p>
            <p>{selected.impact}</p>
          </div>

          <div className="section-heading evidence-heading">
            <p className="eyebrow">Cited evidence</p>
            <h2>Source snippets</h2>
          </div>
          <div className="evidence-list">
            {selected.evidence.map((source) => (
              <article className="evidence-card" key={source.id}>
                <div className="source-topline">
                  <span>{source.source}</span>
                  <code>{source.id}</code>
                </div>
                <p>{source.snippet}</p>
                <span className="freshness">{source.freshness}</span>
              </article>
            ))}
          </div>
        </section>

        <aside className="action-panel" aria-label="Recommendation and gates">
          <section className="panel">
            <p className="eyebrow">Recommended action</p>
            <h2>{selected.action.label}</h2>
            <p>{selected.action.copy}</p>
            <div className="action-meta">
              <span>Approver</span>
              <strong>{selected.action.approver}</strong>
            </div>
            <div className="action-meta">
              <span>External action</span>
              <strong>{selected.action.externalAction}</strong>
            </div>
            <p className="impact">{selected.action.impact}</p>
            <div className="refs">
              {selected.action.refs.map((ref) => (
                <code key={ref}>{ref}</code>
              ))}
            </div>
            <div className="button-row">
              <button className="primary" onClick={approveAction} type="button">
                Approve as human
              </button>
              <button className="secondary" onClick={resetAction} type="button">
                Reset gate
              </button>
            </div>
            <button
              className="wide"
              disabled={!isApproved}
              onClick={stageAction}
              type="button"
            >
              {isApproved ? "Stage approved action" : "Approval required"}
            </button>
            {isStaged && (
              <p className="receipt" role="status">
                Receipt staged: approval token bound to {selected.id}; no live system was called.
              </p>
            )}
          </section>

          <section className="panel">
            <p className="eyebrow">Proof gates</p>
            <h2>Unsafe automation blockers</h2>
            <ul className="gate-list">
              {selected.gates.map(([name, state, note]) => (
                <li key={name}>
                  <span className={`gate-state ${state}`}>{gateLabels[state]}</span>
                  <div>
                    <strong>{name}</strong>
                    <p>{note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </section>
    </main>
  );
}

export default App;
