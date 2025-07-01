import express from "express";
import DataController from "../controllers/busDataControllers.js";
const router = express.Router();
router.get("/busApi", DataController.getAllData);

export default router;
