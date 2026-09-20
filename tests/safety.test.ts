import assert from "node:assert/strict";
import test from "node:test";
import { emergencyService } from "../lib/emergency";
import { safetyService } from "../lib/medical/safety";
import { symptomUnderstandingEngine } from "../lib/medical/symptoms";
import type { Symptom, SymptomInputSource } from "../types/symptom";

function symptom(normalizedName: string, severity: Symptom["severity"] = "UNKNOWN"): Symptom { return { id: `TEST-${normalizedName}`, name: normalizedName, normalizedName, category: "OTHER", description: "Test fixture", severity, duration: "UNKNOWN", onset: "UNKNOWN", frequency: "UNKNOWN", location: "UNKNOWN", associatedSymptoms: [], triggers: [], notes: [], confidence: 1 }; }
function analyze(symptoms: Symptom[], source: SymptomInputSource = "USER_TEXT") { return safetyService.analyze({ requestId: "SAFETY-TEST", symptoms, source, createdAt: "2026-09-20T00:00:00.000Z" }); }

test("returns CLEAR with no warning signals", () => { const result = analyze([symptom("cough")]); assert.equal(result.status, "CLEAR"); assert.equal(result.detectedSignals.length, 0); });
test("detects one severe breathing signal", () => { const result = analyze([symptom("shortness of breath", "SEVERE")]); assert.equal(result.status, "URGENT_REVIEW"); assert.equal(result.detectedSignals[0]?.name, "Severe breathing difficulty"); });
test("detects multiple warning signals", () => { const result = analyze([symptom("chest pain", "SEVERE"), symptom("loss of consciousness")]); assert.equal(result.detectedSignals.length, 2); });
test("selects highest urgency", () => { const result = analyze([symptom("confusion"), symptom("severe bleeding")]); assert.equal(result.urgency, "CRITICAL"); });
test("detects severe chest pain", () => { assert.equal(analyze([symptom("chest pain", "SEVERE")]).detectedSignals[0]?.id, "RF-CHEST-PAIN"); });
test("detects loss of consciousness", () => { assert.equal(analyze([symptom("loss of consciousness")]).detectedSignals[0]?.id, "RF-CONSCIOUSNESS"); });
test("detects severe bleeding, confusion, seizure and trauma signals", () => { const result = analyze([symptom("severe bleeding"), symptom("confusion"), symptom("seizure-like activity"), symptom("major trauma")]); assert.equal(result.detectedSignals.length, 4); });
test("detects incomplete information without treating it as negative", () => { const result = analyze([symptom("chest pain", "SEVERE")]); assert.ok(result.limitations.some((limitation) => limitation.includes("not assumed to be absent"))); assert.ok(result.detectedSignals[0]?.explanation.includes("identified")); });
test("does not classify an unknown symptom", () => { const result = analyze([symptom("unlisted symptom")]); assert.equal(result.status, "CLEAR"); });
test("repeated input returns identical safety content", () => { const symptoms = [symptom("loss of consciousness")]; const first = analyze(symptoms); const second = analyze(symptoms); assert.deepEqual({ status: first.status, urgency: first.urgency, signals: first.detectedSignals }, { status: second.status, urgency: second.urgency, signals: second.detectedSignals }); });
test("accepts simulation input from the symptom engine", () => { const extracted = symptomUnderstandingEngine.analyze({ freeText: "The fictional patient has severe difficulty breathing.", source: "SIMULATION" }).extractedSymptoms; const result = safetyService.analyze({ requestId: "SIM-SAFETY", symptoms: extracted, source: "SIMULATION", createdAt: "2026-09-20T00:00:00.000Z" }); assert.equal(result.detectedSignals[0]?.id, "RF-BREATHING"); });
test("keeps emergency service unconfigured", () => { assert.equal(emergencyService.getStatus(), "NOT_CONFIGURED"); assert.equal(emergencyService.prepareEvent("EVENT-1").status, "NOT_CONFIGURED"); });
test("generated output uses safety language instead of diagnosis or treatment claims", () => { const result = analyze([symptom("chest pain", "SEVERE")]); const output = JSON.stringify(result).toLowerCase(); assert.equal(output.includes("diagnosed"), false); assert.equal(output.includes("confirmed disease"), false); assert.equal(output.includes("prescribe"), false); assert.equal(output.includes("dosage"), false); assert.equal(output.includes("take this medication"), false); assert.ok(result.recommendedNextStep.includes("professional")); });
