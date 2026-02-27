import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaHospital } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">

        <div className="logo" onClick={() => navigate("/")}>
          Medi-Connect
        </div>

        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/contact")}>Contact</li>

          {!user ? (
            <>
              {/* Patient Login */}
              <li className="login-btn" onClick={() => navigate("/auth")}>
                Patient Login
              </li>

              {/* Hospital Login */}
              <li
                className="hospital-btn"
                onClick={() => navigate("/organizationlogin")}
              >
                <FaHospital style={{ marginRight: "6px" }} />
                Hospital Login
              </li>
            </>
          ) : (
            <li
              className="profile-wrapper"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div
                className="profile-display"
                onClick={() => navigate("/patient-dashboard")}
              >
                <FaUserCircle className="profile-icon" />
                <span>{user.name}</span>
              </div>

              {showDropdown && (
                <div className="profile-dropdown">
                  <div onClick={() => navigate("/patient-dashboard")}>
                    Dashboard
                  </div>
                </div>
              )}
            </li>
          )}
        </ul>

      </div>
    </header>
  );
}