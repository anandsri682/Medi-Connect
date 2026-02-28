import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
  FaHospital,
  FaSignOutAlt
} from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [clinic, setClinic] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // ==============================
  // 🔐 LOAD AUTH DATA
  // ==============================
  const loadAuth = () => {
    const storedUser = localStorage.getItem("user");
    const storedClinic = localStorage.getItem("clinic");

    setUser(storedUser ? JSON.parse(storedUser) : null);
    setClinic(storedClinic ? JSON.parse(storedClinic) : null);
  };

  useEffect(() => {
    loadAuth();

    window.addEventListener("authChange", loadAuth);

    return () => {
      window.removeEventListener("authChange", loadAuth);
    };
  }, []);

  // ==============================
  // 🚪 LOGOUT FUNCTION
  // ==============================
  const handleLogout = () => {
    localStorage.clear(); // clears patientId, token, role, user, clinic

    window.dispatchEvent(new Event("authChange"));

    navigate("/");
  };

  // ==============================
  // 🎨 UI
  // ==============================
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          MediConnect
        </div>

        {/* Mobile Menu Toggle */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>

        {/* Navigation Links */}
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>

          <li onClick={() => navigate("/")}>
            <FaHome /> <span>Home</span>
          </li>

          <li onClick={() => navigate("/about")}>
            <FaInfoCircle /> <span>About</span>
          </li>

          <li onClick={() => navigate("/contact")}>
            <FaEnvelope /> <span>Contact</span>
          </li>

          {/* If no one logged in */}
          {!user && !clinic && (
            <>
              <li onClick={() => navigate("/auth")}>
                <FaUser /> <span>Patient Login</span>
              </li>

              <li onClick={() => navigate("/organizationlogin")}>
                <FaHospital /> <span>Hospital Login</span>
              </li>
            </>
          )}

          {/* Patient Logged In */}
          {user && (
            <>
              <li
                className="profile"
                onClick={() => navigate("/patient-dashboard")}
              >
                <FaUserCircle className="profile-icon" />
                <span>{user.name}</span>
              </li>

              <li onClick={handleLogout}>
                <FaSignOutAlt /> <span>Logout</span>
              </li>
            </>
          )}

          {/* Hospital Logged In */}
          {clinic && (
            <>
              <li
                className="profile"
                onClick={() => navigate("/organization-dashboard")}
              >
                <FaHospital className="profile-icon" />
                <span>{clinic.hospitalName}</span>
              </li>

              <li onClick={handleLogout}>
                <FaSignOutAlt /> <span>Logout</span>
              </li>
            </>
          )}

        </ul>

      </div>
    </header>
  );
}