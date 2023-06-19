import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.get("/", (req, res) => {
      res.send("Hello from backend");
    });
    console.log("DB connected");
    app.listen(process.env.PORT, console.log("Server started"));
  })
  .catch((err) => {
    console.log("DB connection failed");
  });
