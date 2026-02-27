
import React from "react";
import "../styles/Register.css";

export default function Register() {
  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Patient Registration</h2>

        <form>

          <div className="form-row">
            <input type="text" placeholder="Full Name" required />
            <input type="number" placeholder="Phone Number" required />
          </div>

          <div className="form-row">
            <input type="email" placeholder="Email (Optional)" />
            <select required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-row">
            <input type="number" placeholder="Age" required />
            <input type="text" placeholder="Aadhaar Number" required />
          </div>

          <div className="form-row">
            <input type="text" placeholder="Blood Group" required />
          </div>

          <textarea placeholder="Address" required></textarea>

          <button type="submit" className="register-btn">
            Register
          </button>

        </form>
      </div>
    </div>
  );
}