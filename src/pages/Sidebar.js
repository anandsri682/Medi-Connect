import React from "react";
import { FaTachometerAlt, FaUser, FaCalendarCheck, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">MediConnect</div>

      <ul>
        <li className="active"><FaUser /> Profile</li>
        <li><FaCalendarCheck /> Appointments</li>
        <li><FaCog /> Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;