import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/Appointment.css";

export default function BookAppointment() {

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [clinic, setClinic] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    doctorId: "",
    date: ""
  });

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

  const doctors = [
    { id: 1, name: "Dr. Sarah Williams - Cardiologist" },
    { id: 2, name: "Dr. James Miller - Dermatologist" },
    { id: 3, name: "Dr. Emily Patel - Neurologist" }
  ];

  // ===============================
  // 🔐 LOGIN CHECK (FIXED)
  // ===============================
  useEffect(() => {

    const user = localStorage.getItem("user");
    const patientId = localStorage.getItem("patientId");

    if (!user || !patientId) {
      navigate("/auth");
      return;
    }

    // Load clinic
    if (location.state?.clinic) {
      setClinic(location.state.clinic);
      return;
    }

    if (id) {
      fetch("http://10.26.3.179:8080/mediconnect/all")
        .then(res => res.json())
        .then(data => {
          const foundClinic = data.find(c => c.id === Number(id));
          if (foundClinic) {
            setClinic(foundClinic);
          } else {
            navigate("/");
          }
        })
        .catch(() => navigate("/"));
    } else {
      navigate("/");
    }

  }, [location, id, navigate]);

  // ===============================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const convertToTimeString = (slot) => {
    const [time, period] = slot.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:00`;
  };

  // ===============================
  // 📤 SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientId = localStorage.getItem("patientId");

    if (!patientId) {
      setSuccess(false);
      setMessage("Please login first");
      navigate("/auth");
      return;
    }

    if (!selectedSlot) {
      setSuccess(false);
      setMessage("Please select time slot");
      return;
    }

    if (!formData.date) {
      setSuccess(false);
      setMessage("Please select date");
      return;
    }

    if (!formData.doctorId) {
      setSuccess(false);
      setMessage("Please select doctor");
      return;
    }

    const payload = {
      patientId: Number(patientId),
      clinicId: clinic.id,
      doctorId: Number(formData.doctorId),
      appointmentDate: formData.date,
      startTime: convertToTimeString(selectedSlot)
    };

    try {
      setLoading(true);

      const response = await fetch(
        "https://mediconnect-production-00d8.up.railway.app/mediconnect/api/appointments/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage("Appointment Booked Successfully");

        setTimeout(() => {
          navigate("/patient-dashboard", {
            state: { activeTab: "appointments" }
          });
        }, 1500);

      } else {
        setSuccess(false);
        setMessage(data.message || "Booking Failed");
      }

    } catch (error) {
      setSuccess(false);
      setMessage("Server Error");
    } finally {
      setLoading(false);
    }

    setTimeout(() => setMessage(""), 4000);
  };

  if (!clinic) return null;

  return (
    <div className="booking-bg">

      {message && (
        <div className={`toast ${success ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <div className="booking-container">

        <div className="clinic-name-bar">
          {clinic.hospitalName}
        </div>

        <h1>Book an Appointment</h1>

        <form onSubmit={handleSubmit}>

          <h3>Select Time Slot</h3>

          <div className="slots">
            {timeSlots.map((slot, index) => (
              <button
                type="button"
                key={index}
                className={selectedSlot === slot ? "slot active" : "slot"}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="doctor-row">

            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
            />

          </div>

          <button type="submit" className="book-btn" disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </button>

        </form>
      </div>
    </div>
  );
}