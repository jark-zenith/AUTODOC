# AUTODOC

AUTODOC is a software-only simulation of an autonomous medical intelligence system, inspired by the fictional computer from *Passengers*.

## Scope

This repository contains the initial Next.js App Router foundation. The current application only presents the AUTODOC identity and initialization state.

The project does not connect to sensors or physical devices, use real patient data, provide diagnosis, prescribe medication, claim to be a doctor, or include an LLM, authentication, or database.

The current reasoning layer is a deterministic educational information-matching system. It consumes structured symptoms and the shared local KnowledgeService, labels results as Possible Explanations, and does not produce diagnoses, probabilities, treatment, or medication guidance.

The Safety Engine is an independent deterministic signal layer. It identifies defined warning patterns and reports internal status/urgency classifications with limitations; it does not diagnose, treat, contact emergency services, or represent a clinically validated prediction.

The Assessment/Response Engine combines Symptom Understanding, Reasoning, and Safety into an auditable structured response. Safety observations take priority, and the output remains educational, non-diagnostic, and suitable for future IVY integration without implementing IVY or an LLM.

The current Identity and Permission foundation is development-only. It uses fictional demo members, explicit role permissions, scoped sessions, and non-sensitive audit events. Camera, biometrics, passwords, production authentication, and database persistence are not implemented.

Notifications and follow-ups are development-only. Follow-ups link to Tasks, and the manual scheduler creates idempotent in-app notifications through `DevelopmentNotificationProvider`. No external message channel is configured or claimed.

The protected `/admin` route provides development-only monitoring across Core, Tasks, Research, Knowledge, Family, Follow-ups, Notifications, Identity, Permissions, and Audit services. It exposes only safe inspection/health-check actions and does not bypass authorization or mutate medical behavior.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` after the development server starts.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm test
```

## Project areas

- `app/` contains App Router routes and future route boundaries.
- `components/` contains future UI and domain components.
- `lib/` contains reserved boundaries for core, safety, simulation, and utility code.
- `data/` is reserved for synthetic knowledge and simulation fixtures.
- `docs/` contains architecture, safety, and roadmap notes.