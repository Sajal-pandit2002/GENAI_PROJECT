import { PDFParse } from "pdf-parse";
import mongoose from "mongoose";
import interviewReportModel from "../models/interviewReport.model.js";
import generateInterviewReportFromAi from "../services/ai.service.js";

/**
 * Generate and save a personalized interview report for the authenticated user.
 *
 * @route POST /api/interview/create
 * @param {import("express").Request} req Authenticated request with a PDF resume
 *   in `req.file` and job details in `req.body`.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Express error handler.
 * @returns {Promise<import("express").Response|void>} Created report or an error.
 */
export const generateInterviewReport = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required. Upload it using the "resume" field.',
      });
    }

    const parser = new PDFParse({ data: req.file.buffer });
    const result = await parser.getText();
    const resumeContent = result.text;
    const { selfDescription, jobDescription } = req.body;
    const interviewReportByAi = await generateInterviewReportFromAi({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });
    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });
    return res.status(201).json({
      success: true,
      message: "Interview Report generate successfully",
      interviewReport,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Fetch one report owned by the authenticated user.
 *
 * @route GET /api/interview/report/:interviewId
 * @param {import("express").Request} req Request containing the report ID.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Express error handler.
 * @returns {Promise<import("express").Response|void>} Report response or an error.
 */
export const getInterviewReportById = async (req, res, next) => {
  try {
    const { interviewId } = req.params;
    if (!mongoose.isValidObjectId(interviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview report ID.",
      });
    }

    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });
    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        message: "Interview report not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Report fetched successfully",
      interviewReport,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * List summary information for reports owned by the authenticated user.
 *
 * @route GET /api/interview
 * @param {import("express").Request} req Authenticated request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Express error handler.
 * @returns {Promise<import("express").Response|void>} Report summaries or an error.
 */
export const getAllInterviewReports = async (req, res, next) => {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -__v",
      );
    return res.status(200).json({
      success: true,
      message: "All interview reports fetched successfully",
      interviewReports,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete a report only when it belongs to the authenticated user.
 *
 * @route DELETE /api/interview/report/:interviewId
 * @param {import("express").Request} req Request containing the report ID.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Express error handler.
 * @returns {Promise<import("express").Response|void>} Delete result or an error.
 */
export const deleteInterviewReport = async (req, res, next) => {
  try {
    const { interviewId } = req.params;
    if (!mongoose.isValidObjectId(interviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview report ID.",
      });
    }

    const interviewReport = await interviewReportModel.findOneAndDelete({
      _id: interviewId,
      user: req.user.id,
    });
    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        message: "Interview report not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview report deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
};
