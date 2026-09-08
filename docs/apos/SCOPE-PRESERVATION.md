# Scope Preservation and Change Envelopes

## Default rule

A change is an explicit delta over a known state. Anything not required by the Intent is preserved by default. Silence never authorizes deleting, renaming, migrating, reconfiguring or changing behavior.

This is especially important for non-visual surfaces: APIs, backend rules, schemas, security policies, environments, telemetry, billing and operational controls.

## Required Change Envelope

Every material change records:

- `delta`: requested behavior and outcome;
- `affected_surfaces`: code, APIs, data, environments and artifacts that must change;
- `invariants`: behavior and contracts that must remain true;
- `out_of_scope`: nearby elements that cannot be changed;
- `compatibility`: consumers and historical data that must continue working;
- `regression_surface`: focused observations for the delta and at-risk invariants;
- `rollback`: reversible unit and identifiable prior state.

## Design System reuse gate

Before implementing an interface, the agent inspects the component catalog and code, then records one decision in `component_reuse_assessment`:

- `reuse`: use an existing component as-is;
- `extend`: add a backward-compatible variant or capability to an existing component;
- `create`: create a shared component because the contract is stable and has plausible use in multiple surfaces;
- `local`: keep a one-off or unstable element inside the feature;
- `not_applicable`: the change has no interface surface.

The record names components reviewed, rationale and expected consumer surfaces. The gate prevents both duplicated interface code and speculative Design System growth. Shared appearance, content rules, accessibility and interaction belong in the component; product rules and data selection remain in the consumer.

The agent, not the builder, owns the first impact inventory. At minimum it considers UX, API contracts, backend behavior, schemas and RLS, authentication and authorization, environments and flags, secrets and integrations, telemetry and experiments, billing and entitlements, privacy, performance, accessibility, deployment, backup/recovery and generated artifacts.

## Efficient verification

Recover the active Intent, Decision, Contracts and directly affected artifacts first. Reuse fresh Evidence when its observed dependencies have not changed. Run focused regression on the delta, direct consumers and at-risk invariants. Reserve broad regression for promotion gates or systemically coupled changes.

Scope preservation does not reduce safety: uncertainty or an unexpected dependency expands the regression surface or triggers escalation; it never grants permission to change the dependency.
