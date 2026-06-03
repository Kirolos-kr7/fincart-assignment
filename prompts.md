# AI Prompts Log

This file documents the prompts used with Cursor (or other AI assistants) while building the Fincart shipping assignment.

## How to use this file

For each prompt, record:

- **Prompt** — what you asked
- **Context** — files, constraints, or goals you referenced
- **Outcome** — what changed or what you learned

---

## Courier pricing data

### Prompt 1

**Prompt**

> @utils/couriers.ts:1-100 make some dynamic data for weight cost any days so that it varies

**Context**

- Target file: `utils/couriers.ts`
- Goal: make weight tiers, cost, and delivery days differ per courier instead of repeating the same values

**Outcome**

- Introduced per-carrier pricing profiles and a `buildLimits` helper to generate tiers dynamically
- Added `getQuoteForWeight` to resolve the correct tier for a package weight

---

### Prompt 2

**Prompt**

> We want it like before static values but make them vary no need to do the build

**Context**

- Follow-up after the dynamic `buildLimits` approach
- Keep the original inline static array shape; no helper functions

**Outcome**

- Reverted to static `limit` arrays on each courier
- Updated cost and days so they vary realistically across Aramex, FedEx, J&T Express, and PDC
- Removed `buildLimits` and related helpers

---

## Project setup

<!-- Add prompts used for the multi-step form, Zustand stores, orders page, validation, etc. -->

### Prompt

**Prompt**

> _Your prompt here_

**Context**

> _Files, libraries, or requirements_

**Outcome**

> _What was implemented_
