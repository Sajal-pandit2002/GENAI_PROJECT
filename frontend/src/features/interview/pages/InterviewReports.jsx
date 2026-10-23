import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useInterview } from "../hooks/useInterview.js";
import "./interviewReports.scss";

const formatReportDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const InterviewReports = () => {
  const { getAllReports, removeReport } = useInterview();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingReportId, setDeletingReportId] = useState(null);

  const loadReports = useCallback(async () => {
    setLoading(true);
    setError("");
    const result = await getAllReports();
    if (result.success) {
      setReports(result.response ?? []);
    } else {
      setError(result.message || "Could not load your interview reports.");
    }
    setLoading(false);
  }, [getAllReports]);

  const handleDeleteReport = async (reportId, reportTitle) => {
    const confirmed = window.confirm(
      `Delete "${reportTitle || "this interview report"}"? This action cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingReportId(reportId);
    const result = await removeReport(reportId);
    if (result.success) {
      setReports((currentReports) =>
        currentReports.filter((report) => report._id !== reportId),
      );
      toast.success(result.message);
    } else {
      toast.error(result.message || "Could not delete this report.");
    }
    setDeletingReportId(null);
  };

  useEffect(() => {
    let active = true;
    getAllReports().then((result) => {
      if (!active) return;
      if (result.success) {
        setReports(result.response ?? []);
      } else {
        setError(result.message || "Could not load your interview reports.");
      }
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [getAllReports]);

  return (
    <main className="reports-page">
      <div className="reports-page__container">
        <header className="reports-page__header">
          <div>
            <span className="reports-page__eyebrow">YOUR INTERVIEW TOOLKIT</span>
            <h1>All interview reports</h1>
            <p>Review your saved plans and pick up your preparation where you left off.</p>
          </div>
          <Link className="reports-page__create" to="/create">
            <span aria-hidden="true">＋</span> Create a plan
          </Link>
        </header>

        {loading ? (
          <section className="reports-status" aria-live="polite">
            <span className="reports-status__spinner" aria-hidden="true" />
            <p>Loading your reports...</p>
          </section>
        ) : error ? (
          <section className="reports-status reports-status--error" role="alert">
            <h2>Reports couldn’t be loaded</h2>
            <p>{error}</p>
            <button type="button" onClick={loadReports}>Try again</button>
          </section>
        ) : reports.length === 0 ? (
          <section className="reports-empty">
            <span className="reports-empty__icon" aria-hidden="true">▤</span>
            <h2>No interview plans yet</h2>
            <p>Create a personalized plan to see your questions, skill insights, and preparation roadmap here.</p>
            <Link className="reports-page__create" to="/create">Create your first plan</Link>
          </section>
        ) : (
          <section className="reports-grid" aria-label="Your interview reports">
            {reports.map((report) => (
              <article className="report-list-card" key={report._id}>
                <div className="report-list-card__top">
                  <span className="report-list-card__icon" aria-hidden="true">✦</span>
                  <span className="report-list-card__score">
                    {report.matchScore ?? "--"}<small>{report.matchScore == null ? "" : "% match"}</small>
                  </span>
                </div>
                <h2>{report.title || "Interview preparation plan"}</h2>
                <p className="report-list-card__date">
                  Created {formatReportDate(report.createdAt)}
                </p>
                <Link
                  className="report-list-card__link"
                  to={`/interview/${report._id}`}
                  aria-label={`Open ${report.title || "interview report"}`}
                >
                  View report <span aria-hidden="true">→</span>
                </Link>
                <button
                  className="report-list-card__delete"
                  type="button"
                  disabled={deletingReportId === report._id}
                  onClick={() =>
                    handleDeleteReport(report._id, report.title)
                  }
                >
                  {deletingReportId === report._id ? "Deleting..." : "Delete report"}
                </button>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default InterviewReports;
