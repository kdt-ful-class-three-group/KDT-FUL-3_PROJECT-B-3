import axios from "axios";
import { Data } from "../database/data.js";

class ApiService {
  // 외부 API에서 데이터 가져오기
  async fetchExternalData() {
    try {
      console.log("외부 API에서 데이터를 가져오는 중...");

      const response = await axios.get(
        `https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnNoList?serviceKey=${process.env.EXTERNAL_API_KEY}&pageNo=1&numOfRows=3026&_type=json&cityCode=25`
      );

      const apiData = response.data.response.body.items.item;
      console.log("API 응답 데이터:", apiData); // 응답 데이터 확인
      return apiData;
    } catch (error) {
      console.error("외부 API 호출 실패:", error.message);
      throw new Error(`외부 API 호출 실패: ${error.message}`);
    }
  }

  // 데이터를 MongoDB에 저장
  async saveDataToDB(apiData) {
    try {
      const savePromises = apiData.map(async (item) => {
        const dataToSave = {
          apiId: item.nodeid, // nodeid를 고유 식별자로 사용
          gpslati: item.gpslati, // 위도
          gpslong: item.gpslong, // 경도
          nodeid: item.nodeid, // nodeid 저장
          nodenm: item.nodenm, // nodenm 저장
          nodeno: item.nodeno, // nodeno 저장
          updatedAt: new Date(),
        };

        return Data.findOneAndUpdate({ apiId: dataToSave.apiId }, dataToSave, {
          upsert: true,
          new: true,
        });
      });

      const results = await Promise.all(savePromises);
      console.log(`${results.length}개의 데이터 저장됨`);

      return results;
    } catch (error) {
      console.error("데이터베이스 저장 실패:", error.message);
      throw new Error(`데이터베이스 저장 실패: ${error.message}`);
    }
  }

  // 전체 데이터 새로고침
  async refreshAllData() {
    try {
      const apiData = await this.fetchExternalData();
      const results = await this.saveDataToDB(apiData);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // 초기 데이터 설정
  async initializeData() {
    try {
      console.log("초기 데이터 설정을 시작");

      const existingDataCount = await Data.countDocuments();

      if (existingDataCount > 0) {
        console.log(`${existingDataCount}개 있음`);
        return;
      }

      console.log("외부 API에서 데이터 가져옴");

      await this.refreshAllData();

      console.log("초기 데이터 설정이 완료");
    } catch (error) {
      console.error("초기 데이터 설정 실패:", error.message);
      console.log("오류 나도 서버 실행");
    }
  }
}

export default new ApiService();
