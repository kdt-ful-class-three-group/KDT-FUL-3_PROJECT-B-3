import express from 'express';
import { getBusStationInfo, getBusStationRoutes } from '../controllers/apiController.js';
const router = express.Router();

router.get('/busStationInfo', getBusStationInfo);
router.get('/busStationRoutes/:nodeId', getBusStationRoutes);

export default router;