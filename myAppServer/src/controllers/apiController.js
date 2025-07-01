import busStation from "../model/busStation.js";
import { fetchBusStationInfo } from "../services/externalApi.js";
import { fetchBusStationRoutes } from "../services/externalApi.js";
import { fetchArvlInfoInqireService } from "../services/externalApi.js";

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

export async function testDbConnection(req, res) {
  try {
    const station = await busStation.findOne();
    res.json({ success: true, station });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}