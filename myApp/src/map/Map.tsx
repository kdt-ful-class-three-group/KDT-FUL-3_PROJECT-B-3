import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import myMarkerImg from "../assets/react.svg";
import { getBus, getBusNodeCode, getBusInfo } from "./busApi";

import type { BusNode, BusRoute, BusArrivalInfo } from "./busApi";
import { useEffect, useState } from "react";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: myMarkerImg,
  // iconRetinaUrl: myMarkerImg,
  // shadowUrl: markerShadow,
});
function Map() {
  const [busApiData, setBusApiData] = useState<BusNode[]>([]); // 버스 정류소 위치 데이터
  const [busCodeApiData, setBusCodeApiData] = useState<BusRoute[]>([]); // 버스 번호 코드 데이터
  const [busInfoApiData, setBusInfoApiData] = useState<BusArrivalInfo[]>([]); // 버스 정보 데이터
  const [isSelectedMarker , setIsSelectedMarker] = useState<boolean | null>(null);

  const myKey = "c8BF1UzHGMf4wHXXcPbo";
  const center: [number, number] = [36.35021741673337, 127.3853206539668];
  useEffect(() => {
    async function fetchBusData() {
      // 정류소 데이토
      const busData = await getBus();
      setBusApiData(busData);
      //버스번호코드
      const busNodeCodeData = await getBusNodeCode();
      setBusCodeApiData(busNodeCodeData);
      // 정류소 도착 버스 데이터
      const busInfoData = await getBusInfo();
      setBusInfoApiData(busInfoData);
    }
    fetchBusData();
  }, []);

  // const mappedData = busApiData.map((busNode) => {
  //   const relatedRoutes = busInfoApiData.filter(
  //     (busInfo) => busInfo.nodeid === busNode.nodeid
  //   );
  //   return {
  //     ...busNode,
  //     routers: relatedRoutes,
  //   };
  // });
  // console.log("버스 노선 맵핑 데이터", mappedData);
  useEffect(() => {
    console.log("버스api", busApiData);
  }, [busApiData]);
  useEffect(() => {
    console.log("버스 번호 코드", busCodeApiData);
  }, [busCodeApiData]);
  useEffect(() => {
    console.log("버스 노선 데이터", busInfoApiData);
  }, [busInfoApiData]);
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
        <MarkerClusterGroup>
          {busApiData.map((busMarker, i) => (
            <Marker
              key={i}
              position={[Number(busMarker.gpslati), Number(busMarker.gpslong)]}
              eventHandlers={{
                click: async () => {
                  console.log(busMarker.nodenm);
                  setIsSelectedMarker(true);
                }
              }}
            >
              <Popup>
                {isSelectedMarker === true && (
                  <div>
                    <strong>{busMarker.nodenm}</strong>
                    <div>정류소 ID: {busMarker.nodeid}</div>
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
