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

//* api key
const busKey =
  "%2F%2FyNWMYBpj%2BUWMNJOecVH1q6KYhP2UrjZA8nDYMreg0vjscQMgKCI8uqHwT9CLP1g5C5xVnHzwK7I9%2BxwO%2FqAA%3D%3D";
export async function getBus() {
  //* 버스 정류소 위치 데이터
  const bus = `https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnNoList?serviceKey=${busKey}&pageNo=1&numOfRows=3026&_type=json&cityCode=25`;
  try {
    const busApi = await axios.get(bus);
    const busApiData = await busApi.data.response.body.items.item;
    console.log("버스 정류장 데이터:", busApiData);
    return busApiData;
  } catch (error) {
    console.error("버스 정류소 데이터 오류", error);
  }
}

export async function getBusNodeCode() {
  //* 버스 routeid 데이터 , 버스 번호 데이터
  const busNode = `https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=${busKey}&pageNo=1&numOfRows=100&_type=json&cityCode=25&nodeId=DJB8001793`;

  try {
    const busNodeCode = await axios.get(busNode);
    const busNodeData = await busNodeCode.data.response.body.items.item;
    console.log("버스 번호 코드", busNodeData);
    return busNodeData;
  } catch (error) {
    console.error("버스 번호 코드 데이터 오류", error);
  }
}
//! 실시간 데이터
export async function getBusInfo() {
  const busInfoApi = `https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=${busKey}&pageNo=1&numOfRows=300&_type=json&cityCode=25&nodeId=DJB8001793`;
  try {
    const busInfoApiCode = await axios.get(busInfoApi);
    const busInfoData = await busInfoApiCode.data.response.body.items.item;
    return busInfoData;
  } catch (error) {
    console.log("버스 노선 정보 데이터 오류", error);
  }
}
