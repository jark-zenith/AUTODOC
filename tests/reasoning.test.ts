import assert from "node:assert/strict";
import test from "node:test";
import { KnowledgeService } from "../lib/medical/knowledge-service";
import { ReasoningService } from "../lib/medical/reasoning/reasoning-service";
import { symptomUnderstandingEngine } from "../lib/medical/symptoms";

function analyze(text: string, source: "USER_TEXT" | "SIMULATION" = "USER_TEXT") {
  const symptoms = symptomUnderstandingEngine.analyze({ freeText: text, source, reportedAt: "2026-09-20T00:00:00.000Z" }).extractedSymptoms;
  return new ReasoningService(new KnowledgeService()).analyze({ requestId: "TEST-001", symptoms, createdAt: "2026-09-20T00:00:00.000Z" });
}

test("matches a clear asthma information pattern", () => {
  const result = analyze("I have been coughing and wheezing.");
  assert.ok(result.possibleExplanations.some((item) => item.title === "Asthma"));
});

test("supports multiple possible educational matches", () => {
  const result = analyze("I have a cough, fever and fatigue.");
  assert.ok(result.possibleExplanations.length > 1);
});

test("returns no meaningful match for unknown terms", () => {
  const result = analyze("My ankle feels unusual.");
  assert.equal(result.possibleExplanations.length, 0);
});

test("uses normalized symptom matching", () => {
  const result = analyze("My head hurts and I feel fatigued.");
  assert.ok(result.possibleExplanations.some((item) => item.title === "Migraine"));
});

test("accepts simulation symptom input", () => {
  const input = symptomUnderstandingEngine.analyze({ freeText: "The fictional patient has a fever.", source: "SIMULATION" });
  assert.equal(input.originalInput.source, "SIMULATION");
  assert.equal(input.extractedSymptoms[0]?.normalizedName, "fever");
});

test("does not treat unreported symptoms as absent", () => {
  const result = analyze("I have a cough.");
  assert.ok(result.possibleExplanations.some((item) => item.unmatchedRelevantSymptoms.includes("fever")));
  assert.ok(result.limitations.some((item) => item.includes("not assumed to be absent")));
});

test("returns deterministic matching content", () => {
  const first = analyze("I have a cough and fever.");
  const second = analyze("I have a cough and fever.");
  assert.deepEqual(first.possibleExplanations, second.possibleExplanations);
  assert.equal(first.method, "deterministic-knowledge-matching");
});

test("uses KnowledgeService data rather than a second knowledge source", () => {
  const knowledge = new KnowledgeService();
  const result = new ReasoningService(knowledge).analyze({ requestId: "TEST-KNOWLEDGE", symptoms: symptomUnderstandingEngine.analyze({ freeText: "I am wheezing.", source: "USER_TEXT" }).extractedSymptoms, createdAt: new Date().toISOString() });
  assert.ok(result.matchedKnowledgeEntries.every((entry) => knowledge.getKnowledgeById(entry.id)));
});

test("does not use diagnosis or probability language", () => {
  const result = analyze("I have a cough.");
  const output = JSON.stringify(result).toLowerCase();
  assert.equal(output.includes("medical probability"), false);
  assert.equal(output.includes("confirmed condition"), false);
  assert.ok(result.limitations.some((item) => item.includes("not a medical diagnosis")));
});
