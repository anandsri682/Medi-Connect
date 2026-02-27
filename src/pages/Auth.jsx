import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaTint,
  FaMapMarkerAlt,
  FaBirthdayCake
} from "react-icons/fa";
import "../styles/Auth.css";

export default function Auth() {
const navigate= useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    gender: "",
    age: "",
    aadhaarNumber: "",
    bloodGroup: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  const [phoneOrAadhaar, setPhoneOrAadhaar] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Aadhaar format
    if (name === "aadhaarNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 12);
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
      setFormData({ ...formData, aadhaarNumber: formatted });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url;
    let payload;

    if (isLogin) {
      url = "https://mediconnect-production-00d8.up.railway.app/mediconnect/api/patients/login";
      payload = {
        phoneOrAadhaar,
        password: formData.password
      };
    } else {
      if (formData.password !== formData.confirmPassword) {
        setSuccess(false);
        setMessage("Passwords do not match");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      url = "https://mediconnect-production-00d8.up.railway.app/mediconnect/api/patients/register";
      payload = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        aadhaarNumber: formData.aadhaarNumber.replace(/\s/g, ""),
        gender: formData.gender,
        age: Number(formData.age),
        address: formData.address,
        bloodGroup: formData.bloodGroup,
        password: formData.password
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

    if (response.ok) {
  setSuccess(true);
  setMessage("Login Successful");

  // Save complete user
  localStorage.setItem("user", JSON.stringify(data));

  // 🔥 Save patientId separately
  localStorage.setItem("patientId", data.id);

  navigate("/patient-dashboard");

}else {
        setSuccess(false);
        setMessage(data.message || "Something went wrong");
      }

    } catch (error) {
      setSuccess(false);
      setMessage("Server error");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="auth-page">

      {message && (
        <div className={`toast ${success ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <div className="auth-card">

        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        <form onSubmit={handleSubmit}>

          {/* LOGIN */}
          {isLogin && (
            <>
              <div className="input-group">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Phone or Aadhaar"
                  value={phoneOrAadhaar}
                  onChange={(e) => setPhoneOrAadhaar(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <FaLock className="icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {/* REGISTER */}
          {!isLogin && (
            <>
              <div className="input-group">
                <FaUser className="icon" />
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaPhone className="icon" />
                <input
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaIdCard className="icon" />
                <input
                  name="aadhaarNumber"
                  placeholder="Aadhaar Number"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaBirthdayCake className="icon" />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaMapMarkerAlt className="icon" />
                <input
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaTint className="icon" />
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

              <div className="input-group">
                <FaLock className="icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaLock className="icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="primary-btn">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <div className="toggle-text">
          {isLogin ? (
            <>
              Don't have an account?
              <span onClick={() => setIsLogin(false)}> Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?
              <span onClick={() => setIsLogin(true)}> Login</span>
            </>
          )}
        </div>

      </div>
    </div>
  );
}