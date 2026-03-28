import { useEffect, useState } from "react";
import "./App.css";

function Alerts() {
  const [accidents, setAccidents] = useState([]);
  const [search, setSearch] = useState("");

  // 🚨 User Report States
  const [showForm, setShowForm] = useState(false);
  const [newAccident, setNewAccident] = useState({
    location: "",
    severity: "Low",
    lat: "",
    lng: "",
  });

  // Fetch accidents
  useEffect(() => {
    fetch("http://localhost:5000/api/accidents")
      .then((res) => res.json())
      .then((data) => setAccidents(data))
      .catch((err) => console.log(err));
  }, []);

  // 🔍 Filtered results
  const filteredAccidents = accidents.filter((acc) =>
    acc.location.toLowerCase().includes(search.toLowerCase())
  );

  // 🚨 Handle Report Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setAccidents([...accidents, newAccident]); // add locally

    setNewAccident({
      location: "",
      severity: "Low",
      lat: "",
      lng: "",
    });

    setShowForm(false);
  };

  return (
    <div className="alerts-container">

      {/* Title */}
      <h1>🚨 Accident Rate</h1>
      <p>Accident-prone areas & severity analysis</p>

      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="🔍 Search location..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🚨 REPORT BUTTON */}
      <button className="report-btn" onClick={() => setShowForm(!showForm)}>
        + Report Accident
      </button>

      {/* 🚨 REPORT FORM */}
      {showForm && (
        <form className="report-form" onSubmit={handleSubmit}>
          <input
            placeholder="Location"
            value={newAccident.location}
            onChange={(e) =>
              setNewAccident({ ...newAccident, location: e.target.value })
            }
            required
          />

          <select
            value={newAccident.severity}
            onChange={(e) =>
              setNewAccident({ ...newAccident, severity: e.target.value })
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            placeholder="Latitude"
            value={newAccident.lat}
            onChange={(e) =>
              setNewAccident({ ...newAccident, lat: e.target.value })
            }
            required
          />

          <input
            placeholder="Longitude"
            value={newAccident.lng}
            onChange={(e) =>
              setNewAccident({ ...newAccident, lng: e.target.value })
            }
            required
          />

          <button type="submit">Submit</button>
        </form>
      )}

      {/* Cards */}
      <div className="alerts-cards">
        {filteredAccidents.map((acc, index) => (
          <div className="card" key={index}>
            <h2>{acc.location}</h2>

            <p>
              Severity:{" "}
              <span
                style={{
                  color:
                    acc.severity === "High"
                      ? "red"
                      : acc.severity === "Medium"
                      ? "orange"
                      : "green",
                }}
              >
                {acc.severity}
              </span>
            </p>

            <p>📍 Lat: {acc.lat}</p>
            <p>📍 Lng: {acc.lng}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;