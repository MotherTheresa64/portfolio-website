import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiCode, FiHelpCircle, FiX } from "react-icons/fi";
import { chooseAnswer, initialChallengeState } from "../challenge-engine";
import type { ChallengeDefinition, GateId } from "../portfolio-data";

export function ChallengeCard({
  challenge,
  completed,
  bypassed,
  expanded,
  onExpand,
  onCollapse,
  onComplete,
  embedded = false,
}: {
  challenge: ChallengeDefinition;
  completed: boolean;
  bypassed: boolean;
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onComplete: (id: GateId) => void;
  embedded?: boolean;
}) {
  const [state, setState] = useState(initialChallengeState);
  const [message, setMessage] = useState("Two misses reveal the answer. Your first miss unlocks a hint.");
  const timerRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const locked = completed || bypassed || state.status !== "idle";
  const hintVisible = state.strikes >= 1;
  const answerVisible = state.status === "revealed";

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const statusLabel = useMemo(() => {
    if (bypassed) return "Available in direct view";
    if (completed) return "Completed";
    if (state.status === "revealed") return "Answer revealed";
    return `${state.strikes}/2 strikes`;
  }, [bypassed, completed, state.status, state.strikes]);

  const scheduleComplete = (delay: number) => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => onComplete(challenge.id), delay);
  };

  const pick = (value: string) => {
    const result = chooseAnswer(challenge, state, value);
    if (result.outcome === "ignored") return;
    setState(result.state);

    if (result.outcome === "correct") {
      setMessage(`Correct. ${challenge.explanation}`);
      scheduleComplete(reduceMotion ? 250 : 700);
      return;
    }

    if (result.outcome === "wrong-hint") {
      setMessage("Strike 1/2. The hint is now available below; try another option.");
      return;
    }

    setMessage(`Strike 2/2. The correct answer is ${challenge.answer}. Review it below, then continue when you're ready.`);
  };

  if (bypassed) {
    return (
      <div className="challenge-complete" aria-label={`${challenge.file}: bypassed in direct view`}>
        <FiCheck aria-hidden="true" />
        <span><strong>{challenge.file}</strong><small>Direct view keeps this section open</small></span>
      </div>
    );
  }

  if (!expanded && !embedded) {
    return (
      <button className={`challenge-launcher ${completed ? "is-complete" : ""}`} type="button" onClick={onExpand}>
        {completed ? <FiCheck aria-hidden="true" /> : <FiCode aria-hidden="true" />}
        <span><strong>{challenge.file}</strong><small>{completed ? "Completed · review challenge" : "Open code challenge"}</small></span>
      </button>
    );
  }

  return (
    <motion.section
      className={`challenge-card ${embedded ? "is-embedded" : ""}`}
      aria-labelledby={`challenge-${challenge.id}-title`}
      initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
    >
      <header className="challenge-titlebar">
        <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="challenge-file"><FiCode aria-hidden="true" /> {challenge.file}</span>
        <span className="challenge-language">{challenge.language}</span>
        {!embedded && (
          <button className="icon-button" type="button" onClick={onCollapse} aria-label={`Close ${challenge.file} challenge`}>
            <FiX aria-hidden="true" />
          </button>
        )}
      </header>

      <div className="challenge-body">
        <div className="challenge-meta">
          <div>
            <p className="eyebrow">CODE GATE</p>
            <h3 id={`challenge-${challenge.id}-title`}>{challenge.label}</h3>
          </div>
          <span className={`strike-badge strikes-${state.strikes}`}>{statusLabel}</span>
        </div>
        <p className="challenge-prompt">{challenge.prompt}</p>
        <pre tabIndex={0} aria-label={`${challenge.file} code sample`}><code>{challenge.snippet}</code></pre>

        <fieldset className="choice-fieldset" disabled={locked}>
          <legend>Choose the missing code</legend>
          <div className="choice-grid">
            {challenge.choices.map((choice) => {
              const wrong = state.wrongValues.includes(choice.value);
              const correct = (state.status === "solved" && choice.value === challenge.answer) || (answerVisible && choice.value === challenge.answer);
              return (
                <button
                  key={choice.value}
                  type="button"
                  className={`choice-button ${wrong ? "is-wrong" : ""} ${correct ? "is-correct" : ""}`}
                  onClick={() => pick(choice.value)}
                  disabled={locked || wrong}
                  aria-label={`${choice.label}${wrong ? ", incorrect" : correct ? ", correct" : ""}`}
                >
                  <code>{choice.label}</code>
                  {wrong && <span>Incorrect</span>}
                  {correct && <span>Correct</span>}
                </button>
              );
            })}
          </div>
        </fieldset>

        <p className="challenge-status" role="status" aria-live="polite">{message}</p>
        {hintVisible && (
          <div className="challenge-hint">
            <FiHelpCircle aria-hidden="true" />
            <span><strong>Hint unlocked</strong>{challenge.hint}</span>
          </div>
        )}
        {answerVisible && (
          <div className="challenge-answer" role="note">
            <strong>Answer revealed</strong>
            <code>{challenge.answer}</code>
            <span>{challenge.explanation}</span>
            <button className="challenge-continue" type="button" onClick={() => onComplete(challenge.id)}>
              <FiCheck aria-hidden="true" /> Continue
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
