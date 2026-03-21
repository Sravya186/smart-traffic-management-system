import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* Header */}
      <div className="home-header">
        <h1>🚦 Smart Traffic System</h1>
        <p>Real-time monitoring & analysis</p>
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