import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/interview",
  withCredentials: true,
});

// Create Report
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  try {
    const response = await api.post("/create", formData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Report generation failed",
      { cause: error },
    );
  }
};

export const getInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(`/report/${interviewId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Fetching report failed",
      { cause: error },
    );
  }
};

export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Fetching all reports failed",
      { cause: error },
    );
  }
};

export const deleteInterviewReport = async (interviewId) => {
  try {
    const response = await api.delete(`/report/${interviewId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Deleting report failed",
      { cause: error },
    );
  }
};
