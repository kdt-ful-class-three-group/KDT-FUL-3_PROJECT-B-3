import { fetchBusStationInfo } from "../services/externalApi.js";
import { fetchBusStationRoutes } from "../services/externalApi.js";
import { fetchArvlInfoInqireService } from "../services/externalApi.js";
import BusStation from "../models/BusStation.js";

export async function getBusStationInfo(req, res) {
  try {
    const data = await fetchBusStationInfo();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getBusStationRoutes(req, res) {
  const { nodeId } = req.params;
  try {
    const data = await fetchBusStationRoutes(nodeId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getArvlInfoInqireService(req, res) {
  const { nodeId } = req.params;
  try {
    const data = await fetchArvlInfoInqireService(nodeId);
    console.log("버스시간", data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getOrCacheBusStations(req, res) {
  try {
    // Read: DB에 데이터가 있으면 바로 반환
    const count = await BusStation.countDocuments();
    if (count > 0) {
      const stations = await BusStation.find();
      return res.json(stations);
    }

    // Create: 없으면 외부 API 호출 후 DB에 저장
    const apiData = await fetchBusStationInfo();
    const items = apiData?.response?.body?.items?.item || [];
    
    if (items.length > 0) {
      await BusStation.insertMany(items);
    }

    return res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
