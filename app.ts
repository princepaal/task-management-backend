import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // headers we are sending.
import bodyParser from "body-parser";
import userRoute from "./routes/user";

dotenv.config();

const createServer = async() => {
  try {
    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use("/auth", userRoute);

    app.listen(5000, () => console.log("Server is Running"));
    return app;
  } catch (error) {
    console.log("Server Error");
  }
};

export default createServer;
