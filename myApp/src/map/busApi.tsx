import axios from "axios";

//! 버스 정류소 위치
export interface BusNode {
  gpslati: number; // 위도
  gpslong: number; // 경도
  nodeid: string; // 노드 ID
  nodenm: string; // 정류장 이름
  nodeno: number; // 정류장 번호
}
//! 버스 번호 코드(routeid) 정보
export interface BusRoute {
  endnodenm: string; // 종점 정류장 이름
  endvehicletime: number; // 마지막 차량 시간 (숫자 또는 문자열)
  routeid: string; // 노선 ID
  routeno: number; // 노선 번호 (숫자 또는 문자열)
  routetp: string; // 노선 타입
  startnodenm: string; // 기점 정류장 이름
  startvehicletime: number; // 첫차 시간 (숫자 또는 문자열)
}

//! 버스 도착 정보
export interface BusArrivalInfo {
  arrprevstationcnt: number; // 이전 정류장 수
  arrtime: number; // 도착 시간 (초 단위)
  nodeid: string; // 정류장 ID
  nodenm: string; // 정류장 이름
  routeid: string; // 노선 ID
  routeno: number; // 노선 번호
  routetp: string; // 노선 타입
  vehicletp: string; // 차량 타입
}

export async function getBusStationInfo() {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/busStationInfo"
    );
    const busStationInfo = response.data.response.body.items.item;
    console.log("버스 정류장 데이터:", busStationInfo);
    return busStationInfo;
  } catch (error) {
    console.error("버스 정류소 데이터 오류", error);
  }
}

export async function getBusRoutesByNode(nodeId: string) {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/busStationroutes/${nodeId}`
    );
    const data = response.data.response.body.items.item;
    console.log("정류소 경유 버스 정보:", data);
    return data;
  } catch (error) {
    console.error("정류소 경유 버스 정보 오류", error);
  }
}

export async function getArvlInfoNode(nodeId: string) {
  try {
    const arvlInfoResponse = await axios.get(
      `http://localhost:4000/api/ArvlInfoInqireService/${nodeId}`
    );
    console.log("버스 시간 api 응답", arvlInfoResponse);
    const arvlInfoData = arvlInfoResponse.data.response.body.items.item;
    console.log("정류소 시간 버스 정보:", arvlInfoData);
    return arvlInfoData;
  } catch (error) {
    console.error("정류소 경유 버스 정보 오류", error);
  }
}
