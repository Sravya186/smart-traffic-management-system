import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  TrafficLayer,
} from "@react-google-maps/api";

function MapView() {
  const [position, setPosition] = useState({
    lat: 17.385,
    lng: 78.4867,
  });

  const [accidents, setAccidents] = useState([]);

  // 📍 Get user's real location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.log("Location error:", err);
      }
    );
  }, []);

  // 🚨 Fetch accident data
  useEffect(() => {
    fetch("http://localhost:5000/api/accidents")
      .then((res) => res.json())
      .then((data) => setAccidents(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCLcewodT9bO052AmdQCkamsw9qkohS-wU">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        center={position}
        zoom={15}
      >
        {/* 📍 Your Location */}
        <Marker position={position} label="You" />

        {/* 🚦 Traffic Layer */}
        <TrafficLayer />

        {/* 🚨 Accident Markers */}
        {accidents.map((item, index) => (
          <Marker
            key={index}
            position={{
              lat: item.lat,
              lng: item.lng,
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;