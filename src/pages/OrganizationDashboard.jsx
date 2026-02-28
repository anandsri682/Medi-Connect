import React, { useState } from "react";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck
} from "react-icons/fa";
import "../styles/OrganizationDashboard.css";

const BASE_URL = "https://mediconnect-production-00d8.up.railway.app";

const OrganizationDashboard = () => {

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* ================= GET CLINIC ID ================= */

  const getClinicId = () => {
    const storedClinic = localStorage.getItem("clinic");
    if (!storedClinic) {
      alert("Please login again.");
      return null;
    }
    const clinic = JSON.parse(storedClinic);
    return clinic?.id || null;
  };

  /* ================= FETCH APPOINTMENTS ================= */

  const fetchAppointmentsByClinic = async () => {
    const clinicId = getClinicId();
    if (!clinicId) return [];

    const response = await fetch(
      `${BASE_URL}/mediconnect/api/appointments/clinic/${clinicId}`
    );

    if (!response.ok) throw new Error("API failed");

    return await response.json();
  };

  const handleManageAppointments = async () => {
    setActiveSection("appointments");
    setLoading(true);

    try {
      const data = await fetchAppointmentsByClinic();
      setAppointments(Array.isArray(data) ? data : []);
      setDoctors([]);
      setPatients([]);
    } catch (error) {
      console.log(error);
      setAppointments([]);
    }

    setLoading(false);
  };

  /* ================= FETCH DOCTORS ================= */

  const handleManageDoctors = async () => {
    setActiveSection("doctors");
    setLoading(true);

    try {
      const data = await fetchAppointmentsByClinic();

      // Extract unique doctors
      const uniqueDoctors = [
        ...new Map(
          data.map(a => [a.doctor?.id, a.doctor])
        ).values()
      ];

      setDoctors(uniqueDoctors);
      setAppointments([]);
      setPatients([]);

    } catch (error) {
      console.log(error);
      setDoctors([]);
    }

    setLoading(false);
  };

  /* ================= FETCH PATIENTS ================= */

  const handleManagePatients = async () => {
    setActiveSection("patients");
    setLoading(true);

    try {
      const data = await fetchAppointmentsByClinic();

      // Extract unique patients
      const uniquePatients = [
        ...new Map(
          data.map(a => [a.patient?.id, a.patient])
        ).values()
      ];

      setPatients(uniquePatients);
      setAppointments([]);
      setDoctors([]);

    } catch (error) {
      console.log(error);
      setPatients([]);
    }

    setLoading(false);
  };

  return (
    <div className="org-container">
      <div className="org-main">

        <h1>Organization Dashboard</h1>
        <p>Hospital Management System</p>

        <div className="org-card-group">

          <div className="org-card patients">
            <FaUserInjured className="card-icon" />
            <h2>Patients</h2>
            <button onClick={handleManagePatients}>
              Manage Patients
            </button>
          </div>

          <div className="org-card doctors">
            <FaUserMd className="card-icon" />
            <h2>Doctors</h2>
            <button onClick={handleManageDoctors}>
              Manage Doctors
            </button>
          </div>

          <div className="org-card appointments">
            <FaCalendarCheck className="card-icon" />
            <h2>Appointments</h2>
            <button onClick={handleManageAppointments}>
              Manage Appointments
            </button>
          </div>

        </div>

        {loading && <p className="loading-text">Loading...</p>}

        {/* ================= APPOINTMENTS ================= */}

        {activeSection === "appointments" && !loading && (
          appointments.length > 0 ? (
            appointments.map((appt) => (
              <div key={appt.id} className="appointment-card-new">
                <h3>Appointment #{appt.id}</h3>
                <p><strong>Patient:</strong> {appt.patient?.name}</p>
                <p><strong>Doctor:</strong> {appt.doctor?.doctorName}</p>
                <p><strong>Date:</strong> {appt.appointmentDate}</p>
                <p><strong>Status:</strong> {appt.appointmentStatus}</p>
              </div>
            ))
          ) : (
            <p className="no-data">No appointments found</p>
          )
        )}

        {/* ================= DOCTORS ================= */}

        {activeSection === "doctors" && !loading && (
          doctors.length > 0 ? (
            <div className="doctor-grid">
              {doctors.map((doc) => (
                <div key={doc.id} className="doctor-card-new">
                  <h3>{doc.doctorName}</h3>
                  <p><strong>Specialization:</strong> {doc.specialization}</p>
                  <p><strong>Experience:</strong> {doc.experience} years</p>
                  <p><strong>Fee:</strong> ₹{doc.consultationFee}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No doctors found</p>
          )
        )}

        {/* ================= PATIENTS ================= */}

        {activeSection === "patients" && !loading && (
          patients.length > 0 ? (
            <div className="doctor-grid">
              {patients.map((pat) => (
                <div key={pat.id} className="doctor-card-new">
                  <h3>{pat.name}</h3>
                  <p><strong>Email:</strong> {pat.email}</p>
                  <p><strong>Phone:</strong> {pat.phoneNumber}</p>
                  <p><strong>Address:</strong> {pat.address}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No patients found</p>
          )
        )}

      </div>
    </div>
  );
};

export default OrganizationDashboard;