import express from 'express';
import { getBusStationInfo, getBusStationRoutes } from '../controllers/apiController.js';
const router = express.Router();

router.get('/busStationInfo', getBusStationInfo);
router.get('/busStationroutes/:nodeId', getBusStationRoutes);

export default router;