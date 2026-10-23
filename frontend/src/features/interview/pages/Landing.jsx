import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context.jsx";
import "./landing.scss";

const Landing = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <main className="landing">
      <section className="landing__hero">
        <div className="landing__copy">
          <span className="landing__eyebrow">
            <span aria-hidden="true">✦</span> PREPARE WITH PURPOSE
          </span>
          <h1>
            Your next interview,
            <br />
            <span>your best one yet.</span>
          </h1>
          <p>
            Pandit helps you turn a job description and your experience into a
            focused interview plan—with practice questions, thoughtful answers,
            skill insights, and a clear preparation roadmap.
          </p>
          <div className="landing__actions">
            <Link className="landing__button landing__button--primary" to={user ? "/create" : "/login"}>
              Create your plan <span aria-hidden="true">→</span>
            </Link>
            {!loading && !user && (
              <Link className="landing__button landing__button--secondary" to="/login">
                Login
              </Link>
            )}
          </div>
          <div className="landing__trust">
            <span className="landing__trust-mark" aria-hidden="true">✓</span>
            Personalized to your role and experience
          </div>
        </div>

        <div className="landing-preview" aria-label="Interview plan preview">
          <div className="landing-preview__top">
            <div>
              <span className="landing-preview__overline">YOUR PREPARATION PLAN</span>
              <h2>Ready when you are.</h2>
            </div>
            <span className="landing-preview__sparkle" aria-hidden="true">✦</span>
          </div>
          <div className="landing-preview__score">
            <span className="landing-preview__score-ring">88</span>
            <span><strong>Role match</strong><small>A clearer view of your strengths</small></span>
          </div>
          <div className="landing-preview__items">
            <div><span className="landing-preview__item-icon">Q</span><span><strong>Practice questions</strong><small>Technical + behavioral</small></span><b>01</b></div>
            <div><span className="landing-preview__item-icon landing-preview__item-icon--blue">↗</span><span><strong>Preparation roadmap</strong><small>Simple steps, day by day</small></span><b>02</b></div>
            <div><span className="landing-preview__item-icon landing-preview__item-icon--amber">✦</span><span><strong>Skills to strengthen</strong><small>Focus where it matters</small></span><b>03</b></div>
          </div>
          <div className="landing-preview__footer">
            <span />
            Built around your next opportunity
          </div>
        </div>
      </section>

      <section className="landing__features" aria-label="What Pandit helps with">
        <article>
          <span>01</span>
          <h2>Know what to expect</h2>
          <p>Explore relevant questions and understand the intention behind each one.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Practice with direction</h2>
          <p>Review suggested answers that connect your skills to the role.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Prepare at your pace</h2>
          <p>Follow a practical roadmap and focus on the skills you want to grow.</p>
        </article>
      </section>
    </main>
  );
};

export default Landing;
