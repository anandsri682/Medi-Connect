import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PatientDashboard.css";

export default function PatientDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">

      <div className="dashboard-card">
        <h2>Welcome, {user?.name}</h2>

        <p>Email: {user?.email}</p>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

    </div>
  );
}