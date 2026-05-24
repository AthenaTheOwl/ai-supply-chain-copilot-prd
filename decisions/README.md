# PRD-craft decisions

This directory records the load-bearing PRD-craft choices for this repo.
Each decision is a short markdown file with a YAML front matter header.

## Format

```yaml
---
id: DEC-PRD-NNN-<slug>
date: YYYY-MM-DD
status: approved | superseded | rejected
reversible: true | false
---
```

Body sections:

- `## decision` — the choice in two or three sentences
- `## alternatives` — options considered with one-line rejected_because
- `## rationale` — one or two paragraphs of reasoning
- `## evidence` — file paths in this repo that show the decision applied
- `## rollback` — what would have to change to reverse it

## How to add a new DEC

1. Copy the front matter shape above.
2. Pick the next available `NNN`.
3. Use a kebab-case slug that names the choice.
4. Keep voice-lint clean (`python scripts/voice_lint.py`).
