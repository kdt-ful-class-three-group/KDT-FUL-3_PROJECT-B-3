import express from 'express';
import { getBusStationInfo } from '../controllers/apiController.js';
const router = express.Router();

router.get('/bus', getBusStationInfo);

export default router;