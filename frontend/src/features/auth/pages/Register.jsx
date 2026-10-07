import { Link, useNavigate } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth.js";
import { useState } from "react";
import { toast } from "react-toastify";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister({ username, email, password });
    if (result.success) {
      toast.success(result.message);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };
  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }
  return (
    <>
      <main>
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
              />
            </div>
            <button className="button primary-button" type="submit">
              Register
            </button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;
