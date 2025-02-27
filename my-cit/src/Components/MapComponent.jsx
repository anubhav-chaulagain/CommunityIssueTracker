import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude }) => {
  return (
    <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "400px", width: "100%" }}>
      {/* OpenStreetMap Tile Layer (Free) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      
      {/* Marker at user's location */}
      <Marker position={[latitude, longitude]}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;