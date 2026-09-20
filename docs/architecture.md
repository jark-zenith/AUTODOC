# Architecture

AUTODOC uses the Next.js App Router with TypeScript. The `app/` directory owns route boundaries, `components/` owns reusable interface pieces, and `lib/` is divided by domain responsibility.

The Core in `lib/core/` is the central coordinator boundary. It owns the typed `SystemState`, module registry, core configuration, initialization, and status snapshots. Future subsystems can register themselves with `SystemModuleRegistry` without coupling registration logic to the dashboard.

The Simulation Engine in `lib/simulation/` owns scenario models, fictional patient state, events, timelines, and simulation lifecycle status. Scenario fixtures live in `data/simulations/`; the UI consumes the engine through `SimulationWorkspace` and does not own simulation state construction.

The Medical Knowledge System in `lib/medical/` separates educational models, local storage, deterministic retrieval, validation, and version history behind `KnowledgeService`. The Symptom Understanding Engine in `lib/medical/symptoms/` converts plain-language input into structured symptoms. The Reasoning Engine in `lib/medical/reasoning/` consumes those symptoms and the shared KnowledgeService to produce Possible Explanations with transparent Information Match scores.

The Safety Engine in `lib/medical/safety/` is a separate provider-driven boundary. It consumes the same structured symptoms, checks auditable red-flag definitions, and returns `SafetyResult` data with warning signals, system status, urgency, limitations, and cautious next-step guidance. It does not share decision logic with Reasoning and does not contact emergency services.

The Assessment/Response Engine in `lib/medical/response/` consumes both structured outputs without duplicating either engine. Its deterministic provider builds an auditable `MedicalAssessment`; a future IVY or multimodal response layer can consume that structure without replacing the underlying services.

Family data is protected by the Identity -> Permissions -> Service/API pattern. Development identity selects a fictional demo member, permissions enforce family/member scope, and audit events record non-sensitive access metadata. Simulation uses its own source boundary and does not grant access to real family memory.

Follow-ups, Tasks, and Notifications remain separate: a follow-up may link to a task, and a due follow-up may create one idempotent in-app development notification. Notification preferences affect delivery configuration only; they do not change Assessment or Safety results.

The current Core and Simulation Engine only report software configuration and controlled placeholder state. Future simulation logic should stay separate from presentation and should pass through explicit safety boundaries before becoming user-facing behavior.

The final development-phase `/admin` route is an aggregation layer, not a second source of truth. It reads existing subsystem services and records access through the existing permission/audit boundaries.