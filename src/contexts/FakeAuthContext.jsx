// Importing necessary components and hooks from react
import { createContext, useContext, useReducer } from "react";
import FAKE_USER from "../data/FakeUserData";

// Creating a context for authentication-related data
const AuthContext = createContext();

// Initial state for the authentication context
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Reducer function to manage state based on actions
function reducer(state, action) {
  switch (action.type) {
    // Action to handle user login
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    // Action to handle user logout
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    // Throw an error for unknown actions
    default:
      throw new Error("Unknown action");
  }
}

// Provider component to manage authentication-related state
function AuthProvider({ children }) {
  // Using useReducer hook to manage state and actions
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Function to handle user login
  function login(email, password) {
    // Checking if the provided credentials match the fake user data
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      // Dispatching the login action with the fake user data
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      // Displaying an alert for wrong user information
      window.alert("Wrong user information");
    }
  }

  // Function to handle user logout
  function logout() {
    // Dispatching the logout action
    dispatch({ type: "logout" });
  }

  // Providing the authentication-related context to the components
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the authentication-related context
function useAuth() {
  const context = useContext(AuthContext);

  // Throwing an error if the context is used outside the AuthProvider
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");

  return context;
}

// Exporting the AuthProvider and useAuth for external use
export { AuthProvider, useAuth };
