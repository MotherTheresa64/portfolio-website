import { useState } from "react";
import type { FormEvent } from "react";
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiRefreshCw, FiSend } from "react-icons/fi";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "../portfolio-data";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactPanel() {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    if (formData.website) return;

    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/mrbkdgvz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
      });
      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);
      setFormData({ name: "", email: "", message: "", website: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-layout">
      <div className="contact-direct">
        <p>Prefer the direct route? Every hiring-critical link stays available even if the form service is unavailable.</p>
        <div className="contact-link-grid">
          <a href={RESUME_URL} target="_blank" rel="noreferrer"><FiDownload aria-hidden="true" /><span><strong>Resume</strong><small>Open current PDF</small></span></a>
          <a href={`mailto:${EMAIL}`}><FiMail aria-hidden="true" /><span><strong>Email</strong><small>{EMAIL}</small></span></a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" /><span><strong>LinkedIn</strong><small>Professional profile</small></span></a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /><span><strong>GitHub</strong><small>Source and project history</small></span></a>
        </div>
      </div>

      <form className="contact-form" onSubmit={submit} aria-describedby="contact-status">
        <label>
          Name
          <input
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            maxLength={120}
            autoComplete="email"
            value={formData.email}
            onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
          />
        </label>
        <label>
          Message
          <textarea
            required
            minLength={10}
            maxLength={3000}
            rows={6}
            value={formData.message}
            onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
          />
        </label>
        <label className="honeypot" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(event) => setFormData((current) => ({ ...current, website: event.target.value }))}
          />
        </label>
        <button className="primary-button" type="submit" disabled={status === "sending"}>
          {status === "sending" ? <><FiRefreshCw className="spin" aria-hidden="true" /> Sending…</> : <><FiSend aria-hidden="true" /> Send message</>}
        </button>
        <div id="contact-status" className={`form-status status-${status}`} role="status" aria-live="polite">
          {status === "sent" && <p>Message sent successfully. Thanks — I’ll receive it through Formspree.</p>}
          {status === "error" && <p>The form service didn’t confirm delivery. Please use <a href={`mailto:${EMAIL}`}>{EMAIL}</a> instead, or retry.</p>}
          {status === "error" && <button type="button" onClick={() => setStatus("idle")}><FiRefreshCw aria-hidden="true" /> Retry form</button>}
        </div>
      </form>
    </div>
  );
}
