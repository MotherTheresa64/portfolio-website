import assert from "node:assert/strict";
import test from "node:test";
import {
  chooseAnswer,
  getDirectionalCopy,
  getNextGate,
  getProgress,
  initialChallengeState,
  isGateAccessible,
} from "../src/challenge-engine.ts";
import { challenges } from "../src/portfolio-data.ts";
import type { GateId } from "../src/portfolio-data.ts";

const challenge = challenges[0];
if (!challenge) throw new Error("Expected at least one challenge");

test("first wrong choice records strike 1 and reveals a hint outcome", () => {
  const result = chooseAnswer(challenge, initialChallengeState(), "0");
  assert.equal(result.outcome, "wrong-hint");
  assert.equal(result.state.strikes, 1);
  assert.deepEqual(result.state.wrongValues, ["0"]);
  assert.equal(result.state.status, "idle");
});

test("second wrong choice reveals the answer and prevents a stuck route", () => {
  const first = chooseAnswer(challenge, initialChallengeState(), "0");
  const second = chooseAnswer(challenge, first.state, "auto");
  assert.equal(second.outcome, "wrong-reveal");
  assert.equal(second.state.strikes, 2);
  assert.equal(second.state.status, "revealed");
});

test("correct choice solves immediately", () => {
  const result = chooseAnswer(challenge, initialChallengeState(), challenge.answer);
  assert.equal(result.outcome, "correct");
  assert.equal(result.state.status, "solved");
});

test("already-used wrong choices are ignored", () => {
  const first = chooseAnswer(challenge, initialChallengeState(), "0");
  const duplicate = chooseAnswer(challenge, first.state, "0");
  assert.equal(duplicate.outcome, "ignored");
  assert.equal(duplicate.state.strikes, 1);
});

test("unlock order keeps projects behind skills and contact behind Aegis", () => {
  const none = new Set<GateId>();
  assert.equal(isGateAccessible("skills", none, "challenge"), true);
  assert.equal(isGateAccessible("projects", none, "challenge"), false);

  const skills = new Set<GateId>(["skills"]);
  assert.equal(isGateAccessible("projects", skills, "challenge"), true);
  assert.equal(isGateAccessible("aegis", skills, "challenge"), false);

  const projects = new Set<GateId>(["skills", "projects"]);
  assert.equal(isGateAccessible("list", projects, "challenge"), true);
  assert.equal(isGateAccessible("highlights", projects, "challenge"), true);
  assert.equal(isGateAccessible("aegis", projects, "challenge"), true);
  assert.equal(isGateAccessible("contact", projects, "challenge"), false);

  const flagship = new Set<GateId>(["skills", "projects", "aegis"]);
  assert.equal(isGateAccessible("contact", flagship, "challenge"), true);
});

test("next challenge is deterministic and reveal-all reports full progress", () => {
  assert.equal(getNextGate(new Set<GateId>(), "challenge"), "skills");
  assert.equal(getNextGate(new Set<GateId>(["skills"]), "challenge"), "projects");
  assert.equal(getProgress(new Set<GateId>(["skills", "projects"]), "challenge"), 33);
  assert.equal(getProgress(new Set<GateId>(), "revealed"), 100);
});

test("mobile guidance describes scroll and tap interaction instead of spatial directions", () => {
  const desktop = getDirectionalCopy(false);
  const mobile = getDirectionalCopy(true);
  assert.match(desktop.list, /Left/);
  assert.match(desktop.aegis, /South/);
  assert.match(mobile.intro, /Scroll/i);
  assert.match(mobile.intro, /Tap/i);
  assert.match(mobile.list, /Scroll/i);
  assert.match(mobile.aegis, /below/i);
  assert.doesNotMatch(`${mobile.intro} ${mobile.list} ${mobile.highlights} ${mobile.aegis}`, /left|right|south/i);
});
