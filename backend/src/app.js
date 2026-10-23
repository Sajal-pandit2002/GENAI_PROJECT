import express from "express";
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
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
app.use("/api/interview", interviewRouter);

app.use((error, req, res, _next) => {
  const statusCode = error.statusCode || error.status;
  const isClientError = statusCode >= 400 && statusCode < 500;

  if (!isClientError) {
    console.error(`Request failed: ${req.method} ${req.originalUrl}`, error);
  }

  return res.status(isClientError ? statusCode : 500).json({
    success: false,
    message: isClientError ? error.message : "Internal server error.",
  });
});

export default app;
