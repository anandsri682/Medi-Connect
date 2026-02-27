import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OrganizationDashboard.css";

export default function ClinicDashboard() {

  const location = useLocation();
  const navigate = useNavigate();

  const clinic = location.state?.clinic; // ✅ receive passed data

  // If user directly refreshes page
  if (!clinic) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>No clinic data found</h2>
        <button onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="org-container">

      <div className="org-main">
        <h1>{clinic.hospitalName}</h1>
        <p>{clinic.address}</p>
        <p>{clinic.mail}</p>

        <div className="org-card-group">

          <div className="org-card">
            <h2>Patients</h2>
            <p>Manage patient records</p>
          </div>

          <div className="org-card">
            <h2>Doctors</h2>
            <p>Manage doctors & specializations</p>
          </div>

          <div className="org-card">
            <h2>Appointments</h2>
            <p>Manage appointments</p>
          </div>

        </div>
      </div>

    </div>
  );
}