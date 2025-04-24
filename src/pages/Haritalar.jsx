import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Haritalar.css';

// Leaflet için marker ikonu ayarı
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Haritalar = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        // Son 30 günlük deprem verileri
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const response = await fetch(
          `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate.toISOString()}&endtime=${endDate.toISOString()}&minmagnitude=2.5&minlatitude=35&maxlatitude=43&minlongitude=25&maxlongitude=45`
        );
        const data = await response.json();
        setEarthquakes(data.features);
      } catch (err) {
        setError('Deprem verileri yüklenirken bir hata oluştu');
        console.error('Error fetching earthquake data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  const getMagnitudeColor = (mag) => {
    if (mag >= 5) return '#dc3545';
    if (mag >= 4) return '#ffc107';
    return '#28a745';
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="haritalar-container">
      <h1>Son 30 Günlük Deprem Haritası</h1>
      <div className="map-wrapper">
        <MapContainer
          center={[39, 35]}
          zoom={6}
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {earthquakes.map((earthquake) => {
            const [longitude, latitude] = earthquake.geometry.coordinates;
            const magnitude = earthquake.properties.mag;
            
            return (
              <Marker
                key={earthquake.id}
                position={[latitude, longitude]}
                icon={L.divIcon({
                  className: 'custom-marker',
                  html: `<div style="background-color: ${getMagnitudeColor(magnitude)}; width: ${magnitude * 5}px; height: ${magnitude * 5}px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${magnitude.toFixed(1)}</div>`,
                })}
              >
                <Popup>
                  <div>
                    <h3>{earthquake.properties.place}</h3>
                    <p>Büyüklük: {magnitude.toFixed(1)}</p>
                    <p>Derinlik: {earthquake.geometry.coordinates[2].toFixed(1)} km</p>
                    <p>Tarih: {new Date(earthquake.properties.time).toLocaleString('tr-TR')}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Haritalar; 