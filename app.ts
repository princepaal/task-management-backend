import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 
import bodyParser from "body-parser";
import userRoute from "./routes/user";
import taskRouter from './routes/task'

dotenv.config();

const createServer = async() => {
  try {
    const app = express();
    app.use(cors({
      origin: "*", // Allow all domains
      methods: "GET, POST, PUT, DELETE, OPTIONS",
      allowedHeaders: "Content-Type, Authorization"
  }));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use("/auth", userRoute);
    app.use("/auth",taskRouter);

    app.listen(5000, () => console.log("Server is Running"));
    return app;
  } catch (error) {
    console.log("Server Error");
  }
};

export default createServer;
