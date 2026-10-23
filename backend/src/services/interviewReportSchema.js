import * as z from "zod";

/**
 * JSON Schema for Interview Report
 *
 * This schema defines the exact structure that Gemini
 * should return.
 */
const interviewReportJsonSchema = {
  type: "object",

  properties: {
    matchScore: {
      type: "number",
      description:
        "The match score between the candidate and the job description, ranging from 0 to 100.",
    },

    technicalQuestions: {
      type: "array",
      description:
        "List of technical questions that can be asked in the interview.",

      items: {
        type: "object",

        properties: {
          question: {
            type: "string",
            description:
              "The technical question that can be asked in the interview.",
          },

          intention: {
            type: "string",
            description:
              "The intention of the interviewer behind asking this question.",
          },

          answer: {
            type: "string",
            description:
              "How the candidate should answer this question in the interview, including important points to cover, approach to take, and mistakes to avoid.",
          },
        },

        required: ["question", "intention", "answer"],
      },
    },

    behavioralQuestions: {
      type: "array",
      description:
        "List of behavioral questions that can be asked in the interview.",

      items: {
        type: "object",

        properties: {
          question: {
            type: "string",
            description:
              "The behavioral question that can be asked in the interview.",
          },

          intention: {
            type: "string",
            description:
              "The intention of the interviewer behind asking this question.",
          },

          answer: {
            type: "string",
            description:
              "How the candidate should answer this question in the interview, including important points to cover, approach to take, and mistakes to avoid.",
          },
        },

        required: ["question", "intention", "answer"],
      },
    },

    skillGaps: {
      type: "array",
      description: "List of skill gaps that need to be addressed.",

      items: {
        type: "object",

        properties: {
          skill: {
            type: "string",
            description: "The skill that is missing or needs improvement.",
          },

          severity: {
            type: "string",
            enum: ["low", "medium", "high"],
            description:
              "The severity of the skill gap. Use low, medium, or high.",
          },
        },

        required: ["skill", "severity"],
      },
    },

    preparationPlan: {
      type: "array",
      description:
        "A day-wise preparation plan for the candidate to follow in order to prepare for the interview.",

      items: {
        type: "object",

        properties: {
          day: {
            type: "integer",
            description:
              "The day number of the preparation plan, starting from 1.",
          },

          focus: {
            type: "string",
            description: "The main topic or focus for this preparation day.",
          },

          tasks: {
            type: "array",
            description: "List of tasks to be completed on that day.",

            items: {
              type: "string",
            },
          },
        },

        required: ["day", "focus", "tasks"],
      },
    },
    title: {
      type: "string",
      description:
        "The title of the job for which the interview report is generated.",
    },
  },

  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
    "title",
  ],
};

/**
 * Zod schema
 *
 * Used to validate Gemini's returned JSON
 * after parsing it.
 */
const interviewReportSchema = z.object({
  matchScore: z.number().min(0).max(100),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),
  title: z.string(),
});

export { interviewReportJsonSchema, interviewReportSchema };
