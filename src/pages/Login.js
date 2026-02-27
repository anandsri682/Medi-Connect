import React, { useState } from "react";
import "../styles/Login.css";

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage(data.message || "Login Successful");
      } else {
        setSuccess(false);
        setMessage(data.message || "Login Failed");
      }

    } catch (error) {
      setSuccess(false);
      setMessage("Server Error");
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="login-page">

      {message && (
        <div className={`toast ${success ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <div className="login-card">

        {/* LEFT SIDE FORM */}
        <div className="login-form-section">
          <h1>Welcome Back</h1>
          <p>Login to access your healthcare dashboard</p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit">Sign In</button>

          </form>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="login-image-section">
          <div className="overlay-text">
            Your Health. Our Priority.
          </div>
        </div>

      </div>
    </div>
  );
}