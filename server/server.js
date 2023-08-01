import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bloodRoutes from "./routes/bloodRoutes.js";
import passport from "passport";
import helmet from "helmet";
import compression from "compression";

dotenv.config();
// import "./middleware/passport.js";
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
// app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/blood", bloodRoutes);

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    // passport authentication

    app.get("/", (req, res) => {
      res.send("Hello from backend");
    });
    console.log("DB connected");
    app.listen(process.env.PORT, console.log("Server started"));
  })
  .catch((err) => {
    console.log("DB connection failed");
  });
