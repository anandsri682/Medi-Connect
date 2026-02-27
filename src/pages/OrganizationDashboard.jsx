import React from "react";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck
} from "react-icons/fa";
import "../styles/OrganizationDashboard.css";

const OrganizationDashboard = () => {
  return (
    <div className="org-container">

      <div className="org-main">
        <h1>Organization Dashboard</h1>
        <p>Hospital Management System</p>

        <div className="org-card-group">

          <div className="org-card patients">
            <FaUserInjured className="card-icon" />
            <h2>Patients</h2>
            <p>View and manage patient records</p>
            <button>Manage Patients</button>
          </div>

          <div className="org-card doctors">
            <FaUserMd className="card-icon" />
            <h2>Doctors</h2>
            <p>Manage doctors and specializations</p>
            <button>Manage Doctors</button>
          </div>

          <div className="org-card appointments">
            <FaCalendarCheck className="card-icon" />
            <h2>Appointments</h2>
            <p>Schedule and manage appointments</p>
            <button>Manage Appointments</button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default OrganizationDashboard;