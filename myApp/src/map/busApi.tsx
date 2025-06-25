import axios from "axios";
// export default function busApi() {
export interface BusNode {
  gpslati: number; // 위도
  gpslong: number; // 경도
  nodeid: string; // 노드 ID
  nodenm: string; // 정류장 이름
  nodeno: number; // 정류장 번호
}
export async function getBus() {
  const busKey =
    "%2F%2FyNWMYBpj%2BUWMNJOecVH1q6KYhP2UrjZA8nDYMreg0vjscQMgKCI8uqHwT9CLP1g5C5xVnHzwK7I9%2BxwO%2FqAA%3D%3D";
  const bus = `https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnNoList?serviceKey=${busKey}&pageNo=1&numOfRows=3026&_type=json&cityCode=25`;
  try {
    const busApi = await axios.get(bus);
    const busApiData = busApi.data.response.body.items.item;
    console.log("버스 정류장 데이터:", busApiData);
    return busApiData;
  } catch (error) {
    console.error("Error fetching bus data:", error);
  }
}
// }
