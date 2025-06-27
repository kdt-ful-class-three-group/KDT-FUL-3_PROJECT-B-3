import { fetchBusStationInfo } from '../services/externalApi.js';

export async function getBusStationInfo(req, res) {
  try {
    const data = await fetchBusStationInfo();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}