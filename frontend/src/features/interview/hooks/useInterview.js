import { useCallback, useContext } from "react";
import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
  deleteInterviewReport as deleteInterviewReportRequest,
} from "../services/interview.api";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    try {
      const data = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(data.interviewReport);
      return {
        success: data.success,
        message: data.message,
        response: data.interviewReport,
      };
    } catch (error) {
      const message = error.message || "Report generation failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };
  const getReportById = useCallback(
    async (interviewId) => {
      setLoading(true);
      try {
        const data = await getInterviewReportById(interviewId);
        setReport(data.interviewReport);
        return {
          success: data.success,
          message: data.message,
          response: data.interviewReport,
        };
      } catch (error) {
        const message = error.message || "Failed to fetch interview report";
        return { success: false, message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport],
  );

  const getAllReports = useCallback(
    async () => {
      setLoading(true);
      try {
        const data = await getAllInterviewReports();
        setReports(data.interviewReports);
        return {
          success: data.success,
          message: data.message,
          response: data.interviewReports,
        };
      } catch (error) {
        const message = error.message || "Failed to fetch interview reports";
        return { success: false, message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReports],
  );
  const removeReport = useCallback(
    async (interviewId) => {
      try {
        const data = await deleteInterviewReportRequest(interviewId);
        setReports((currentReports) =>
          currentReports.filter((item) => item._id !== interviewId),
        );
        return { success: data.success, message: data.message };
      } catch (error) {
        return {
          success: false,
          message: error.message || "Failed to delete interview report",
        };
      }
    },
    [setReports],
  );
  return {
    generateReport,
    getReportById,
    getAllReports,
    removeReport,
    loading,
    report,
    reports,
  };
};
