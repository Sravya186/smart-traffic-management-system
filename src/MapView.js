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
  }); // default

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

  return (
    <LoadScript googleMapsApiKey="AIzaSyCLcewodT9bO052AmdQCkamsw9qkohS-wU">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        center={position}
        zoom={15}
      >
        {/* 📍 Your Location Marker */}
        <Marker position={position} />

        {/* 🚦 Traffic Layer */}
        <TrafficLayer />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;