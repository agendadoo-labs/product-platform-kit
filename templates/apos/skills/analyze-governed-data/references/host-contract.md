# Host contract

A host supplies `get_context()` and `analyze(plan)` through an authorized adapter. This is a semantic interface, not a mandate for a particular tool protocol. Bind identity, credentials and endpoint outside model input. HTTP/JSON or MCP adapters may implement the same operations.

Plan fields: version, context_hash, operation, metric, filters and group_by. Provider context supplies permitted identifiers, filter types and limits. Validate both structure and domain semantics. The provider compiles executable queries; the model supplies no SQL.

Evidence includes plan, context hash, analysis ID, query SQL/parameters/hash, dataset revision, sources, grain/joins, cardinality checks, coverage/exclusions, statistics and post-processing version. Verify returned plan equals submitted plan. A valid envelope alone does not establish numerical correctness or factual entailment.

Conformance: reject unknown fields/IDs, stale revisions, cross-plan answers, invalid joins and exceeded bounds. Test a successful comparison, a trend and an insufficient-data case. Verify numbers with an independently computed oracle. Test a second synthetic domain and another client; do not claim universal LLM performance from these tests.

Deployment must record artifact revision and hashes. Skill installation does not enable execution, network access or new model providers. License and redistribution follow the source repository; no additional license is implied by this package.
