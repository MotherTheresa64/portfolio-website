import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/mrbkdgvz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Unable to send message");
      setFormData({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white dark:bg-dark">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 items-start">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">CONTACT</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-5 text-textMain dark:text-white">Looking for someone who can build across the stack?</h2>
          <p className="text-textSubtle dark:text-gray-300 leading-relaxed mb-7">I’m currently open to remote Full Stack, Frontend, Backend, and Software Engineer opportunities.</p>
          <div className="space-y-3 text-sm">
            <a className="flex items-center gap-3 text-textMain dark:text-white" href="mailto:noah.j.ragan@gmail.com"><FaEnvelope /> noah.j.ragan@gmail.com</a>
            <a className="flex items-center gap-3 text-textMain dark:text-white" href="https://www.linkedin.com/in/njragandev/" target="_blank" rel="noopener noreferrer"><FaLinkedin /> linkedin.com/in/njragandev</a>
            <a className="flex items-center gap-3 text-textMain dark:text-white" href="https://github.com/MotherTheresa64" target="_blank" rel="noopener noreferrer"><FaGithub /> github.com/MotherTheresa64</a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-7 space-y-4">
          <label className="block text-sm font-medium">Name<input className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></label>
          <label className="block text-sm font-medium">Email<input className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark" required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></label>
          <label className="block text-sm font-medium">Message<textarea className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark" required rows={6} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} /></label>
          <button className="btn w-full justify-center" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
          {status === "sent" && <p className="text-sm text-green-600">Message sent. Thanks!</p>}
          {status === "error" && <p className="text-sm text-red-600">That didn’t send. Email me directly at noah.j.ragan@gmail.com.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
