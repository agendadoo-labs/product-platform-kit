# Executive summary

## Proposal for product and technology leadership

We recommend evaluating an operating model in which product and technology teams govern change through intent, contracts, and evidence, supported by agents whose capabilities are selected for the problem. APOS structures that interaction: the person accountable for the product expresses the desired outcome and judges material trade-offs; the system retrieves context, prepares candidates, verifies constraints, and preserves resulting knowledge.

The proposal does not assume one person can replace every organizational competency or responsibility. The hypothesis to test is whether one accountable product owner, supported by human and agent capabilities and a shared platform, can deliver validated changes with less coordination effort. Accountability, security, and decisions about business commitments retain identifiable human owners.

## How team work changes

| Dimension | Proposed model |
| --- | --- |
| Work intake | Conversation about the problem, audience, outcome, and boundaries; the system structures it without repeated forms. |
| Coordination | Capabilities composed for each change, with explicit dependencies and authority. Expertise remains essential without requiring one fixed agent per job title. |
| Memory | Decisions, contracts, evidence, and state linked to relevant versions. Documents and dashboards are views of that memory. |
| Progress | Distinguish verified candidates, published changes, and observed outcomes. Ticket or agent-call counts replace none of these stages. |
| Governance | Autonomy within approved boundaries; sensitive actions require judgment proportional to impact and reversibility. |
| Leadership role | Define purpose, priorities, resources, shared contracts, and authority; resolve trade-offs the system should not decide alone. |

## What exists and what remains unproven

A local APOS v0.1 implementation demonstrates a complete cycle: intent, governance decision, deterministic execution, five contract checks, evidence, and transactional state update. Implementation records report 12 passing tests. This experiment validates a bounded technical protocol; it does not establish organizational productivity, safety for arbitrary agents, financial return, or product impact.

Product Platform Kit and Valora also record migration of their operating configurations to APOS. Documentary and structural adoption does not automatically expand runtime capability. Informal-language interpretation with authenticated authority, isolated adapters, and business-contract verification require their own development and validation.

This compendium includes proposals and implementation records. Historical references to pending approvals or local-only work are retained; migration chapters document later evolution. Approval of this operating proposal is not blanket permission for agents to modify production.

## Recommended pilot

Select an existing journey with a bounded problem and reversible change—for example, advancement after comparable selection in Valora's mobile experience. This recommends a pilot, not immediate company-wide reorganization.

1. Identify a human owner, desired outcome, allowed environment, and applicable contracts.
2. Record the current workflow baseline: human attention, time to validated change, rework, and failures.
3. Use natural messages to propose changes and generate reviewable interpretations that retrieve existing decisions.
4. Initially allow only local candidate preparation and verification. Authorize publication separately.
5. Compare results with the baseline and decide whether autonomy can expand.

The pilot should demonstrate reduced coordination without increased interpretation errors, regressions, or unauthorized actions. Numerical targets, duration, and budget should be established with the journey owner and available data; they are not assumed in this document.

## Conditions for scaling

- Authority bound to the action, environment, and revision, with execution interruption available.
- Candidate-linked evidence from checks that do not depend solely on executor claims.
- Shared organizational contracts, with product-specific rules retained in the relevant product.
- Execution isolation, restricted credentials, cost limits, and external-effect handling before autonomy expands.
- Context retrieval with provenance and version control; uncertainty and conflicts must not be silently resolved.
- Documentation proportional to use: an artifact that does not guide execution, impose boundaries, explain decisions, support evidence, or recover state should not become a permanent obligation.

## Decision requested from the CTO

Approve the design of a bounded pilot and identify its owner, initial authority limits, and continuation criteria. The first investment should establish interaction and verification quality while reusing existing tests and infrastructure. Expansion to other teams should depend on pilot evidence, not the number of agents, documents, or automations created.
