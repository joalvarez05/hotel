/*import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: -34.618125,  // Coordenada de latitud (puedes cambiarla por la de tu hotel)
    lng: -58.443221,  // Coordenada de longitud (puedes cambiarla por la de tu hotel)
  };

  return (
    <section className="map-section py-8 bg-gray-50">
    <h2 className="text-2xl font-bold text-center text-indigo-900 mb-6">Ubicación del Hotel</h2>
    <LoadScript googleMapsApiKey="TU_API_KEY_DE_GOOGLE_MAPS">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  </section>
  );
};

export default Map; */