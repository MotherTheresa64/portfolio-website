import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { aegis, challenges, otherRepos, products } from "../src/portfolio-data.ts";

test("every challenge has four unique choices containing exactly one correct answer", () => {
  for (const challenge of challenges) {
    assert.equal(challenge.choices.length, 4, challenge.id);
    assert.equal(new Set(challenge.choices.map((choice) => choice.value)).size, 4, challenge.id);
    assert.equal(challenge.choices.filter((choice) => choice.value === challenge.answer).length, 1, challenge.id);
    assert.ok(challenge.hint.length > 20, challenge.id);
    assert.ok(challenge.explanation.length > 30, challenge.id);
  }
});

test("featured projects have distinct categories, case-study substance, and https links", () => {
  assert.equal(new Set(products.map((product) => product.category)).size, products.length);
  for (const product of products) {
    // A project either links a live demo or says plainly why there is none.
    assert.ok(product.live ? /^https:\/\//.test(product.live) : (product.liveNote ?? "").length > 20, `${product.name} live`);
    assert.ok(product.image && existsSync(new URL(`../public${product.image}`, import.meta.url)), `${product.name} screenshot`);
    assert.match(product.source, /^https:\/\/github\.com\/MotherTheresa64\//);
    assert.doesNotMatch(product.status, /product complete/i);
    assert.ok(product.reality.length > 80, `${product.name} reality`);
    assert.ok(product.architecture.length > 120, `${product.name} architecture`);
    assert.ok(product.engineering.length >= 3, `${product.name} engineering`);
    assert.ok(product.engineering.every((item) => item.length > 50), `${product.name} engineering detail`);
    assert.ok(product.quality.length > 80, `${product.name} quality`);
    assert.ok(product.tradeoff.length > 100, `${product.name} tradeoff`);
  }
});

test("project copy preserves important implementation boundaries without exaggeration", () => {
  const planora = products.find((product) => product.name === "Planora");
  const threadline = products.find((product) => product.name === "Threadline");
  const wanderline = products.find((product) => product.name === "Wanderline");
  const ledgerly = products.find((product) => product.name === "Ledgerly");

  const nestwise = products.find((product) => product.name === "NestWise");

  // The public deployments have no Firebase project, so copy must not imply live sign-in works.
  assert.match(planora?.reality ?? "", /typed, versioned document/i);
  assert.match(planora?.reality ?? "", /no Firebase project configured/i);
  assert.match(planora?.tradeoff ?? "", /last write wins/i);

  assert.match(threadline?.reality ?? "", /onSnapshot/i);
  assert.match(threadline?.reality ?? "", /no Firebase project configured/i);
  assert.match(threadline?.tradeoff ?? "", /subcollections/i);
  assert.match(wanderline?.reality ?? "", /no shared database yet/i);
  assert.match(nestwise?.reality ?? "", /not deployed/i);
  assert.equal(nestwise?.live, undefined);
  assert.match(ledgerly?.reality ?? "", /verifies Firebase ID tokens/i);
});

test("Aegis copy is flagship-focused and exposes defensible system decisions", () => {
  const text = JSON.stringify(aegis);
  assert.match(text, /Redis-backed tickets|Redis tickets|Redis-backed realtime/i);
  assert.match(text, /Celery/i);
  assert.match(text, /Prometheus/i);
  assert.match(aegis.architecture, /PostgreSQL is authoritative/i);
  assert.ok(aegis.decisions.length >= 4);
  assert.ok(aegis.quality.length > 120);
  assert.doesNotMatch(text, /Terraform/i);
  assert.match(aegis.live, /^https:\/\//);
  assert.match(aegis.source, /MotherTheresa64\/Aegis$/);
});

test("additional repository catalog has no duplicate links", () => {
  assert.equal(new Set(otherRepos.map((repo) => repo.url)).size, otherRepos.length);
});
