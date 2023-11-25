// Importing necessary components and hooks from react and react-router-dom
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

// Login component for user authentication
export default function Login() {
  // State variables for email and password, pre-filled for development purposes
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("user");
  // Accessing navigate function from react-router-dom
  const navigate = useNavigate();

  // Accessing login function and authentication status from context
  const { login, isAuthenticated } = useAuth();

  // Handling form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Calling login function if email and password are provided
    if (email && password) login(email, password);
  }

  // Redirecting to the main app page if already authenticated
  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    // Dependency array to re-run the effect when authentication status or navigate changes
    [isAuthenticated, navigate]
  );

  // Rendering the login form
  return (
    <main className={styles.login}>
      {/* Navigation component */}
      <PageNav></PageNav>
      {/* Login form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {/* Button for form submission */}
        <div>
          <Button type="primary" clickHandle={handleSubmit}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
