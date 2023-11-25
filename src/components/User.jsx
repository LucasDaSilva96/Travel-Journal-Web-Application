// Importing necessary styles, user data, and hooks from react
import styles from "./User.module.css";
import FAKE_USER from "../data/FakeUserData";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

// Functional component for rendering user information and logout button
function User() {
  // Accessing fake user data
  const user = FAKE_USER;

  // Accessing navigate and logout functions from the FakeAuthContext
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Function to handle logout and navigate to the home page
  function handleClick() {
    logout();
    navigate("/");
  }

  // Rendering user information and logout button
  return (
    <div className={styles.user}>
      {/* Displaying user avatar */}
      <img src={user.avatar} alt={user.name} />
      {/* Displaying welcome message with user's name */}
      <span>Welcome, {user.name}</span>
      {/* Logout button with onClick event */}
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

// Exporting the User component
export { User };
