import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import {
  interviewReportJsonSchema,
  interviewReportSchema,
} from "./interviewReportSchema.js";
//"gemini-3.8-flash"

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing. Set it in backend/.env.");
}

const ai = new GoogleGenAI({
  apiKey,
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = ` You are an expert technical      interviewer and career advisor.

      Your task is to analyze the candidate's resume, self-description,
      and job description and generate a complete interview preparation report.

      Candidate Resume:
      ${resume || "Not provided"}

      Candidate Self Description:
      ${selfDescription || "Not provided"}

      Job Description:
      ${jobDescription}

      Follow these instructions carefully:

      1. Calculate a realistic matchScore from 0 to 100.
      2. Generate relevant technical interview questions based on:
        - The candidate's resume
        - The candidate's skills
        - The job description
        - The technologies mentioned in the job description
      3. For every technical question:
        - Explain why the interviewer may ask it.
        - Give a practical interview-style answer.
        - Mention important points to cover.
        - Mention common mistakes when useful.
      4. Generate relevant behavioral interview questions.
      5. For every behavioral question:
        - Explain the interviewer's intention.
        - Give a strong interview-style answer.
      6. Identify the candidate's skill gaps.
      7. Give every skill gap a severity:
        - low
        - medium
        - high
      8. Create a day-wise preparation plan.
      9. Start the preparation plan from day 1.
      10. Make the preparation plan practical and related to the identified skill gaps.
      11. Return ONLY valid JSON matching the provided response schema.
     `;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportJsonSchema,
    },
  });

  const rawText = response.text;
  if (!rawText) {
    throw new Error("Gemini returned an empty response.");
  }

  const parsedResponse = JSON.parse(rawText);
  const validatedReport = interviewReportSchema.parse(parsedResponse);
  // return validatedReport;
  return validatedReport;
}

export default generateInterviewReport;
