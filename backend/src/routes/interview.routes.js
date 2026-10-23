import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  deleteInterviewReport,
} from "../controller/interview.controller.js";
import { upload } from "../middleware/file.middleware.js";

const interviewRouter = express.Router();

//Create inter view route
interviewRouter.post(
  "/create",
  authUser,
  upload.single("resume"),
  generateInterviewReport,
);
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportById);
interviewRouter.delete(
  "/report/:interviewId",
  authUser,
  deleteInterviewReport,
);
interviewRouter.get("/", authUser, getAllInterviewReports);

export default interviewRouter;
