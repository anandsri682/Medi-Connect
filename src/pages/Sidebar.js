import React from "react";
import { 
  FaUser, 
  FaCalendarCheck, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("patientId");
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="logo">MediConnect</div>

      <ul>
        <li 
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          <FaUser /> Profile
        </li>

        <li 
          className={activeTab === "appointments" ? "active" : ""}
          onClick={() => setActiveTab("appointments")}
        >
          <FaCalendarCheck /> Appointments
        </li>

        <li>
          <FaCog /> Settings
        </li>

        <li className="logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;