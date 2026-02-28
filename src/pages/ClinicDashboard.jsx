import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ClinicDashboard.css";

export default function ClinicDashboard() {

  const location = useLocation();
  const navigate = useNavigate();
  const clinic = location.state?.clinic;

  if (!clinic) {
    return (
      <div className="clinic-error">
        <h2>Clinic data not available</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="clinic-container">

      {/* HERO SECTION */}
      <section className="clinic-hero">
        <div className="hero-left">
          <h4>Welcome to {clinic.hospitalName}</h4>
          <h1>On a Pursuit of Better Medicine</h1>
          <p>
            We provide trusted healthcare services with advanced medical facilities 
            and expert doctors for your well-being.
          </p>

          <button onClick={() =>           navigate(`/clinic/${clinic.id}/book`, {
  state: { clinic }
})}>
 
  Book Appointment
</button>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309"
            alt="Doctor"
          />
        </div>
      </section>


      {/* FEATURE CARDS */}
      <section className="clinic-features">
        <div className="feature-card">
          <h3>Our Doctors</h3>
          <p>Highly experienced and certified medical professionals.</p>
        </div>

        <div className="feature-card">
          <h3>Health Protection</h3>
          <p>Advanced equipment and safety protocols.</p>
        </div>

        <div className="feature-card">
          <h3>24/7 Services</h3>
          <p>Emergency support and continuous patient care.</p>
        </div>
      </section>


      {/* ABOUT SECTION */}
      <section className="clinic-about">
        <div className="about-left">
          <img
            src="https://images.unsplash.com/photo-1537368910025-700350fe46c7"
            alt="Doctor"
          />
        </div>

        <div className="about-right">
          <h2>Welcome To {clinic.hospitalName}</h2>
          <p>
            {clinic.hospitalName} is committed to delivering exceptional healthcare
            services. Our mission is to provide quality treatment with compassion.
          </p>

          <div className="about-info">
            <p><strong>Email:</strong> {clinic.mail}</p>
            <p><strong>Phone:</strong> {clinic.contactNumber}</p>
            <p><strong>Address:</strong> {clinic.address}</p>
          </div>
        </div>
      </section>


      {/* SERVICES SECTION */}
      <section className="clinic-services">
        <h2>Explore Our Services</h2>

        <div className="services-grid">
          <div className="service-card">Cardiology</div>
          <div className="service-card">Pulmonary</div>
          <div className="service-card">Neurology</div>
          <div className="service-card">Surgery</div>
          <div className="service-card">Lab Testing</div>
          <div className="service-card">Physiotherapy</div>
        </div>
      </section>

    </div>
  );
}