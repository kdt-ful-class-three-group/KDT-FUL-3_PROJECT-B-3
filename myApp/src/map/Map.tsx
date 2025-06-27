import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import myMarkerImg from "../assets/react.svg";
import { getBusStationInfo, getBusRoutesByNode } from "./busApi";

import type { BusNode, BusRoute } from "./busApi";
import { useEffect, useState } from "react";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: myMarkerImg,
  // iconRetinaUrl: myMarkerImg,
  // shadowUrl: markerShadow,
});
function Map() {
  const [busStationInfo, setBusStationInfo] = useState<BusNode[]>([]); // 버스 정류소 위치 데이터
  const [busCodeApiData, setBusCodeApiData] = useState<BusRoute[]>([]); // 버스 번호 코드 데이터
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);  // 마커 선택 여부 판단

  const myKey = "c8BF1UzHGMf4wHXXcPbo";
  const center: [number, number] = [36.35021741673337, 127.3853206539668];

  useEffect(() => {
    async function fetchBusStationInfo() {
      // 정류소 정보
      const busData = await getBusStationInfo();
      setBusStationInfo(busData);
    }
    fetchBusStationInfo();
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
      {busStationInfo.length === 0 ? (
        <div className="loading">로딩 중...</div>
      ) : (
        <MarkerClusterGroup>
          {busStationInfo.map((busMarker, i) => (
            <Marker
              key={i}
              position={[Number(busMarker.gpslati), Number(busMarker.gpslong)]}
              eventHandlers={{
                click: async () => {
                  setSelectedMarker(null);
                  const busInfo = await getBusRoutesByNode(busMarker.nodeid);
                  setBusCodeApiData(busInfo);
                  setSelectedMarker(busMarker.nodeid);
                }
              }}
            >
              <Popup>
                {selectedMarker === busMarker.nodeid && (
                  <div>
                    <strong>{busMarker.nodenm}</strong>
                    {busCodeApiData.map((route, idx) => (
                      <div key={idx} className="mb-3">
                        <div>버스 번호: {route.routeno}</div>
                        <div>기점: {route.startnodenm}</div>
                        <div>종점: {route.endnodenm}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      )}
    </MapContainer>
  );
}

export default Map;
