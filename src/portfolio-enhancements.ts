type QuizOption = {
  label: string;
  value: string;
};

type QuizConfig = {
  answer: string;
  choices: QuizOption[];
};

type QuizState = {
  strikes: number;
  wrongValues: Set<string>;
  locked: boolean;
};

const quizByFile: Record<string, QuizConfig> = {
  "skills.css": {
    answer: "1",
    choices: [
      { label: "0", value: "0" },
      { label: "1", value: "1" },
      { label: "auto", value: "auto" },
      { label: "inherit", value: "inherit" },
    ],
  },
  "root.ts": {
    answer: "wantsProjects",
    choices: [
      { label: "skillsUnlocked", value: "skillsUnlocked" },
      { label: "wantsProjects", value: "wantsProjects" },
      { label: "openRoute", value: "openRoute" },
      { label: "true", value: "true" },
    ],
  },
  "repos.sh": {
    answer: "-a",
    choices: [
      { label: "-r", value: "-r" },
      { label: "-a", value: "-a" },
      { label: "-v", value: "-v" },
      { label: "--merged", value: "--merged" },
    ],
  },
  "featured.ts": {
    answer: "true",
    choices: [
      { label: "false", value: "false" },
      { label: "true", value: "true" },
      { label: "null", value: "null" },
      { label: "undefined", value: "undefined" },
    ],
  },
  "route.ts": {
    answer: "flagship",
    choices: [
      { label: "projects", value: "projects" },
      { label: "contact", value: "contact" },
      { label: "flagship", value: "flagship" },
      { label: "south", value: "south" },
    ],
  },
  "contact.tsx": {
    answer: "contact",
    choices: [
      { label: "profile", value: "profile" },
      { label: "resume", value: "resume" },
      { label: "projects", value: "projects" },
      { label: "contact", value: "contact" },
    ],
  },
};

const quizState = new Map<string, QuizState>();
const mobileQuery = window.matchMedia("(max-width: 860px)");
let refreshQueued = false;

const getFileName = (form: HTMLFormElement) => {
  const text = form.querySelector<HTMLElement>(".editor-file")?.textContent ?? "";
  return Object.keys(quizByFile).find((file) => text.includes(file)) ?? "";
};

const getState = (file: string) => {
  const existing = quizState.get(file);
  if (existing) return existing;
  const created: QuizState = { strikes: 0, wrongValues: new Set<string>(), locked: false };
  quizState.set(file, created);
  return created;
};

const findActionButton = (form: HTMLFormElement, label: string) =>
  Array.from(form.querySelectorAll<HTMLButtonElement>(".editor-actions button")).find(
    (button) => button.textContent?.trim().toLowerCase() === label.toLowerCase(),
  );

const revealHint = (form: HTMLFormElement) => {
  if (form.querySelector(".editor-hint")) return;
  findActionButton(form, "Hint")?.click();
};

const revealAnswer = (form: HTMLFormElement) => {
  if (form.querySelector(".editor-answer")) return;
  findActionButton(form, "Reveal answer")?.click();
};

const setReactInputValue = (input: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
};

const enhanceChallenge = (form: HTMLFormElement) => {
  const file = getFileName(form);
  const config = quizByFile[file];
  if (!config || form.querySelector(".multiple-choice-quiz")) return;

  const body = form.querySelector<HTMLElement>(".editor-body");
  const answerRow = form.querySelector<HTMLElement>(".editor-answer-row");
  const input = answerRow?.querySelector<HTMLInputElement>("input");
  if (!body || !answerRow || !input) return;

  const state = getState(file);
  form.classList.add("is-multiple-choice");

  const quiz = document.createElement("div");
  quiz.className = "multiple-choice-quiz";
  quiz.setAttribute("role", "group");
  quiz.setAttribute("aria-label", "Multiple choice answers");

  const heading = document.createElement("div");
  heading.className = "multiple-choice-heading";
  const headingText = document.createElement("span");
  headingText.textContent = "Choose the missing code";
  const strikes = document.createElement("small");
  strikes.className = "multiple-choice-strikes";
  strikes.textContent = `${state.strikes}/2 strikes`;
  heading.append(headingText, strikes);

  const grid = document.createElement("div");
  grid.className = "multiple-choice-grid";

  const status = document.createElement("div");
  status.className = "multiple-choice-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.textContent = state.strikes === 0
    ? "Two misses reveal the answer. Your first miss unlocks the hint."
    : state.strikes === 1
      ? "Strike 1/2 · hint unlocked."
      : "Strike 2/2 · answer revealed and this route is unlocking.";

  config.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "multiple-choice-option";
    button.textContent = choice.label;
    button.dataset.choiceValue = choice.value;

    if (state.wrongValues.has(choice.value)) {
      button.classList.add("is-wrong");
      button.disabled = true;
      button.setAttribute("aria-label", `${choice.label}, incorrect`);
    }

    if (state.locked) button.disabled = true;

    button.addEventListener("click", () => {
      if (state.locked) return;

      if (choice.value === config.answer) {
        state.locked = true;
        button.classList.add("is-correct");
        grid.querySelectorAll<HTMLButtonElement>("button").forEach((option) => {
          option.disabled = true;
        });
        status.textContent = "Correct · compiling the next route…";
        setReactInputValue(input, choice.value);
        window.setTimeout(() => form.requestSubmit(), 70);
        return;
      }

      state.strikes += 1;
      state.wrongValues.add(choice.value);
      button.classList.add("is-wrong");
      button.disabled = true;
      strikes.textContent = `${state.strikes}/2 strikes`;

      if (state.strikes === 1) {
        status.textContent = "Strike 1/2 · hint unlocked below. Try one more option.";
        revealHint(form);
        return;
      }

      state.locked = true;
      grid.querySelectorAll<HTMLButtonElement>("button").forEach((option) => {
        option.disabled = true;
      });
      status.textContent = "Strike 2/2 · answer revealed. Unlocking the route automatically…";
      revealHint(form);
      window.setTimeout(() => revealAnswer(form), 80);
    });

    grid.append(button);
  });

  quiz.append(heading, grid, status);
  body.insertBefore(quiz, answerRow);
};

const setTextIfChanged = (element: HTMLElement, value: string) => {
  if (element.textContent !== value) element.textContent = value;
};

const updateDirectionalGuidance = () => {
  const mobile = mobileQuery.matches;
  const compactLabels = mobile
    ? ["1 · NEXT", "2 · THEN", "3 · CONTINUE"]
    : ["← LEFT", "RIGHT →", "↓ SOUTH"];

  document.querySelectorAll<HTMLElement>(".project-root-card .root-directions-mini span b").forEach((label, index) => {
    const value = compactLabels[index];
    if (value) setTextIfChanged(label, value);
  });

  const rootDescription = document.querySelector<HTMLElement>(".project-root-card > p");
  if (rootDescription) {
    setTextIfChanged(
      rootDescription,
      mobile
        ? "On smaller screens the project map flows top-to-bottom. Follow the numbered route."
        : "Choose a direction. Each path has a different purpose.",
    );
  }

  const rootAction = document.querySelector<HTMLElement>(".project-root-card > em");
  if (rootAction) {
    const desiredText = mobile ? "Open route guide " : "Open map guide ";
    const textNode = Array.from(rootAction.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode && textNode.nodeValue !== desiredText) textNode.nodeValue = desiredText;
  }

  const modalLabels = mobile
    ? ["1 · NEXT", "2 · THEN", "3 · CONTINUE"]
    : ["← LEFT", "RIGHT →", "↓ SOUTH"];

  document.querySelectorAll<HTMLElement>(".root-directions article > span").forEach((label, index) => {
    const value = modalLabels[index];
    if (value) setTextIfChanged(label, value);
  });
};

const addPolishHooks = () => {
  document.querySelectorAll<HTMLFormElement>("form.challenge-terminal").forEach(enhanceChallenge);
  document.querySelectorAll<HTMLElement>(".node-dot").forEach((node) => node.classList.add("is-polished-node"));
  updateDirectionalGuidance();
};

const queueRefresh = () => {
  if (refreshQueued) return;
  refreshQueued = true;
  window.requestAnimationFrame(() => {
    refreshQueued = false;
    addPolishHooks();
  });
};

const observer = new MutationObserver(queueRefresh);
observer.observe(document.body, { childList: true, subtree: true });
mobileQuery.addEventListener("change", queueRefresh);
window.addEventListener("resize", queueRefresh, { passive: true });

queueRefresh();
