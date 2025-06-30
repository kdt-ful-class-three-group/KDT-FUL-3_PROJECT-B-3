import axios from 'axios';
import redisClient from './redisClient.js';

export async function fetchBusStationInfo() {
  const cacheKey = 'busStationInfo';
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const response = await axios.get(`https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnNoList?serviceKey=${process.env.EXTERNAL_API_KEY}&pageNo=1&numOfRows=3026&_type=json&cityCode=25`);
  await redisClient.set(cacheKey, JSON.stringify(response.data), { EX: 60 }); // 60초 캐시
  return response.data;
}

export async function fetchBusStationRoutes(nodeId) {
  const cacheKey = `busStationRoutes:${nodeId}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const response = await axios.get(`https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnThrghRouteList?serviceKey=${process.env.EXTERNAL_API_KEY}&pageNo=1&numOfRows=20&_type=json&cityCode=25&nodeid=${nodeId}`);
  await redisClient.set(cacheKey, JSON.stringify(response.data), { EX: 60 }); // 60초 캐시
  return response.data;
}