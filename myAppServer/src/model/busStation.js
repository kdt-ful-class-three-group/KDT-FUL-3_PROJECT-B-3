import mongoose from 'mongoose';

const busStationSchema = new mongoose.Schema({
  nodeid: String,
  nodenm: String,
  gpslati: Number,
  gpslong: Number,
  nodeno: Number,
});

busStationSchema.index({ nodeid: 1 }, { unique: true });

const busStation = mongoose.model('busInfo', busStationSchema);
export default busStation;