import "./loadingScreen.scss";

const LoadingScreen = ({ message = "Loading your workspace..." }) => (
  <main className="loading-screen" aria-live="polite" aria-busy="true">
    <span className="loading-screen__spinner" aria-hidden="true" />
    <p>{message}</p>
  </main>
);

export default LoadingScreen;
