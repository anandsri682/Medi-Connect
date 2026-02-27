import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-page">

      <div className="about-hero">
        <h1>About MediConnect</h1>
        <p>
          Transforming healthcare by connecting clinics and patients through
          a seamless digital platform.
        </p>
      </div>

      <div className="about-section">

        <div className="about-card">
          <h2>🎯 Our Mission</h2>
          <p>
            To simplify healthcare access by enabling patients to book
            appointments online and helping clinics manage operations efficiently.
          </p>
        </div>

        <div className="about-card">
          <h2>🚀 Our Vision</h2>
          <p>
            To build a scalable healthcare marketplace platform similar to
            food delivery systems, but dedicated to medical services.
          </p>
        </div>

        <div className="about-card">
          <h2>💡 What We Provide</h2>
          <ul>
            <li>✔ Online Appointment Booking</li>
            <li>✔ Multi-Clinic Registration</li>
            <li>✔ Role-Based Secure Access</li>
            <li>✔ Appointment Tracking</li>
            <li>✔ Digital Health Management</li>
          </ul>
        </div>

      </div>

    </div>
  );
}