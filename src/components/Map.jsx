// Importing necessary components and hooks from react and react-leaflet
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import { getLocalStorage } from "../data/Data";

// Functional component for rendering the map
function Map() {
  // Initializing variables for the user's first city position
  let userFirstCityLat, userFirstCityLng, userFirstCityPositionArray;
  if (getLocalStorage().length >= 1) {
    userFirstCityLat = Number(getLocalStorage()[0].position.lat);
    userFirstCityLng = Number(getLocalStorage()[0].position.lng);
    userFirstCityPositionArray = [userFirstCityLat, userFirstCityLng];
  } else {
    userFirstCityPositionArray = [40, 0];
  }

  // Accessing cities data and geolocation functions from the CitiesContext and useGeoLocation hook
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // Using the useUrlPosition hook to get latitude and longitude from the URL
  const [lat, lng] = useUrlPosition();

  // State variable for managing the map position
  const [mapPosition, setMapPosition] = useState(userFirstCityPositionArray);

  // Effect to update the map position when latitude and longitude change from the URL
  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  // Effect to update the map position when geolocation position changes
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  // Rendering the map component with markers for each city
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type={"position"} clickHandle={getPosition}>
          {isLoadingPosition ? "Loading.." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        {/* Tile layer for OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {/* Mapping through cities and rendering markers */}
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              {/* Popup with city emoji and name */}
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        {/* Component to change the center of the map programmatically */}
        <ChangeCenter position={mapPosition} />
        {/* Component to detect click events on the map for programmatic navigation */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// Component to change the center of the map programmatically
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// Component to detect click events on the map for programmatic navigation
function DetectClick() {
  // Programmatic Navigation with useNavigate
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

// Exporting the Map component as the default export
export default Map;
