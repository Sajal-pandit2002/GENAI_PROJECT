import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useInterview } from "../hooks/useInterview.js";
import "../style/interviewReport.scss";

const QuestionCard = ({ question, index }) => (
  <article className="report-question">
    <div className="report-question__title">
      <span className="report-question__number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3>{question.question}</h3>
    </div>
    <div className="report-question__detail">
      <span className="report-question__label">Intention</span>
      <p>{question.intention}</p>
    </div>
    <div className="report-question__detail report-question__detail--answer">
      <span className="report-question__label">Answer</span>
      <p>{question.answer}</p>
    </div>
  </article>
);

const InterviewReport = () => {
  const { interviewId } = useParams();
  const { getReportById } = useInterview();
  const [activeSection, setActiveSection] = useState("technical");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadReport = async () => {
      setLoading(true);
      setError("");
      const result = await getReportById(interviewId);
      if (!active) return;

      if (result.success && result.response) {
        setReport(result.response);
      } else {
        setError(result.message || "Could not load this interview report.");
      }
      setLoading(false);
    };

    loadReport();
    return () => {
      active = false;
    };
  }, [getReportById, interviewId]);

  if (loading) {
    return (
      <main className="interview-report interview-report--status" aria-live="polite">
        <p>Loading your interview plan...</p>
      </main>
    );
  }

  if (error || !report) {
    return (
      <main className="interview-report interview-report--status" role="alert">
        <div>
          <h1>Interview plan unavailable</h1>
          <p>{error || "The requested interview report could not be found."}</p>
          <Link className="report-status-link" to="/">Back to interview plans</Link>
        </div>
      </main>
    );
  }

  const technicalQuestions = report.technicalQuestions ?? [];
  const behavioralQuestions = report.behavioralQuestions ?? [];
  const skillGaps = report.skillGaps ?? [];
  const preparationPlan = report.preparationPlan ?? [];
  const matchScore = report.matchScore ?? 0;
  const totalQuestions = technicalQuestions.length + behavioralQuestions.length;
  const createdAt = new Date(report.createdAt);
  const reportDate = report.createdAt && !Number.isNaN(createdAt.getTime())
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(createdAt)
    : "Date unavailable";

  return (
    <main className="interview-report">
      <div className="interview-report__container">
        <header className="report-header">
          <div>
            <span className="report-header__eyebrow">YOUR INTERVIEW TOOLKIT</span>
            <h1>{report.title || "Your interview plan"}</h1>
            <p>
              Personalized preparation to help you walk into your next interview
              with confidence.
            </p>
          </div>
          <div className="report-header__date">
            <span className="report-header__date-icon" aria-hidden="true">▦</span>
            <span>
              <small>CREATED ON</small>
              <strong>{reportDate}</strong>
            </span>
          </div>
        </header>

        <section className="report-overview" aria-label="Report overview">
          <div className="report-score">
            <div
              className="report-score__ring"
              style={{
                background: `conic-gradient(#e1034d ${matchScore}%, rgba(255, 255, 255, 0.12) 0)`,
              }}
              role="img"
              aria-label={`Match score: ${matchScore} out of 100`}
            >
              <div className="report-score__inner">
                <strong>{matchScore}</strong>
                <span>OUT OF 100</span>
              </div>
            </div>
            <div>
              <span className="report-overview__label">ROLE MATCH</span>
              <h2>{matchScore >= 80 ? "Strong alignment" : "Room to grow"}</h2>
              <p>Match score based on your profile and the role requirements.</p>
            </div>
          </div>
          <div className="report-overview__stats">
            <div className="report-stat">
              <span className="report-stat__icon report-stat__icon--red" aria-hidden="true">Q</span>
              <span><strong>{totalQuestions}</strong><small>Practice questions</small></span>
            </div>
            <div className="report-stat">
              <span className="report-stat__icon report-stat__icon--blue" aria-hidden="true">↗</span>
              <span><strong>{preparationPlan.length} days</strong><small>Preparation roadmap</small></span>
            </div>
            <div className="report-stat">
              <span className="report-stat__icon report-stat__icon--amber" aria-hidden="true">✦</span>
              <span><strong>{skillGaps.length} areas</strong><small>To strengthen</small></span>
            </div>
          </div>
        </section>

        <div className="report-workspace">
          <nav className="report-sidebar" aria-label="Interview report sections">
            <span className="report-sidebar__label">YOUR PLAN</span>
            <button
              className={`report-sidebar__button${activeSection === "technical" ? " is-active" : ""}`}
              type="button"
              aria-pressed={activeSection === "technical"}
              onClick={() => setActiveSection("technical")}
            >
              <span className="report-sidebar__icon" aria-hidden="true">{"</>"}</span>
              <span>Technical questions</span>
              <span className="report-sidebar__count">{technicalQuestions.length}</span>
            </button>
            <button
              className={`report-sidebar__button${activeSection === "behavioral" ? " is-active" : ""}`}
              type="button"
              aria-pressed={activeSection === "behavioral"}
              onClick={() => setActiveSection("behavioral")}
            >
              <span className="report-sidebar__icon" aria-hidden="true">◎</span>
              <span>Behavioral questions</span>
              <span className="report-sidebar__count">{behavioralQuestions.length}</span>
            </button>
            <button
              className={`report-sidebar__button${activeSection === "skills" ? " is-active" : ""}`}
              type="button"
              aria-pressed={activeSection === "skills"}
              onClick={() => setActiveSection("skills")}
            >
              <span className="report-sidebar__icon" aria-hidden="true">✦</span>
              <span>Skill gaps</span>
              <span className="report-sidebar__count">{skillGaps.length}</span>
            </button>
            <button
              className={`report-sidebar__button${activeSection === "preparation" ? " is-active" : ""}`}
              type="button"
              aria-pressed={activeSection === "preparation"}
              onClick={() => setActiveSection("preparation")}
            >
              <span className="report-sidebar__icon" aria-hidden="true">▤</span>
              <span>Preparation plan</span>
              <span className="report-sidebar__count">{preparationPlan.length}d</span>
            </button>
          </nav>

          <section className="report-section report-content" aria-live="polite">
            {activeSection === "technical" && (
              <>
                <div className="report-section__heading">
                  <div>
                    <span className="report-section__eyebrow">BE READY FOR WHAT’S NEXT</span>
                    <h2>Technical questions</h2>
                  </div>
                  <span className="report-section__count">{technicalQuestions.length} QUESTIONS</span>
                </div>
                {technicalQuestions.length ? (
                  <div className="report-question-list">
                    {technicalQuestions.map((question, index) => (
                      <QuestionCard key={`${question.question}-${index}`} question={question} index={index} />
                    ))}
                  </div>
                ) : <p className="report-empty">No technical questions are available for this report.</p>}
              </>
            )}

            {activeSection === "behavioral" && (
              <>
                <div className="report-section__heading">
                  <div>
                    <span className="report-section__eyebrow">TELL YOUR STORY</span>
                    <h2>Behavioral questions</h2>
                  </div>
                  <span className="report-section__count">{behavioralQuestions.length} QUESTIONS</span>
                </div>
                {behavioralQuestions.length ? (
                  <div className="report-question-list">
                    {behavioralQuestions.map((question, index) => (
                      <QuestionCard key={`${question.question}-${index}`} question={question} index={index} />
                    ))}
                  </div>
                ) : <p className="report-empty">No behavioral questions are available for this report.</p>}
              </>
            )}

            {activeSection === "skills" && (
              <>
                <div className="report-section__heading">
                  <div>
                    <span className="report-section__eyebrow">GROW WITH PURPOSE</span>
                    <h2>Skills to strengthen</h2>
                  </div>
                  <span className="report-section__count">{skillGaps.length} AREAS</span>
                </div>
                <p className="report-skills__intro">
                  Focus on these areas to become an even stronger candidate.
                </p>
                {skillGaps.length ? (
                  <div className="report-skills__list">
                    {skillGaps.map((gap) => (
                      <article className="report-skill" key={gap.skill}>
                        <span className={`report-skill__dot report-skill__dot--${gap.severity}`} />
                        <div>
                          <h3>{gap.skill}</h3>
                          <span className={`report-skill__level report-skill__level--${gap.severity}`}>
                            {gap.severity} priority
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : <p className="report-empty">No skill gaps were identified in this report.</p>}
                <div className="report-skills__note">
                  <span aria-hidden="true">✦</span>
                  <p>Small, focused practice sessions can make a big difference. Use your roadmap one day at a time.</p>
                </div>
              </>
            )}

            {activeSection === "preparation" && (
              <>
                <div className="report-section__heading">
                  <div>
                    <span className="report-section__eyebrow">YOUR PREPARATION ROADMAP</span>
                    <h2>Preparation plan</h2>
                  </div>
                  <span className="report-section__count">{preparationPlan.length} DAYS</span>
                </div>
                {preparationPlan.length ? (
                  <div className="report-days">
                    {preparationPlan.map((day) => (
                      <article className="report-day" key={day._id || day.day}>
                        <span className="report-day__number">{String(day.day).padStart(2, "0")}</span>
                        <div className="report-day__content">
                          <span className="report-day__label">DAY {day.day}</span>
                          <h3>{day.focus}</h3>
                          <ul>{day.tasks.map((task, index) => <li key={`${task}-${index}`}>{task}</li>)}</ul>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : <p className="report-empty">No preparation plan is available for this report.</p>}
              </>
            )}
          </section>
        </div>

        <footer className="report-footer">
          <span>YOU’VE GOT THIS</span>
          <span>Prepared with care · {reportDate}</span>
        </footer>
      </div>
    </main>
  );
};

export default InterviewReport;
