import express from "express";
import {
  getBusStationInfo,
  getBusStationRoutes,
  getArvlInfoInqireService,
} from "../controllers/apiController.js";
const router = express.Router();

router.get("/busStationInfo", getBusStationInfo);
router.get("/busStationroutes/:nodeId", getBusStationRoutes);
router.get("/ArvlInfoInqireService/:nodeId", getArvlInfoInqireService);

export default router;
