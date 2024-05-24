import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-vertical-timeline-component/style.min.css';
import './App.css'; // Import CSS file for styling
import L from 'leaflet';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Define custom icons
const blueIcon = new L.Icon({
  iconUrl: './blueIcon.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: './redIcon.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
  iconUrl: './greenIcon.png',
  shadowUrl: iconShadow,
  iconSize: [35, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Function to get the icon based on UUID prefix
const getIconByUuidPrefix = (uuid) => {
  if (uuid.startsWith('550')) {
    return blueIcon;
  } else if (uuid.startsWith('098')) {
    return redIcon;
  } else {
    return greenIcon;
  }
};

// Function to get the color for the timeline icon based on UUID prefix
const getColorByUuidPrefix = (uuid) => {
  if (uuid.startsWith('550')) {
    return 'rgb(0, 119, 255)'; // Blue
  } else if (uuid.startsWith('098')) {
    return 'rgb(255, 0, 0)'; // Red
  } else {
    return 'rgb(0, 255, 0)'; // Green
  }
};

const App = () => {
  const [locations, setLocations] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    const backendUrl = 'http://3.234.16.185:3000';  // Replace with your EC2 instance's public IP
    axios.get(`${backendUrl}/locations`)
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleTimelineClick = (lat, lon) => {
    const map = mapRef.current;
    if (map) {
      map.setView([lat, lon], 15, {
        animate: true
      });
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '70%' }}>
        <MapContainer
          center={[18.4153, -66.0594]}
          zoom={8}
          style={{ height: '600px', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map(location => (
            <Marker
              key={location.id}
              position={[location.lat, location.lon]}
              icon={getIconByUuidPrefix(location.uuid)}
            >
              <Popup>
                <b>{location.description}</b><br />
                UUID: {location.uuid}<br />
                Date: {location.date}<br />
                Time: {location.time}<br />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div style={{ width: '30%', overflowY: 'auto', height: '600px' }}>
        <VerticalTimeline>
          {locations.map(location => (
            <VerticalTimelineElement
              key={location.id}
              date={`${location.date} ${location.time}`}
              iconStyle={{ background: getColorByUuidPrefix(location.uuid), color: '#fff' }}
              onTimelineElementClick={() => handleTimelineClick(location.lat, location.lon)}
            >
              <h3 className="vertical-timeline-element-title">{location.description}</h3>
              <p>UUID: {location.uuid}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default App;