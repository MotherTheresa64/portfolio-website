import { useState, useEffect } from "react";
import { FaEnvelope, FaBriefcase } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name ? "" : "Name is required",
      email: validateEmail(formData.email) ? "" : "Valid email required",
      message: formData.message ? "" : "Message cannot be empty",
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    setSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mrbkdgvz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert("There was an error sending your message.");
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section id="contact" className="py-24 px-6 bg-white dark:bg-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-textMain dark:text-white">
            Get In Touch
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-10">
            Interested in working together? Send me a message or email me directly at <br />
            <span className="font-medium text-gray-800 dark:text-white">noah.j.ragan@gmail.com</span>
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10 justify-between">
          <motion.div
            className="md:w-1/2 text-sm text-gray-700 dark:text-gray-300 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <div>
              <h3 className="font-semibold text-md mb-2 text-textMain dark:text-white">
                Let’s Create Something Amazing
              </h3>
              <p>
                I’m always excited to work on new projects and collaborate with fellow developers,
                designers, and entrepreneurs. Whether you have a specific project in mind or just
                want to discuss ideas, I’d love to hear from you.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-gray-600 dark:text-gray-300" />
              <div>
                <p className="font-medium text-textMain dark:text-white">Email</p>
                <p className="text-gray-700 dark:text-gray-300">noah.j.ragan@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaBriefcase className="mt-1 text-gray-600 dark:text-gray-300" />
              <div>
                <p className="font-medium text-textMain dark:text-white">Available For</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Full-time opportunities, freelance projects, and collaborations
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="md:w-1/2 space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            {[
              { label: "Your Name", name: "name", type: "text" },
              { label: "Your Email", name: "email", type: "email" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300 block mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={`Enter your ${name}`}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-dark text-gray-800 dark:text-white"
                />
                {errors[name as keyof typeof errors] && (
                  <p className="text-red-500 text-xs mt-1">{errors[name as keyof typeof errors]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-300 block mb-1">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me about your project or say hello..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-dark text-gray-800 dark:text-white"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            {submitted && (
              <p className="text-green-600 text-sm font-medium">
                ✅ Message sent successfully!
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn w-full"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
