import mongoose from "mongoose";

const cunnectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then((res) => {
      console.log(`mongodb cunnect ${res.connection.host}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default cunnectMongoDb;
