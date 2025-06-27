import { fetchBusStationInfo } from '../services/externalApi.js';
import { fetchBusStationRoutes } from '../services/externalApi.js';

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