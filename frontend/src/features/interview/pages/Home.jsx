import "../style/home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
const Home = () => {
  const { loading, generateReport } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();
  const handleGenerateReport = async (e) => {
    e.preventDefault();
    const resumeFile = resumeInputRef.current?.files?.[0];
    if (!resumeFile) {
      toast.error("Please upload your resume as a PDF.");
      return;
    }

    const result = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    if (!result.success || !result.response?._id) {
      toast.error(result.message || "Report generation failed.");
      return;
    }
    navigate(`/interview/${result.response._id}`);
  };
  return (
    <main className="home">
      <div className="home__container">
        <header className="home__header">
          <span className="home__eyebrow">
            <span className="home__eyebrow-mark" aria-hidden="true">
              ✦
            </span>
            INTERVIEW PREPARATION
          </span>
          <h1>Create your custom interview plan</h1>
          <p>
            Share a few details about the role and your experience. We’ll use
            them to shape your preparation.
          </p>
        </header>

        <form className="generate" onSubmit={handleGenerateReport} aria-busy={loading}>
          <section className="generate__role">
            <div className="generate__section-heading">
              <span className="generate__number">01</span>
              <div>
                <h2>The role</h2>
                <p>Give us the context for your next opportunity.</p>
              </div>
            </div>

            <div className="generate__field">
              <label htmlFor="jobDescription">Job description</label>
              <textarea
                onChange={(e) => setJobDescription(e.target.value)}
                name="jobDescription"
                id="jobDescription"
                placeholder="Paste the job description here..."
                required
              ></textarea>
              <span className="generate__hint">
                Include responsibilities and qualifications for a more tailored
                plan.
              </span>
            </div>
          </section>

          <section className="generate__profile">
            <div className="generate__section-heading">
              <span className="generate__number">02</span>
              <div>
                <h2>Your profile</h2>
                <p>Help us understand what you bring to the role.</p>
              </div>
            </div>

            <div className="generate__field">
              <label htmlFor="resume">
                Resume <span>(PDF)</span>
              </label>
              <input
                className="generate__file"
                type="file"
                name="resume"
                id="resume"
                ref={resumeInputRef}
                accept=".pdf"
                required
              />
            </div>

            <div className="generate__field">
              <label htmlFor="selfDescription">About you</label>
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                className="generate__about"
                name="selfDescription"
                id="selfDescription"
                placeholder="Share your experience, strengths, and what you’d like to highlight..."
                required
              ></textarea>
            </div>

            <button className="generate-btn" type="submit" disabled={loading}>
              <span>{loading ? "Generating your plan..." : "Generate interview plan"}</span>
              <span className="generate-btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
          </section>
        </form>

        <p className="home__footnote">
          <span aria-hidden="true">●</span> Your information is used to prepare
          your interview plan.
        </p>
      </div>
    </main>
  );
};

export default Home;
