// controllers/dataController.js
import { Data } from "../database/data.js";
import apiService from "../services/busApiService.js";

class DataController {
  // 모든 데이터 조회
  async getAllData(req, res) {
    try {
      const data = await Data.find().sort({ createdAt: -1 });

      res.json({
        success: true,
        count: data.length,
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "데이터 조회 실패",
        error: error.message,
      });
    }
  }

  // 특정 데이터 조회
  async getDataById(req, res) {
    try {
      const { id } = req.params;
      const data = await Data.findOne({ apiId: id });

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "데이터를 찾을 수 없습니다.",
        });
      }

      res.json({
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "데이터 조회 실패",
        error: error.message,
      });
    }
  }

  // 데이터 수동 새로고침
  async refreshData(req, res) {
    try {
      console.log("수동 데이터 새로고침 요청됨");

      const results = await apiService.refreshAllData();

      res.json({
        success: true,
        message: "데이터가 성공적으로 새로고침되었습니다.",
        count: results.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "데이터 새로고침 실패",
        error: error.message,
      });
    }
  }

  // 데이터베이스 상태 확인
  async getStatus(req, res) {
    try {
      const count = await Data.countDocuments();
      const latestData = await Data.findOne().sort({ updatedAt: -1 });

      res.json({
        success: true,
        status: {
          totalCount: count,
          lastUpdated: latestData ? latestData.updatedAt : null,
          hasData: count > 0,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "상태 확인 실패",
        error: error.message,
      });
    }
  }
}

export default new DataController();
