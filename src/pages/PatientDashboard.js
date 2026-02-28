import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/PatientDashboard.css";

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setPatient(JSON.parse(storedUser));
    }
  }, []);

  // 🔥 Auto load appointments when tab changes
  useEffect(() => {
    if (activeTab === "appointments" && patient) {
      fetchAppointments();
    }
  }, [activeTab, patient]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://mediconnect-production-00d8.up.railway.app/mediconnect/api/appointments/patient/${patient.id}`
      );
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.log("Error fetching appointments:", error);
    }
    setLoading(false);
  };

  if (!patient) return null;

  return (
    <div className="dashboard-wrapper">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="main-content">
        <h1 className="page-title">Patient Dashboard</h1>

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

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="info-card">
                <h3>Personal Info</h3>
                <div className="info-grid">
                  <div className="mini-box">
                    <p>Gender</p>
                    <h4>{patient.gender || "Not Provided"}</h4>
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
            )}

            {/* APPOINTMENTS TAB */}
            {activeTab === "appointments" && (
              <div className="appointment-card">
                <h3>My Appointments</h3>

                {loading && <p className="loading-text">Loading...</p>}

                {!loading && appointments.length === 0 && (
                  <p className="no-data">No appointments found</p>
                )}

                {!loading && appointments.length > 0 && (
                  <div className="appointments-list">
                    {appointments
                      .sort(
                        (a, b) =>
                          new Date(b.appointmentDate + "T" + b.startTime) -
                          new Date(a.appointmentDate + "T" + a.startTime)
                      )
                      .map((appt) => (
                        <div key={appt.id} className="appointment-item">

                          <div className="appointment-left">
                            <div className="appointment-date">
                              📅 {appt.appointmentDate}
                            </div>

                            <div className="appointment-time">
                              ⏰ {appt.startTime} → {appt.endTime}
                            </div>

                            <div className="appointment-doctor">
                              👨‍⚕️ {appt.doctor?.doctorName}
                              <span className="specialization">
                                ({appt.doctor?.specialization})
                              </span>
                            </div>

                            <div className="appointment-clinic">
                              🏥 {appt.clinic?.hospitalName}
                            </div>

                            <div className="appointment-amount">
                              💰 ₹{appt.amount}
                            </div>
                          </div>

                          <div className="appointment-right">
                            <span
                              className={`status-badge ${appt.appointmentStatus?.toLowerCase()}`}
                            >
                              {appt.appointmentStatus}
                            </span>

                            <span
                              className={`payment-badge ${appt.paymentStatus?.toLowerCase()}`}
                            >
                              {appt.paymentStatus}
                            </span>
                          </div>

                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;