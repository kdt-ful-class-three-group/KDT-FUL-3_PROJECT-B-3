import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import apiRouter from "./routes/api.js";
import dataRoutes from "./routes/dataRoutes.js";
import apiService from "./services/busApiService.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.use("/api", dataRoutes);
const startServer = async () => {
  try {
    // MongoDB 연결
    await connectDB();

    // 초기 데이터 설정
    await apiService.initializeData();

    // 서버 시작
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("서버 시작 실패:", error.message);
    process.exit(1);
  }
};

startServer();
export default app;
