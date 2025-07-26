import mongoose from "mongoose";

const mongoUri = 'mongodb://localhost:27017';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error("Failed to connect to Mongo:", error);
  }
};

export default connectToMongo;
