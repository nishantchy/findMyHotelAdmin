"use client";

import React, { useState, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

// Fix for Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const MapComponent = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const defaultCenter = [27.7172, 85.324];

  const handleMapClick = useCallback(
    (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      onLocationSelect(lat, lng);
    },
    [onLocationSelect]
  );

  const SearchControl = () => {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider: provider,
        style: "bar",
        showMarker: false,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: false,
        searchLabel: "Search for location",
      });
      map.addControl(searchControl);
      map.on("geosearch/showlocation", (e) => {
        const { x, y } = e.location;
        setMarkerPosition([y, x]);
        onLocationSelect(y, x);
      });
      return () => map.removeControl(searchControl);
    }, [map]);
    return null;
  };

  const MapEvents = () => {
    const map = useMap();
    useEffect(() => {
      if (!map) return;
      map.on("click", handleMapClick);
      return () => {
        map.off("click", handleMapClick);
      };
    }, [map]);
    return null;
  };

  return (
    <div className="relative h-full">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SearchControl />
        <MapEvents />
        {markerPosition && <Marker position={markerPosition} />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
