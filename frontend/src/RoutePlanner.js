import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

function RoutePlanner() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [request, setRequest] = useState(null);

  const handleSearch = () => {
    if (!source || !destination) {
      alert("Enter source and destination");
      return;
    }

    setRequest({
      origin: source,
      destination: destination,
      travelMode: "DRIVING",
      provideRouteAlternatives: true, // 🔥 MULTIPLE ROUTES
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: "bestguess",
      },
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCLcewodT9bO052AmdQCkamsw9qkohS-wU">
      <div style={{ padding: "20px" }}>
        <h2>📍 Route Comparison</h2>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Enter Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <button onClick={handleSearch}>Compare Routes</button>

        {/* Map */}
        <div style={{ height: "500px", marginTop: "20px" }}>
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={{ lat: 17.385, lng: 78.4867 }}
            zoom={12}
          >

            {request && (
              <DirectionsService
                options={request}
                callback={(result) => {
                  if (result && result.status === "OK") {
                    setDirections(result);
                  }
                }}
              />
            )}

            {directions &&
              directions.routes.map((route, index) => (
                <DirectionsRenderer
                  key={index}
                  directions={directions}
                  routeIndex={index}
                  options={{
                    polylineOptions: {
                      strokeOpacity: index === 0 ? 1 : 0.5,
                      strokeWeight: index === 0 ? 6 : 4,
                    },
                  }}
                />
              ))}

          </GoogleMap>
        </div>

        {/* Route Comparison */}
        {directions && (
          <div style={{ marginTop: "20px" }}>
            <h3>🚗 Route Comparison</h3>

            {directions.routes.map((route, index) => {
              const leg = route.legs[0];

              return (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    margin: "10px 0",
                    background: index === 0 ? "#e6ffe6" : "#fff",
                  }}
                >
                  <h4>
                    Route {index + 1} {index === 0 && "⭐ Best Route"}
                  </h4>

                  <p>Distance: {leg.distance.text}</p>
                  <p>Duration: {leg.duration.text}</p>
                  <p>
                    Traffic Time:{" "}
                    {leg.duration_in_traffic?.text || "N/A"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </LoadScript>
  );
}

export default RoutePlanner;