import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import bloodRoutes from "./routes/bloodRoutes.js";
// import { errorLogger } from "./middlewares/Error_handler.js";

dotenv.config();
const app = express();

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.disable("x-powered-by");
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/blood", bloodRoutes);

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {

    app.get("/", (req, res) => {
      res.send("Hello from LOL");
    });
    console.log("DB connected");
    const errorLogger = (err, req, res, next) => {
      console.log("req time", req.requestTime);
      next();
    };
    app.listen(4000, console.log("Server started"));
  })
  .catch((err) => {
    console.log("DB connection failed");
  });
