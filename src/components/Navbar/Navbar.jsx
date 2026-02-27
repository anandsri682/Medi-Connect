import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    // Listen for login/logout changes
    window.addEventListener("authChange", loadUser);

    return () => {
      window.removeEventListener("authChange", loadUser);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">

        <div className="logo" onClick={() => navigate("/")}>
          MediConnect
        </div>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/contact")}>Contact</li>

          {!user ? (
            <>
              <li onClick={() => navigate("/auth")}>Patient Login</li>
              <li onClick={() => navigate("/organizationlogin")}>
                Hospital Login
              </li>
            </>
          ) : (
            <li
              className="profile"
              onClick={() => navigate("/patient-dashboard")}
            >
              <FaUserCircle className="profile-icon" />
              <span>{user.name}</span>
            </li>
          )}
        </ul>

      </div>
    </header>
  );
}