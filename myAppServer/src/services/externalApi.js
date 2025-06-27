import axios from 'axios';

export async function fetchBusStationInfo() {
  const response = await axios.get(`https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnNoList?serviceKey=${process.env.EXTERNAL_API_KEY}&pageNo=1&numOfRows=3026&_type=json&cityCode=25`);
  return response.data;
}

export async function fetchBusStationRoutes(nodeId) {
  const response = await axios.get(`https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnThrghRouteList?serviceKey=${process.env.EXTERNAL_API_KEY}&pageNo=1&numOfRows=20&_type=json&cityCode=25&nodeid=${nodeId}`);
  return response.data;
}