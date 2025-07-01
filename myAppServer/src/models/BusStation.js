import mongoose from "mongoose";

const BusStationSchema = new mongoose.Schema({
  nodeid: { type: String, required: true, unique: true },
  gpslati: Number,
  nodenm: String,
  gpslong: Number,
  nodeno: Number,
  // 필요시 추가 필드
});

export default mongoose.model("BusStation", BusStationSchema);
