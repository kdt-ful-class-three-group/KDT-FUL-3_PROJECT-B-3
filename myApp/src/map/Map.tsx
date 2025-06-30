import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import myMarkerImg from "../assets/react.svg";
import {
  getBusStationInfo,
  getBusRoutesByNode,
  getArvlInfoNode,
} from "./busApi";

import type { BusNode, BusRoute, BusArrivalInfo } from "./busApi";
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
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null); // 마커 선택 여부 판단
  const [selectedInfoMarker, setSelectedInfoMarker] = useState<
    BusArrivalInfo[]
  >([]); // 마커 선택 여부 판단

  const myKey = "c8BF1UzHGMf4wHXXcPbo";
  const center: [number, number] = [36.35021741673337, 127.3853206539668];
  //* 버스시간, 버스 기점,종점 맵핑
  const mergeObjBus = [...busCodeApiData, ...selectedInfoMarker].reduce(
    (element: (BusRoute | BusArrivalInfo)[], cur) => {
      const existing = element.find((item) => item.routeid === cur.routeid);
      if (existing) {
        Object.assign(existing, cur);
      } else {
        element.push(cur);
      }
      return element;
    },
    []
  );
  console.log("버스 시간 맵핑", mergeObjBus);
  useEffect(() => {
    async function fetchBusStationInfo() {
      // 정류소 정보
      const busData = await getBusStationInfo();
      setBusStationInfo(busData);

      // const busInfoData = await getArvlInfoNode();
      // setSelectedInfoMarker(busInfoData);
      // console.log(busInfoData);
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
                  const busTime = await getArvlInfoNode(busMarker.nodeid);
                  setBusCodeApiData(Array.isArray(busInfo) ? busInfo : []);
                  setSelectedInfoMarker(Array.isArray(busTime) ? busTime : []);
                  setSelectedMarker(busMarker.nodeid);
                },
              }}
            >
              <Popup>
                {selectedMarker === busMarker.nodeid && (
                  <div>
                    <h2 className="text-xl">{busMarker.nodenm}</h2>
                    <div className="overflow-y-auto max-h-[33vh] scrollbar-hide">
                      {mergeObjBus.map((route, idx) => (
                        <div key={idx} className="mb-3">
                          <div className="flex  items-end my-3">
                            <span className="m-0 text-lg block font-medium">
                              {route.routeno}
                            </span>
                            <span className="ml-1 text-sm block text-gray-500">
                              {route.endnodenm} 방향
                            </span>
                          </div>
                          <div className="flex justify-between items-center my-3">
                            <span
                              className={
                                "text-medium" +
                                (route.arrtime &&
                                Math.floor(route.arrtime / 60) < 3
                                  ? " text-red-500"
                                  : " text-black")
                              }
                            >
                              {route.arrtime
                                ? Math.floor(route.arrtime / 60) + "분"
                                : "도착정보없음"}
                            </span>

                            <span>
                              {route.arrprevstationcnt
                                ? route.arrprevstationcnt + "정거장 전"
                                : ""}{" "}
                            </span>
                          </div>
                          <div></div>
                        </div>
                      ))}
                    </div>
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
