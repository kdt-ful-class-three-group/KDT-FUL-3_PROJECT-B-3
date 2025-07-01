import mongoose from "mongoose";

const mongoSchema = new mongoose.Schema(
  {
    apiId: { type: String, required: true }, // apiId 필드 추가
    gpslati: { type: Number, required: true },
    gpslong: { type: Number, required: true },
    nodeid: { type: String, required: true },
    nodenm: { type: String, required: true },
    nodeno: { type: Number, required: true },
    description: { type: String }, // description 필드 추가
  },
  {
    timestamps: true,
  }
);

// 업데이트 시 updatedAt 자동 갱신
mongoSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: new Date() });
});

export const Data = mongoose.model("Data", mongoSchema, "busNode");
