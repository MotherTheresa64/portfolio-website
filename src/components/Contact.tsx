import { useState } from "react";
import { FaEnvelope, FaBriefcase } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Get In Touch</h2>
        <p className="text-center text-sm text-gray-600 mb-10">
          Interested in working together? Send me a message or email me directly at <br />
          <span className="font-medium text-gray-800">noah.j.ragan@gmail.com</span>
        </p>

        <div className="flex flex-col md:flex-row gap-10 justify-between">
          {/* Contact Info */}
          <div className="md:w-1/2 text-sm text-gray-700 space-y-6">
            <div>
              <h3 className="font-semibold text-md mb-2">Let’s Create Something Amazing</h3>
              <p>
                I’m always excited to work on new projects and collaborate with fellow developers, designers, and entrepreneurs.
                Whether you have a specific project in mind or just want to discuss ideas, I’d love to hear from you.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-gray-600" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-700">noah.j.ragan@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaBriefcase className="mt-1 text-gray-600" />
              <div>
                <p className="font-medium">Available For</p>
                <p className="text-gray-700">Full-time opportunities, freelance projects, and collaborations</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="md:w-1/2 space-y-4 bg-gray-50 p-6 rounded-lg shadow border"
          >
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter your name"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded text-sm bg-white text-gray-800"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded text-sm bg-white text-gray-800"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                placeholder="Tell me about your project or say hello..."
                rows={5}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded text-sm bg-white text-gray-800"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            {submitted && (
              <p className="text-green-600 text-sm font-medium">✅ Message sent successfully!</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm w-full"
            >
              {submitting ? "Sending..." : " Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
