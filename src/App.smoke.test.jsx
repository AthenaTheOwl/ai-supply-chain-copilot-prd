import assert from "node:assert/strict";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, it } from "vitest";
import App from "./App.jsx";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const cleanups = [];

function renderWorkbench() {
  const host = document.createElement("div");
  document.body.append(host);

  let root;
  act(() => {
    root = createRoot(host);
    root.render(<App />);
  });
  cleanups.push(() => root.unmount());

  return host;
}

function compactText(element) {
  assert.ok(element, "Expected element before reading text");
  return element.textContent.replace(/\s+/g, " ").trim();
}

function getSection(label) {
  const section = document.querySelector(`[aria-label="${label}"]`);
  assert.ok(section, `Expected section with aria-label "${label}"`);
  return section;
}

function getButtonByText(text) {
  const button = Array.from(document.querySelectorAll("button")).find((candidate) =>
    compactText(candidate).includes(text),
  );
  assert.ok(button, `Expected button containing "${text}"`);
  return button;
}

function click(button) {
  act(() => {
    button.click();
  });
}

afterEach(() => {
  for (const cleanup of cleanups.splice(0).reverse()) {
    act(() => {
      cleanup();
    });
  }
  document.body.innerHTML = "";
});

describe("exception workbench smoke", () => {
  it("switches exceptions and keeps supplier-facing action behind approval proof gates", () => {
    renderWorkbench();

    const detail = getSection("Selected exception detail");
    assert.equal(
      compactText(detail.querySelector(".detail-header h2")),
      "CTRL-7782 controller boards missed ship commit",
    );

    click(getButtonByText("Capacitor supplier scorecard crossed risk threshold"));

    assert.equal(
      compactText(detail.querySelector(".detail-header h2")),
      "Capacitor supplier scorecard crossed risk threshold",
    );
    assert.match(compactText(detail), /Luma Passive Components/);

    const actionPanel = getSection("Recommendation and gates");
    assert.match(compactText(actionPanel), /supplier corrective-action request/);
    assert.match(compactText(actionPanel), /Proof gates/);
    assert.match(compactText(actionPanel), /Approval token/);

    const gatedAction = getButtonByText("Approval required");
    assert.equal(gatedAction.disabled, true);
    click(gatedAction);
    assert.equal(actionPanel.querySelector('[role="status"]'), null);

    click(getButtonByText("Approve as human"));
    const approvedAction = getButtonByText("Stage approved action");
    assert.equal(approvedAction.disabled, false);

    click(approvedAction);
    assert.match(
      compactText(actionPanel.querySelector('[role="status"]')),
      /approval token bound to EXC-2026-0520-0149/,
    );
  });
});
