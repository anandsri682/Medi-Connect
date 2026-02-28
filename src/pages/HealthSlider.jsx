import React, { useEffect, useState } from "react";
import "../styles/HealthSlider.css";


const images = [
  {
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
    title: "Your Health Matters",
    subtitle: "Early diagnosis saves lives"
  },
  {
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    title: "Stay Active",
    subtitle: "Healthy lifestyle, healthy future"
  },
  {
    url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
    title: "Mental Wellness",
    subtitle: "Peaceful mind, powerful life"
  },
  {
    url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f",
    title: "Nutrition First",
    subtitle: "Balanced diet builds immunity"
  }
];

export default function HealthSlider() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    
    
    <div className="health-slider">
<HealthSlider />
      {images.map((item, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${item.url})` }}
        >
          <div className="overlay">
            <h1>{item.title}</h1>
            <p>{item.subtitle}</p>
          </div>
        </div>
      ))}

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active-dot" : "dot"}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

    </div>
  );
}