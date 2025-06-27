import express from 'express';
import { getBusStationInfo } from '../controllers/apiController.js';
const router = express.Router();

router.get('/busStationInfo', getBusStationInfo);

export default router;