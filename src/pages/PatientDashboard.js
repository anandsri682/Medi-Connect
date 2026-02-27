import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/PatientDashboard.css";

const PatientDashboard = () => {

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setPatient(JSON.parse(storedUser));
    }
  }, []);

  if (!patient) return null;

  return (
    <div className="dashboard-wrapper">

      <Sidebar />

      <div className="main-content">

        <h1 className="page-title">Patient Profile</h1>

        <div className="glass-container">

          {/* LEFT SECTION */}
          <div className="left-section">

            <div className="profile-top">
              <img
                src="https://i.pravatar.cc/120"
                alt="avatar"
                className="avatar"
              />

              <div>
                <h2>{patient.name}</h2>
                <span className="patient-id">
                  Patient ID: PT-{patient.id}
                </span>
              </div>
            </div>

            <div className="contact-box">
              <div>📞 {patient.phoneNumber}</div>
              <div>📧 {patient.email}</div>
              <div>📍 {patient.address}</div>
            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="right-section">

            <div className="info-card">
              <h3>Personal Info</h3>

              <div className="info-grid">

                <div className="mini-box">
                  <p>Gender</p>
                  <h4>{patient.gender}</h4>
                </div>

                <div className="mini-box">
                  <p>Blood Group</p>
                  <h4>{patient.bloodGroup}</h4>
                </div>

                <div className="mini-box">
                  <p>Age</p>
                  <h4>{patient.age}</h4>
                </div>

              </div>
            </div>

            <div className="appointment-card">
              <h3>Appointments</h3>

              <p>No upcoming appointments</p>

              <button
                className="view-btn"
                onClick={() => window.location.href = "/"}
              >
                Book New Appointment →
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PatientDashboard;