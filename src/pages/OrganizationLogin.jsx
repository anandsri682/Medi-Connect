import React, { useState } from "react";
import "../styles/Organization.css";
import { useNavigate } from "react-router-dom";

const OrganizationLogin = () => {

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hospitalName: "",
    mail: "",
    contactNumber: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url;
    let payload;

    if (isLogin) {
      url = "https://mediconnect-production-00d8.up.railway.app/mediconnect/api/clinic/login";
      payload = {
        mail: formData.mail,
        password: formData.password
      };
    } else {

      if (formData.password !== formData.confirmPassword) {
        setSuccess(false);
        setMessage("Passwords do not match");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      url = "https://mediconnect-production-00d8.up.railway.app/mediconnect/api/clinic/register";

      payload = {
        hospitalName: formData.hospitalName,
        mail: formData.mail,
        contactNumber: formData.contactNumber,
        address: formData.address,
        password: formData.password
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {

        setSuccess(true);
        setMessage(isLogin ? "Login Successful" : "Registration Successful");

        // ✅ ONLY STORE CLINIC DURING LOGIN
        if (isLogin) {

          // Backend may return:
          // 1. { message, clinic: {...} }
          // 2. {...clinicObject}
          const clinicData = data.clinic ? data.clinic : data;

          if (clinicData && clinicData.id) {
            localStorage.setItem("clinic", JSON.stringify(clinicData));
            window.dispatchEvent(new Event("authChange"));
          } else {
            console.log("Invalid clinic data:", data);
          }

          navigate("/organization-dashboard");
        } else {
          setIsLogin(true);
        }

      } else {
        setSuccess(false);
        setMessage(data.message || "Something went wrong");
      }

    } catch (error) {
      console.log("Server error:", error);
      setSuccess(false);
      setMessage("Server error");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="org-page">

      {message && (
        <div className={`toast ${success ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <div className="org-card">

        <h2>{isLogin ? "Clinic Login" : "Clinic Register"}</h2>

        <form onSubmit={handleSubmit}>

          {isLogin ? (
            <>
              <input
                type="email"
                name="mail"
                placeholder="Official Email"
                value={formData.mail}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <input
                name="hospitalName"
                placeholder="Hospital Name"
                value={formData.hospitalName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="mail"
                placeholder="Official Email"
                value={formData.mail}
                onChange={handleChange}
                required
              />

              <input
                name="contactNumber"
                placeholder="Contact Number"
                maxLength="10"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />

              <input
                name="address"
                placeholder="Hospital Address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit" className="org-btn">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <div className="toggle-text">
          {isLogin ? (
            <>
              Don’t have an account?
              <span onClick={() => setIsLogin(false)}> Register</span>
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
};

export default OrganizationLogin;