import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage() {

    const handleOpenClinic = (hospital) => {
  navigate(`/clinic/${hospital.id}`, {
    state: { clinic: hospital }   // ✅ pass full object
  });
};
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await fetch("http://10.50.61.66:8080/mediconnect/all");
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error("Error fetching hospitals");
    }
  };

  return (
    <div className="landing-container">

      <h1>Available Hospitals</h1>

      <div className="hospital-grid">

        {hospitals.map((hospital) => (   // ✅ hospital defined here
          <div
  key={hospital.id}
  className="hospital-card"
  onClick={() => handleOpenClinic(hospital)}
>
  <h3>{hospital.hospitalName}</h3>
  <p>{hospital.address}</p>
  <p>{hospital.mail}</p>
  <button> Open Details</button>
</div>
        ))}

      </div>

    </div>
  );
}

