# Engineering Standards & Agent Instructions

This repository follows a strict set of engineering standards to keep the codebase:
- high performance
- type-safe
- well-tested and maintainable
- easy to evolve with low risk

These rules apply to humans and automated agents (AI assistants, codegen tools, bots).

## Repository expectations

- After changes ask should we update `./Readme.md` file
- After changes ask should we update Storubook stories in `./stories`
- Add or update tests for the code you change, even if nobody asked.
- After changes updates tests in `./tests/types` and check with command `npm run typecheck`
- Prefer `npm` exact dependencies versions when installing dependencies.
- Ask for confirmation before adding new production dependencies.

## Skills

A skill is a set of local instructions to follow that is stored in a `SKILL.md` file.

### Available skills

- changelog-last-tag: Generate GitHub release notes or changelog text from git commits since the latest tag (or a specified tag). Use when asked to draft a "What's Changed" section or release notes based on commit history since the last tagged release. (file: /Users/max/Projects/react-pure-modal/skills/changelog-last-tag/SKILL.md)

### How to use skills

- Mention the skill by name in your request and I will open its `SKILL.md` and follow the workflow.
- If multiple skills apply, say which ones to use and their order.

---

## 1) North Star

**Optimize for:**
1. Correctness and safety (types + tests + invariants)
2. Maintainability (clarity, cohesion, low coupling)
3. Performance (measured, not guessed)
4. Fast feedback loops (CI, incremental changes)

**Avoid:**
- hidden complexity
- speculative abstractions
- “clever” code
- undocumented behavior

---

## 2) Core Principles (non-negotiable)

### SOLID (practical interpretation)
- **S**ingle responsibility: each unit has one reason to change.
- **O**pen/closed: extend behavior via composition/configuration, not editing core logic repeatedly.
- **L**iskov: derived implementations must be safely substitutable.
- **I**nterface segregation: many small interfaces > one huge “god interface”.
- **D**ependency inversion: depend on stable abstractions; inject volatile details.

### DRY, KISS, Declarative style
- Prefer **simple, explicit** implementations.
- Prefer **declarative code** over deeply nested procedural control flow.
- Avoid duplication of *business rules*; duplication of *incidental boilerplate* is sometimes acceptable if it improves clarity.

### High cohesion, low coupling
- Keep related behavior together.
- Reduce cross-module knowledge and cross-layer leakage.
- Prefer “tell, don’t ask” and clear boundaries.

---

## 3) Repository Expectations

### 3.1 Structure & boundaries
- The system is organized into **modules** with clear responsibility.
- Cross-module interaction happens through **stable public APIs** (interfaces/contracts), not internal imports.
- No “shared utils dump”. Shared code must have:
  - a clear owner module, or
  - a dedicated “platform/common” module with strict scope.

### 3.2 Naming & semantics
- Names must reflect domain meaning (ubiquitous language).
- Avoid ambiguous names (`data`, `manager`, `helper`, `util`) unless truly appropriate.
- Functions should be small enough to explain in 1–2 sentences.

---

## 4) Type Safety & Data Integrity

### 4.1 Types are part of the design
- Prefer **explicit types** at module boundaries (inputs/outputs).
- Validate and normalize untrusted input at the edge (HTTP, queue, file IO).
- Internals should work with **validated domain types**, not raw arrays/maps.

### 4.2 No silent fallbacks
- Avoid implicit coercions.
- Avoid “return null on error” unless null is a meaningful domain state.
- Prefer explicit error objects/exceptions/results.

### 4.3 Domain invariants
- Business rules must be encoded as:
  - types (where possible),
  - validators (at edges),
  - assertions/invariants (internally),
  - tests (always).

---

## 5) Performance Standards (measured)

### 5.1 Don’t guess — measure
- Every performance-related change must include:
  - a measurable hypothesis,
  - a way to measure (benchmark, profiling, metrics),
  - before/after notes (in PR description).

### 5.2 Avoid common performance traps
- N+1 IO patterns (DB/API calls in loops).
- unbounded memory growth (loading huge lists, large JSON without streaming).
- unnecessary serialization/deserialization.
- heavy work on hot paths (request cycle) instead of async/background when appropriate.

### 5.3 Performance budgets (project-specific)
- Critical paths must define budgets (latency, allocations, DB queries).
- If budgets aren’t defined yet, create an issue and add temporary guardrails (basic metrics + threshold alerts).

---

## 6) Testing Standards

### 6.1 Testing pyramid (practical)
- **Unit tests** for pure logic and domain rules (fast, deterministic).
- **Integration tests** for boundaries (DB, HTTP, message bus) using realistic configs.
- **E2E tests** only for core user flows or high-risk regressions.

### 6.2 Coverage expectations
- Coverage is not a vanity metric, but:
  - New code must come with tests proportional to risk.
  - Bug fixes must include a regression test that fails before the fix.
- Prefer tests that assert **behavior** over implementation details.

### 6.3 Test quality rules
- Deterministic: no randomness without seeding.
- No external network unless explicitly designated as contract tests.
- Minimal mocking: mock only truly unstable/slow dependencies.
- Tests must be readable; if a test is hard to read, refactor production code.

---

## 7) Error Handling, Observability, and Operability

### 7.1 Errors
- Errors must be actionable:
  - message includes context (what, where, key identifiers),
  - root cause is not hidden.
- Don’t swallow exceptions.
- Return safe, non-leaky error messages to clients; log detailed context server-side.

### 7.2 Logging
- Structured logs preferred (key/value).
- No sensitive data in logs (tokens, passwords, personal data).
- Log at appropriate levels; avoid noisy logs on hot paths.

### 7.3 Metrics & tracing
- Key operations should emit:
  - latency,
  - error rate,
  - saturation/queue depth where relevant.
- Add tracing around cross-service boundaries if distributed.

---

## 8) Security & Privacy Baseline

- Validate all untrusted input at the boundary.
- Follow least privilege for credentials, DB roles, and service access.
- Avoid dynamic code execution unless strongly justified and sandboxed.
- Protect against injection (SQL/NoSQL/template), XSS, CSRF, SSRF, IDOR.
- Secrets must never be committed. Use secret scanning and env-based injection.
- Handle personal data carefully (minimize collection, retention, exposure).

---

## 9) Code Review & Pull Request Standards

### 9.1 PR size and shape
- Prefer small PRs that do one thing.
- Large changes must be split into safe steps:
  - refactor-only PRs (no behavior change),
  - behavior changes with tests,
  - cleanup PRs.

### 9.2 PR description must include
- What changed and why.
- Risk assessment (what could break).
- How to test (commands, scenarios).
- Performance notes (if applicable).
- Screenshots/videos for UI changes.

### 9.3 Reviewer checklist
- Correctness: types + invariants + edge validation.
- Tests: meaningful, deterministic, sufficient.
- Readability: low cognitive load, good naming.
- Architecture: boundaries respected, coupling reduced.
- Performance: avoids N+1, avoids unnecessary allocations/IO.
- Security: no leaks, safe input handling.

---

## 10) Definition of Done (DoD)

A change is “done” when:
- It compiles/builds and passes CI.
- It includes appropriate tests (unit/integration/e2e).
- Types are correct and strictness is not reduced.
- Public behavior is documented if changed.
- Observability is added/updated if it affects runtime behavior.
- Performance impact is understood for hot paths.

---

## 11) Agent-Specific Rules (AI assistants, bots)

### 11.1 First steps for any agent task
1. Identify affected modules and boundaries.
2. Find existing patterns in the codebase and follow them.
3. Make the smallest viable change.
4. Add/adjust tests first when fixing a bug (red → green).
5. Ensure formatting, lint, and static analysis pass.

### 11.2 Output expectations
- Prefer complete, working changes over partial sketches.
- No placeholder implementations.
- No silent API changes.
- If assumptions are required, list them explicitly in the PR description or task output.

### 11.3 When unsure
- Prefer adding a failing test that demonstrates the issue, then implement the fix.
- Prefer safer, explicit behavior over “magic”.
- Prefer feature flags for risky behavior changes.

---

## Appendix A — Language notes (optional, project-specific)

### A1) PHP backend notes
- Use strict typing where available.
- Avoid mutable shared state; keep services stateless where possible.
- Be mindful of performance in serialization, DB access, and hydration.
- Centralize validation at request boundaries; keep domain logic clean.

### A2) TypeScript frontend notes
- Avoid `any` and unsafe casts.
- Prefer discriminated unions for state machines and API results.
- Keep side effects isolated (data fetching, storage, analytics).
- Use memoization intentionally, not everywhere; measure render performance.
- Components should be small, composable, and testable.

---

## Appendix B — Suggested CI gates (customize)
- Formatting + linting
- Type checks (strict)
- Unit tests
- Integration tests (if applicable)
- Optional: bundle size/perf budgets; API contract checks; security scanning