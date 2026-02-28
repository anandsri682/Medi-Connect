import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHospital, FaMapMarkerAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";
import "../styles/LandingPage.css";

// import HealthSlider from "./HealthSlider";

export default function LandingPage() {

  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await fetch("https://mediconnect-production-00d8.up.railway.app/mediconnect/all");
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error("Error fetching hospitals");
    }
  };

  const handleOpenClinic = (hospital) => {
    navigate(`/clinic/${hospital.id}`, {
      state: { clinic: hospital }
    });
  };

  return (
    <div className="landing-container">

      {/* ✅ SLIDER FIRST */}
      {/* <HealthSlider /> */}
    
      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Find the Best <span className="highlight">Hospitals</span>
          </h1>
          <p>
            Explore trusted hospitals and book appointments easily with our
            Hospital Management System.
          </p>
        </div>
      </div>

      {/* HOSPITAL GRID */}
      <div className="hospital-grid">

        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="hospital-card"
            onClick={() => handleOpenClinic(hospital)}
          >

            <div className="card-header">
              <div className="icon-wrapper">
                <FaHospital className="hospital-icon" />
              </div>
              <h3>{hospital.hospitalName}</h3>
            </div>

            <div className="card-body">

              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon text-accent" />
                <span>{hospital.address}</span>
              </div>

              <div className="detail-item">
                <FaEnvelope className="detail-icon text-secondary" />
                <span>{hospital.mail}</span>
              </div>

            </div>

            <div className="card-footer">
              <button className="action-button">
                Open Details
                <FaArrowRight className="btn-icon" />
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}