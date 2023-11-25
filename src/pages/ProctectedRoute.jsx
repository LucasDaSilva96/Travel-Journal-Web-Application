// Importing necessary components and hooks from react and react-router-dom
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

// Function component for a protected route
function ProctectedRoute({ children }) {
  // Accessing authentication status and navigate function from context
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Using useEffect to check authentication status on component mount
  useEffect(
    function () {
      // Redirect to home page if not authenticated
      if (!isAuthenticated) navigate("/");
    },
    // Dependency array to re-run the effect when authentication status or navigate changes
    [isAuthenticated, navigate]
  );

  // Rendering the children if authenticated, otherwise returning null
  return isAuthenticated ? children : null;
}

// Exporting the ProtectedRoute component as the default export
export default ProctectedRoute;
