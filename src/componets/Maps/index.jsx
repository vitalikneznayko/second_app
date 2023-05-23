import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Maps.css";

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBcbQOenBrouiGdjYHHIpHvAD9Lzxn3K84",
  });
  const [country, setCountry] = useState(null);
  let { cca3 } = useParams();

  useEffect(() => {
    async function fetchCountry() {
      try {
        const result = await axios("http://46.101.96.179/all");
        const tmp = result.data.find((item) => item.cca3 === cca3);
        setCountry(tmp);
      } catch {
        setCountry("Error");
      }
    }
    fetchCountry();
  }, [cca3]);

  if (!country) {
    return <div>Loading...</div>;
  }

  if (country === "Error") {
    return <div>There was an error loading the country.</div>;
  }

  const defaultCenter = {
    lat: country.latlng[0],
    lng: country.latlng[1],
  };

  return (
    <div className="map_container">
      {isLoaded && (
        <GoogleMap mapContainerClassName="map" zoom={6} center={defaultCenter}>
          <Marker position={defaultCenter} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Maps;
