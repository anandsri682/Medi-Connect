import React from "react";
import { 
  FaUser, 
  FaCalendarCheck, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("patientId");

  // Trigger re-render event
  window.dispatchEvent(new Event("authChange"));

  navigate("/");
};
  return (
    <div className="sidebar">
      <div className="logo">MediConnect</div>

      <ul>
        <li className="active">
          <FaUser /> Profile
        </li>

        <li>
          <FaCalendarCheck /> Appointments
        </li>

        <li>
          <FaCog /> Settings
        </li>

        {/* Logout */}
        <li className="logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;