import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookiePerser from "cookie-parser";
import cors from "cors";
const app = express();

/* all middleware */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookiePerser());

/* using all the routes here */
app.use("/api/auth", authRouter);

export default app;
