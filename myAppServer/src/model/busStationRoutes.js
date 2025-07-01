import mongoose from 'mongoose';

const busRouteSchema = new mongoose.Schema({
  nodeid: String,
  routeid: String,
  routeno: Number,
  routetp: String,
  startnodenm: String,
  endnodenm: String,
  startvehicletime: Number,
  endvehicletime: Number,
});

busRouteSchema.index({ routeid: 1 }, { unique: true });

const busStationRoutes = mongoose.model('busRoutes', busRouteSchema);
export default busStationRoutes;