import express from "express";
import {
  getBusStationInfo,
  getBusStationRoutes,
  getArvlInfoInqireService,
  testDbConnection,
  insertAllBusStations
} from "../controllers/apiController.js";
const router = express.Router();

router.get("/busStationInfo", getBusStationInfo);
router.get("/busStationroutes/:nodeId", getBusStationRoutes);
router.get("/ArvlInfoInqireService/:nodeId", getArvlInfoInqireService);
// router.post('/insertBusStations', insertAllBusStations);
// router.get('/test', testDbConnection);

export default router;
