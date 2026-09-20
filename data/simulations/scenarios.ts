import type { SimulationScenario } from "@/lib/simulation";

export const simulationScenarios: SimulationScenario[] = [
  {
    id: "RESP-001",
    name: "Routine respiratory symptoms",
    summary: "A low-acuity educational scenario focused on observing a changing symptom timeline.",
    initialCondition: "Fictional patient reports a new, mild cough after routine activity.",
    patientState: {
      patient: { id: "SIM-P-101", name: "Nora Ellery", age: 34, sex: "Female" },
      symptoms: ["Mild cough", "Throat irritation"],
      vitalSigns: { heartRate: 78, respiratoryRate: 16, oxygenSaturation: 98, temperatureCelsius: 36.8, bloodPressure: "118/76" }
    },
    timelineEvents: [
      { id: "RESP-001-E1", timeMinutes: 0, title: "Scenario initialized", description: "Initial fictional patient state loaded for observation.", type: "SYSTEM_NOTE" },
      { id: "RESP-001-E2", timeMinutes: 30, title: "Symptom note added", description: "The simulated cough remains mild during the observation window.", type: "OBSERVATION" },
      { id: "RESP-001-E3", timeMinutes: 60, title: "Observation window complete", description: "Scenario reaches its configured educational checkpoint.", type: "SCENARIO_MARKER" }
    ]
  },
  {
    id: "DEHY-002",
    name: "Dehydration scenario",
    summary: "A fictional observation exercise using changing intake history and simulated vital signs.",
    initialCondition: "Fictional patient reports reduced fluid intake during a warm day.",
    patientState: {
      patient: { id: "SIM-P-204", name: "Theo Arden", age: 26, sex: "Male" },
      symptoms: ["Thirst", "Fatigue", "Dry mouth"],
      vitalSigns: { heartRate: 88, respiratoryRate: 17, oxygenSaturation: 99, temperatureCelsius: 37.1, bloodPressure: "110/72" }
    },
    timelineEvents: [
      { id: "DEHY-002-E1", timeMinutes: 0, title: "Scenario initialized", description: "Synthetic baseline state loaded.", type: "SYSTEM_NOTE" },
      { id: "DEHY-002-E2", timeMinutes: 20, title: "Activity recorded", description: "The fictional patient completes a simulated activity interval.", type: "OBSERVATION" },
      { id: "DEHY-002-E3", timeMinutes: 45, title: "State checkpoint", description: "The scenario records a planned educational checkpoint.", type: "SCENARIO_MARKER" }
    ]
  },
  {
    id: "BREATH-003",
    name: "Emergency breathing scenario",
    summary: "A non-clinical interface exercise for observing an urgent fictional event sequence.",
    initialCondition: "Fictional patient reports sudden shortness of breath in the scenario environment.",
    patientState: {
      patient: { id: "SIM-P-309", name: "Iris Venn", age: 51, sex: "Female" },
      symptoms: ["Shortness of breath", "Chest tightness"],
      vitalSigns: { heartRate: 104, respiratoryRate: 24, oxygenSaturation: 93, temperatureCelsius: 37.0, bloodPressure: "136/84" }
    },
    timelineEvents: [
      { id: "BREATH-003-E1", timeMinutes: 0, title: "Urgent scenario initialized", description: "Synthetic urgent event sequence loaded for interface testing.", type: "SYSTEM_NOTE" },
      { id: "BREATH-003-E2", timeMinutes: 5, title: "Observation recorded", description: "The scenario records a simulated change in breathing effort.", type: "OBSERVATION" },
      { id: "BREATH-003-E3", timeMinutes: 10, title: "Safety checkpoint", description: "The simulation pauses at a configured safety boundary.", type: "SCENARIO_MARKER" }
    ]
  },
  {
    id: "TRAUMA-004",
    name: "Trauma simulation",
    summary: "A fictional event sequence for testing timeline visibility and safety boundaries.",
    initialCondition: "Fictional patient is introduced after a simulated low-detail incident.",
    patientState: {
      patient: { id: "SIM-P-417", name: "Cal Rowan", age: 40, sex: "Male" },
      symptoms: ["Localized discomfort", "Limited movement"],
      vitalSigns: { heartRate: 96, respiratoryRate: 19, oxygenSaturation: 97, temperatureCelsius: 36.9, bloodPressure: "128/80" }
    },
    timelineEvents: [
      { id: "TRAUMA-004-E1", timeMinutes: 0, title: "Scenario initialized", description: "Fictional event context loaded.", type: "SYSTEM_NOTE" },
      { id: "TRAUMA-004-E2", timeMinutes: 15, title: "Movement note added", description: "The simulated state records limited movement for the timeline.", type: "OBSERVATION" },
      { id: "TRAUMA-004-E3", timeMinutes: 30, title: "Scenario checkpoint", description: "The educational sequence reaches a review boundary.", type: "SCENARIO_MARKER" }
    ]
  }
];
