import mongoose from "mongoose";
import createServer from "./app";
import dotenv from "dotenv";

dotenv.config();

// const app = createServer();
const app = async () => {
  try {
    console.log('process.env.MONGO_BASE_URL', process.env.MONGO_BASE_URL)
    if (process.env.MONGO_BASE_URL) {
        try {
          await createServer();
          await mongoose.connect(process.env.MONGO_BASE_URL);
          console.log("Database is connected...");
        } catch (error) {
          console.error("Error connecting to database:", error);
        }
      }
      
  } catch (error) {
    console.log(error)
  }
};

app();
