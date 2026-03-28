import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker
} from "@react-google-maps/api";

function RoutePlanner() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [info, setInfo] = useState(null);
  const [accidents, setAccidents] = useState([]);

  // 🚨 Fetch accident data
  useEffect(() => {
    fetch("http://localhost:5000/api/accidents")
      .then(res => res.json())
      .then(data => setAccidents(data))
      .catch(err => console.log(err));
  }, []);

  const calculateRoute = () => {
    if (!source || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: "bestguess"
        }
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);

          const route = result.routes[0].legs[0];

          setInfo({
            distance: route.distance.text,
            duration: route.duration.text,
            trafficTime: route.duration_in_traffic
              ? route.duration_in_traffic.text
              : route.duration.text
          });
        }
      }
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📍 Route Comparison</h1>

      {/* Inputs */}
      <input
        placeholder="Enter Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <input
        placeholder="Enter Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <button onClick={calculateRoute}>Compare Routes</button>

      {/* Info Section */}
      {info && (
        <div style={{ marginTop: "15px" }}>
          <p>📏 Distance: {info.distance}</p>
          <p>⏱ Normal Time: {info.duration}</p>
          <p>🚦 With Traffic: {info.trafficTime}</p>
        </div>
      )}

      {/* Map */}
      <LoadScript googleMapsApiKey="AIzaSyDrYfOSdTDuuG3oFyXmQEMWprmezFWx7Z4">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "500px" }}
          center={{ lat: 16.3067, lng: 80.4365 }} // Guntur default
          zoom={12}
        >
          {/* Route */}
          {directions && <DirectionsRenderer directions={directions} />}

          {/* 🚨 Accident Markers with COLORS */}
          {accidents.map((acc, index) => (
            <Marker
              key={index}
              position={{ lat: acc.lat, lng: acc.lng }}
              title={`${acc.location} - ${acc.severity}`}
              icon={
                acc.severity === "High"
                  ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  : acc.severity === "Medium"
                  ? "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
              }
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default RoutePlanner;