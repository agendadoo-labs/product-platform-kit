# The Agentic Product Manifesto

## Building products when execution is no longer the scarce resource

For decades, software organizations have been designed around a fundamental constraint:

**human execution is scarce.**

We created teams, roles, backlogs, tickets, roadmaps, handoffs, ceremonies and management layers to coordinate that scarce capacity.

Product Managers translate strategy into requirements.  
Designers translate problems into interfaces.  
Engineers translate specifications into software.  
Data teams measure what happened.  
SRE teams keep systems alive.

Jira, roadmaps, sprint planning, stand-ups and status reports are not intrinsic properties of software development.

They are coordination technologies.

They emerged because groups of specialized humans need mechanisms to divide work, communicate state, manage dependencies and preserve organizational memory.

Agents change this constraint.

When a single builder can work with dozens—or eventually hundreds—of specialized agents capable of researching, reasoning, designing, implementing, testing, deploying, observing and learning, the central organizational problem changes.

The question is no longer:

**How do we coordinate people doing the work?**

It becomes:

**How do we govern autonomous systems pursuing our intent?**

This requires a different operating model.

We call it the **Agentic Product Operating System — APOS**.

---

# I. We manage intent, not tasks

Traditional software organizations progressively decompose strategy:

**Strategy → Roadmap → Epic → Story → Task → Code**

Each decomposition reduces ambiguity until the work becomes executable by an individual.

Agents do not require the same decomposition.

They can reason about goals, explore alternatives and dynamically generate the intermediate work required to pursue them.

Therefore, the fundamental unit of an agentic organization should not be the task.

It should be the **Intent**.

An Intent describes a desired change in the world:

- the problem we want to solve;
- the outcome we expect;
- the population affected;
- the constraints that must be respected;
- the evidence required to consider the outcome achieved.

Tasks may still exist.

But they become **ephemeral execution artifacts**, generated and discarded by agents.

Intent persists.

---

# II. We preserve knowledge, not backlog

Traditional organizations accumulate tickets.

Agentic organizations should accumulate **knowledge**.

A completed ticket has little intrinsic value.

What matters is what the organization learned:

- Why did we make this decision?
- What alternatives were considered?
- What hypothesis were we testing?
- What evidence supported it?
- Which systems implement it?
- Which metrics measure it?
- Which assumptions remain uncertain?

The organizational memory of an agentic company should therefore not be a collection of completed tasks.

It should be a **Living Product Model**.

A continuously updated representation of:

**Users → Problems → Intents → Hypotheses → Experiments → Decisions → Features → Systems → Metrics → Evidence**

Every meaningful component of the product should be traceable through this graph.

A future builder—or agent—should be able to ask:

> Why does this endpoint exist?

And reconstruct the chain:

**Endpoint → Feature → Experiment → Hypothesis → User Problem → Product Intent → Evidence**

Knowledge becomes infrastructure.

---

# III. We govern through contracts, not instructions

Autonomy does not come from giving agents more instructions.

Autonomy comes from making the boundaries of acceptable behavior explicit.

Instead of describing every action agents should perform, an agentic organization defines **contracts**.

Product contracts define:

- outcomes;
- economics;
- fairness;
- experimentation rules;
- user protections.

Design contracts define:

- interaction principles;
- component behavior;
- accessibility;
- information hierarchy;
- responsive behavior;
- prohibited patterns.

Engineering contracts define:

- domain boundaries;
- APIs;
- schemas;
- dependency rules;
- security requirements;
- performance budgets.

Data contracts define:

- canonical entities;
- metrics;
- event semantics;
- lineage;
- quality expectations;
- privacy and retention.

Operational contracts define:

- SLOs;
- error budgets;
- observability;
- infrastructure costs;
- rollback requirements;
- incident policies.

The principle is simple:

> **The more autonomy we give agents, the more explicit our contracts must become.**

---

# IV. Autonomy should scale with reversibility

Not every decision deserves human approval.

A typo correction and a destructive database migration should not share the same governance model.

Agentic systems should classify actions by:

**impact × uncertainty × reversibility.**

Low-impact, reversible actions should happen autonomously.

High-impact or irreversible decisions should require stronger evidence and, eventually, human judgment.

An agent might autonomously:

- write code;
- create tests;
- run simulations;
- deploy to staging;
- start a small canary;
- detect regressions;
- roll back its own deployment.

But changing payment logic, deleting data, modifying critical security policies or exposing a major portion of users may require explicit authorization.

Human attention should be allocated according to **risk**, not organizational hierarchy.

---

# V. Evidence, not activity, defines progress

Traditional organizations frequently measure work:

- tickets completed;
- story points;
- deployments;
- features shipped.

Agentic organizations must measure **validated change**.

An agent cannot declare its own work successful.

Evidence must.

A change is complete only when:

**Intent satisfied  
∧ Contracts respected  
∧ Evidence sufficient**

Code merged is not completion.

Deployment is not completion.

Even a successful experiment is not necessarily completion.

The relevant question is:

> Did the system produce the intended outcome without violating its constraints?

This creates an **Evidence Ledger** connecting decisions with observations.

Over time, the organization does not merely become larger.

It becomes **more knowledgeable**.

---

# VI. The backlog is replaced by the learning loop

The central artifact of traditional product organizations is often the backlog.

The central mechanism of an agentic organization should be the **learning loop**:

**Intent → Explore → Design → Build → Verify → Deploy → Observe → Learn → Intent**

Each iteration changes the organization's understanding of the problem.

Agents should continuously ask:

- What do we believe?
- Why do we believe it?
- What remains uncertain?
- What is the cheapest way to reduce that uncertainty?
- What did reality teach us?

Execution becomes subordinate to learning.

---

# VII. Agent organizations should be compiled, not permanently designed

A common mistake is to recreate the existing organization using agents:

AI Product Manager.  
AI Designer.  
AI Engineer.  
AI Data Scientist.  
AI QA.  
AI SRE.

This reproduces human organizational constraints inside machines.

Instead, agentic organizations should be composed around **capabilities**:

**Discover  
Reason  
Design  
Build  
Verify  
Operate  
Learn**

Given an Intent, the system should dynamically assemble the capabilities necessary to pursue it.

One problem may require research, simulation and analytics.

Another may require frontend engineering, experimentation and SRE.

Another may require security, architecture and migration planning.

The organization is therefore not a static org chart.

It is **compiled from the problem**.

When the Intent is satisfied, the temporary organization disappears.

The knowledge it produced remains.

---

# VIII. The builder becomes a governor of systems

When execution becomes abundant, the role of the human changes.

The builder should spend progressively less time describing work and more time doing three things.

### Governing

Defining:

- purpose;
- principles;
- boundaries;
- economics;
- risk tolerance;
- ethical constraints.

### Judging

Resolving trade-offs without objectively correct answers:

**Growth vs. fairness.  
Revenue vs. experience.  
Personalization vs. privacy.  
Speed vs. resilience.  
Optimization vs. human dignity.**

### Exploring

Asking questions the system does not yet know how to ask.

Agents can search enormous spaces.

Humans remain responsible for deciding **which spaces are worth exploring**.

The builder therefore evolves from manager of execution into **governor of an adaptive system**.

---

# IX. Human attention becomes the scarce resource

Agentic organizations do not eliminate scarcity.

They move it.

When implementation, analysis, documentation and testing become abundant, the limiting resource becomes:

**human attention capable of judgment.**

This suggests a different measure of organizational leverage:

**Builder Leverage = Validated Value Produced / Human Attention Required**

And a different concept of autonomy:

**Effective Autonomy = Autonomous Decisions × Reliability**

The goal is not maximum automation.

The goal is:

> **maximum safe autonomy per unit of human attention.**

A system requiring constant supervision is not truly autonomous.

A system operating autonomously without adequate governance is not scalable.

The objective lies between them.

---

# X. Product development becomes a control system

The resulting organization resembles less a factory and more an adaptive control system.

The human defines:

**Intent + Principles + Constraints**

Agents perform:

**Exploration + Execution**

Reality produces:

**Evidence**

The system updates:

**State + Knowledge**

And the loop begins again.

This creates a fundamental shift:

**From planning work  
to governing adaptation.**

**From assigning tasks  
to expressing intent.**

**From tracking activity  
to evaluating evidence.**

**From organizational memory in people  
to organizational memory in systems.**

**From scaling headcount  
to scaling autonomy.**

---

# XI. Do not automate bureaucracy

The transition toward agentic organizations will naturally begin by automating existing workflows.

Agents will write Jira tickets.

Agents will update documentation.

Agents will generate status reports.

Agents will attend meetings and summarize them.

These capabilities are useful transitional technologies.

But they should not define the destination.

A robot automatically creating forty Jira tickets for other robots to execute is still operating inside an organizational architecture designed around human limitations.

The deeper opportunity is not:

> How can agents perform our existing processes faster?

It is:

> Which processes cease to be necessary when agents become participants in the organization?

We should not automate bureaucracy indefinitely.

We should **remove the conditions that made the bureaucracy necessary.**

---

# XII. Our principles

Therefore, we believe:

**Intent over tasks.**

**Outcomes over output.**

**Knowledge over backlog.**

**Contracts over instructions.**

**Evidence over status.**

**Capabilities over roles.**

**Dynamic organizations over static org charts.**

**Reversibility over approval chains.**

**Learning loops over delivery pipelines.**

**Human judgment over human coordination.**

**Safe autonomy over maximum automation.**

**Living systems over frozen documentation.**

And above all:

> **Do not automate the bureaucracy created to coordinate human execution. Design organizations that no longer require it.**

---

# The Agentic Organization

The smallest meaningful product organization may no longer be a squad.

It may be:

**one builder + an adaptive network of agents + an executable institutional memory.**

Its scalability will not primarily depend on how many people it employs.

It will depend on how much autonomous complexity one human can safely govern.

That changes the fundamental question of organizational design.

For the industrial organization, the question was:

> How many people can we coordinate?

For the software organization:

> How many teams can we align?

For the agentic organization, it becomes:

> **How much autonomy can one human govern without losing coherence, safety or purpose?**

That is the system we should now learn to build.
