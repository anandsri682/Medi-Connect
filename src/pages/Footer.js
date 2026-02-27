import React from "react";
import { FaHospital, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Platform Info */}
        <div className="footer-section">
          <h2 className="footer-logo">
            <FaHospital /> MediConnect
          </h2>
          <p>
            MediConnect is a digital healthcare platform that enables clinics 
            to register, manage patients, and process online appointments seamlessly.
          </p>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Platform Services</h3>
          <ul>
            <li>Clinic Registration</li>
            <li>Online Appointments</li>
            <li>Patient Management</li>
            <li>Doctor Scheduling</li>
            <li>Secure Health Records</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Clinic Login</li>
            <li>Patient Login</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><FaEnvelope /> support@mediconnect.com</p>
          <p><FaPhone /> +91 98765 43210</p>
          <p><FaMapMarkerAlt /> Digital Healthcare Hub, India</p>

          <div className="social-icons">
            <FaLinkedin />
            <FaTwitter />
            <FaGithub />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MediConnect Platform | All Rights Reserved
      </div>

    </footer>
  );
}