// Importing necessary components and libraries from react and react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProctectedRoute from "./pages/ProctectedRoute";

// LAZY - LOADING ↓
// Lazy loading of components for better performance
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    // Wrapping the entire application with authentication provider
    <AuthProvider>
      {/* Providing city-related context to the app */}
      <CitiesProvider>
        {/* Setting up BrowserRouter for client-side routing */}
        <BrowserRouter>
          {/* LAZY - LOADING ↓ */}
          {/* Adding suspense to handle lazy-loaded components */}
          <Suspense fallback={<SpinnerFullPage />}>
            {/* Defining routes for different pages */}
            <Routes>
              {/* Default route for the home page */}
              <Route index element={<HomePage />}></Route>
              {/* Route for pricing page */}
              <Route path="pricing" element={<Pricing />}></Route>
              {/* Route for product page */}
              <Route path="product" element={<Product />}></Route>
              {/* Route for login page */}
              <Route path="login" element={<Login />}></Route>
              {/* Protected route for the main application layout */}
              <Route
                path="app"
                element={<ProctectedRoute>{<AppLayout />}</ProctectedRoute>}
              >
                {/* Nested routes for the app layout */}
                <Route index element={<Navigate to="cities" replace />}></Route>
                <Route path="cities" element={<CityList />}></Route>
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />}></Route>
                <Route path="form" element={<Form />}></Route>
              </Route>
              {/* Route for handling any other paths */}
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

// Exporting the App component as the default export
export default App;
