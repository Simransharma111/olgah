import React, { useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${BACKEND}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Try again!");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F6F1EA] flex justify-center items-center py-16 px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-8">
        <h2 className="text-3xl font-serif mb-6 text-[#A67B5B]">Contact Us</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg h-32 resize-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              isSubmitting ? "bg-gray-400" : "bg-[#A67B5B] hover:bg-[#8B674A]"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
