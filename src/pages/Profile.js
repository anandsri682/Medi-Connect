import React, { useEffect, useState } from "react";
import "../styles/Profile.css";

export default function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <h2 style={{textAlign:"center"}}>No User Logged In</h2>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>User Profile</h2>

        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Phone:</strong> {user.phoneNumber}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Aadhaar:</strong> {user.aadhaarNumber}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>
    </div>
  );
}