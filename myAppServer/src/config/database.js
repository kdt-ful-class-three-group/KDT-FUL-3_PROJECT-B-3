import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const busDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB 연결됨: ${busDB.connection.name}`);
  } catch (error) {
    console.error(`DB 연결 실패: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
