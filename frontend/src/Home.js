import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  // 🔥 state to store backend message
  const [message, setMessage] = useState("");

  // 🔥 call backend when page loads
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        setMessage(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">

      {/* Header */}
      <div className="home-header">
        <h1>🚦 Smart Traffic System</h1>
        <p>Real-time monitoring & analysis</p>

        {/* 🔥 Backend Message Display */}
        <h3 style={{ color: "green" }}>{message}</h3>
      </div>

      {/* Cards Section */}
      <div className="home-cards">

        {/* Traffic Map */}
        <div className="card" onClick={() => navigate("/map")}>
          <h2>🗺️ Traffic Map</h2>
          <p>View live traffic conditions in real-time</p>
        </div>

        {/* Accident Rate */}
        <div className="card" onClick={() => navigate("/alerts")}>
          <h2>🚨 Accident Rate</h2>
          <p>Check accident-prone areas</p>
        </div>

        {/* Traffic Analysis */}
        <div className="card" onClick={() => navigate("/route")}>
          <h2>📊 Traffic Analysis</h2>
          <p>Analyze routes and congestion patterns</p>
        </div>

      </div>

    </div>
  );
}

export default Home;