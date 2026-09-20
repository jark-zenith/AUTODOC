# System Design

AUTODOC is organized as a set of independent, replaceable software boundaries. The Next.js App Router presents the interface, while domain contracts live in `types/` and subsystem entry points live in `lib/`.

## Module boundaries

- `lib/core/` coordinates module registration, configuration, initialization, and system status.
- `lib/ai/ivy/` reserves the future IVY conversational interface; no model is connected.
- `lib/memory/`, `lib/tasks/`, and `lib/research/` define future memory, task, and research responsibilities.
- `lib/medical/`, `lib/reasoning/`, and `lib/safety/` isolate medical data, reasoning, and safety contracts. The Medical Knowledge System separates models, local storage, deterministic retrieval, categories, validation, and version history behind `KnowledgeService`. The Symptom Understanding Engine separately extracts and normalizes a small controlled vocabulary, then optionally requests related educational knowledge without making diagnoses.
- `lib/emergency/`, `lib/identity/`, `lib/voice/`, `lib/notifications/`, and `lib/multimodal/` reserve future interaction boundaries.
- `lib/simulation/` contains the implemented fictional scenario engine and remains independent from the UI.
- `lib/database/`, `lib/security/`, and `lib/utilities/` reserve persistence, access/audit, and shared support boundaries.

The shared `types/` directory contains contracts for users, families, protected patient profiles, memory, tasks, research, knowledge, assessments, safety alerts, emergency events, identity verification, permissions, notifications, multimodal content, and voice requests.

## Reasoning flow

The current deterministic reasoning path is:

`Symptoms -> Symptom Understanding -> Structured Symptoms -> Reasoning Engine -> KnowledgeService -> Possible Explanations -> Evidence + Information Match -> Limitations`

`lib/medical/reasoning/` exposes a provider interface and a deterministic provider. It compares structured symptoms with the shared educational knowledge entries using explainable overlap scoring. The score is an internal Information Match value, not a probability, diagnosis, or clinical certainty. Unreported symptoms remain unknown rather than being treated as absent.

The Reasoning Engine is separate from the Safety Engine. It can surface informational warnings for a future safety handoff, but it does not determine urgency or emergency status. Future IVY or other response layers can consume the structured `ReasoningResult` without coupling to the deterministic provider.

## Safety flow

Safety runs independently from reasoning:

`Structured Symptoms -> Safety Engine -> Warning Signals -> System Status + Urgency -> Future Response Layer`

The Safety Engine uses auditable deterministic red-flag rules. `CLEAR`, `ATTENTION`, and `URGENT_REVIEW` are internal system classifications, and `LOW`, `MODERATE`, `HIGH`, `CRITICAL`, and `UNKNOWN` are system urgency levels. They are not clinically validated emergency predictions. The engine never assumes an unreported symptom is absent.

Emergency integration is represented by a stub `EmergencyService` that remains `NOT_CONFIGURED`; no real or simulated emergency call is made. Simulation inputs retain their `SIMULATION` source and are evaluated by the same independent safety service without being represented as real patient records.

## Assessment and response flow

The Assessment/Response Engine in `lib/medical/response/` is a thin deterministic orchestration layer:

`User Input -> Symptom Understanding -> Structured Data -> Reasoning + Safety -> Assessment -> Unified Response -> Future IVY`

It preserves the original input, symptoms, complete `ReasoningResult`, complete `SafetyResult`, possible explanations, warning signals, status, next-step category, timestamp, method, and limitations. Safety status has priority over ordinary reasoning output. Empty structured symptom data becomes `INSUFFICIENT_INFORMATION`; no result is labeled healthy or medically fine.

## Notifications and follow-ups

Follow-ups remain explicit family records linked to the existing Task Manager. The Notification System consumes follow-up and task events through a provider boundary. The active `DevelopmentNotificationProvider` only marks delivery inside the application; no external channel is configured.

`NotificationScheduler` manually processes due notifications and overdue follow-ups. Idempotency keys prevent repeated scheduler runs from creating duplicate active notifications. Notification access is family/member scoped and uses the existing permission and audit boundaries.

## Identity and permissions

The Identity System is a provider boundary. Only `DevelopmentIdentityProvider` is active; camera, biometric, and production authentication providers return `NOT_CONFIGURED` or development-only status. Identity creates an explicit, expiring session containing family and member scope.

The independent Permission System in `lib/security/permissions/` answers whether an identified actor may perform a specific action. It uses explicit roles, permission rules, access scopes, and an `AccessContext` containing purpose and scope. Member-scoped access cannot silently cross from one family member to another. Protected API routes use the same service boundary instead of trusting URL IDs or UI visibility.

Audit events record actor/member IDs, action, resource, decision, reason, and timestamp only. They never include private health content. Future IVY, authentication, camera, and database layers must use these same identity and permission boundaries.

## Super Admin dashboard

`/admin` is a protected monitoring surface over existing services. `AdminService` aggregates Core module state, task/research counts, KnowledgeService inventory, family/follow-up counts, development notifications, identity/session information, permission policy, and non-sensitive audit activity. Safe actions are limited to refresh, development health checks, review/inspection actions, and failed-task inspection. It does not bypass permissions or mutate clinical/knowledge behavior.

## Research pipeline

Future research tasks follow an explicit lifecycle:

`REQUEST -> PLAN -> RESEARCH -> ANALYZE -> VALIDATE -> PROPOSE UPDATE -> APPLY UPDATE -> VERSION -> AUDIT`

The current project does not perform web research, apply knowledge updates, or modify its own source code. Any future update path must be explicit, versioned, reviewable, and auditable.

Knowledge entries are concise educational fixtures with local provenance. A `KnowledgeUpdateProposal` may be reviewed and versioned through an explicit pipeline, but research does not automatically approve, overwrite, or modify application source code.

## Safety constraints

AUTODOC remains a software simulation and research system. It does not claim to be a doctor, diagnose, prescribe, control devices, connect to emergency services, use real patient information, store biometric data, or connect an LLM. Future modules must fail closed at their boundary until they are explicitly implemented and reviewed.