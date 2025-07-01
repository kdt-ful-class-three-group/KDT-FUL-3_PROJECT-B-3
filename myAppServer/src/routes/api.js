import express from "express";
import {
  getOrCacheBusStations,
  getBusStationRoutes,
  getArvlInfoInqireService,
} from "../controllers/apiController.js";
const router = express.Router();

router.get("/busStationInfo", getOrCacheBusStations);
router.get("/busStationroutes/:nodeId", getBusStationRoutes);
router.get("/ArvlInfoInqireService/:nodeId", getArvlInfoInqireService);

export default router;
