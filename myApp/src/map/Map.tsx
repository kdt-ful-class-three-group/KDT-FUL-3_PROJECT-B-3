import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import myMarkerImg from "../assets/react.svg";
import { getBus } from "./busApi";
import type { BusNode } from "./busApi";
import { useEffect, useState } from "react";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: myMarkerImg,
  // iconRetinaUrl: myMarkerImg,
  // shadowUrl: markerShadow,
});
function Map() {
  const [busApiData, setBusApiData] = useState<BusNode[]>([]);
  const myKey = "c8BF1UzHGMf4wHXXcPbo";
  const center: [number, number] = [36.35021741673337, 127.3853206539668];
  useEffect(() => {
    async function fetchBusData() {
      const data = await getBus();
      setBusApiData(data);
    }
    fetchBusData();
    console.log("버스api", busApiData);
  }, []);
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${myKey}`}
        tileSize={512}
        zoomOffset={-1}
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> & OpenStreetMap contributors'
      />
      {busApiData.length === 0 ? (
        <div className="loading">로딩 중...</div>
      ) : (
        busApiData.map((busMarker, i) => (
          <Marker
            key={i}
            position={[Number(busMarker.gpslati), Number(busMarker.gpslong)]}
          >
            <Popup>{busMarker.nodenm}</Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
}

export default Map;
