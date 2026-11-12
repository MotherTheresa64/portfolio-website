import type { ChallengeDefinition, GateId, PortfolioMode } from "./portfolio-data";

export type ChallengeStatus = "idle" | "solved" | "revealed";

export type ChallengeState = {
  strikes: 0 | 1 | 2;
  wrongValues: string[];
  status: ChallengeStatus;
};

export type ChallengeOutcome = "correct" | "wrong-hint" | "wrong-reveal" | "ignored";

export type ChallengeResult = {
  state: ChallengeState;
  outcome: ChallengeOutcome;
};

export const initialChallengeState = (): ChallengeState => ({
  strikes: 0,
  wrongValues: [],
  status: "idle",
});

export function chooseAnswer(
  challenge: ChallengeDefinition,
  state: ChallengeState,
  value: string,
): ChallengeResult {
  if (state.status !== "idle" || state.wrongValues.includes(value)) {
    return { state, outcome: "ignored" };
  }

  if (value === challenge.answer) {
    return {
      state: { ...state, status: "solved" },
      outcome: "correct",
    };
  }

  const wrongValues = [...state.wrongValues, value];
  if (state.strikes === 0) {
    return {
      state: { strikes: 1, wrongValues, status: "idle" },
      outcome: "wrong-hint",
    };
  }

  return {
    state: { strikes: 2, wrongValues, status: "revealed" },
    outcome: "wrong-reveal",
  };
}

export function isGateAccessible(id: GateId, completed: ReadonlySet<GateId>, mode: PortfolioMode) {
  if (mode === "revealed") return true;
  if (mode !== "challenge") return false;
  if (id === "skills") return true;
  if (id === "projects") return completed.has("skills");
  if (id === "list" || id === "highlights" || id === "aegis") return completed.has("projects");
  return completed.has("aegis");
}

export function getNextGate(completed: ReadonlySet<GateId>, mode: PortfolioMode): GateId | null {
  if (mode !== "challenge") return null;
  const order: GateId[] = ["skills", "projects", "list", "highlights", "aegis", "contact"];
  return order.find((id) => !completed.has(id) && isGateAccessible(id, completed, mode)) ?? null;
}

export function getProgress(completed: ReadonlySet<GateId>, mode: PortfolioMode, total = 6) {
  if (mode === "revealed") return 100;
  return Math.round((completed.size / total) * 100);
}

export function getDirectionalCopy(compact: boolean) {
  return compact
    ? {
        intro: "Scroll to explore. Tap a route to inspect it.",
        list: "Scroll · More repositories",
        highlights: "Scroll · Featured products",
        aegis: "Continue below · Aegis flagship",
        action: "Open mobile route guide",
      }
    : {
        intro: "Choose a direction from the project root.",
        list: "← Left · More repositories",
        highlights: "Right · Featured products →",
        aegis: "↓ South · Aegis flagship",
        action: "Open map guide",
      };
}
