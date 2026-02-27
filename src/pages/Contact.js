import React, { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can connect backend here
    console.log(formData);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contact-page">

      {submitted && (
        <div className="contact-toast">
          Message Sent Successfully 🚀
        </div>
      )}

      <div className="contact-card">

        <h2>Contact Us</h2>
        <p>We would love to hear from you</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>
            <option>General Inquiry</option>
            <option>Clinic Registration</option>
            <option>Technical Support</option>
            <option>Partnership</option>
          </select>

          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="contact-btn">
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
}