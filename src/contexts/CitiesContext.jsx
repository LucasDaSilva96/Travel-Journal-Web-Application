// Importing necessary components and hooks from react
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

// Importing functions to interact with local storage from the data module
import { getLocalStorage, setLocalStorage } from "../data/Data";

// Creating a context for city-related data
const CitiesContext = createContext();

// Initial state for the city context
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

// Reducer function to manage state based on actions
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: [...action.payload],
        currentCity: {},
      };

    default:
      return {
        ...state,
        error: "Unknown action type",
      };
  }
}

// Provider component to manage city-related state
function CitiesProvider({ children }) {
  // Using useReducer hook to manage state and actions
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetching city data on component mount
  useEffect(function () {
    function fetchCity() {
      dispatch({ type: "loading" });

      // Simulating a delay for loading data
      setTimeout(() => {
        dispatch({ type: "cities/loaded", payload: getLocalStorage() });
      }, 1500);
    }
    fetchCity();
  }, []);

  // Function to get a specific city by ID
  const getCity = useCallback(
    (id) => {
      let ID;
      if (isNaN(id)) {
        ID = id;
      } else {
        ID = Number(id);
      }

      // Checking if the current city matches the requested ID
      if (Object.keys(currentCity).length > 0) {
        if (currentCity.id.toString() === id) {
          const data = cities.find((el) => el.id === ID);
          dispatch({ type: "city/loaded", payload: data });
          return;
        }
      }

      // Fetching the city data and updating the state
      dispatch({ type: "loading" });
      const data = cities.find((el) => el.id === ID);
      setTimeout(() => {
        dispatch({ type: "city/loaded", payload: data });
      }, 1500);
    },
    [currentCity, cities]
  );

  // Function to delete a city by ID
  function deleteCity(id) {
    dispatch({ type: "loading" });

    // Filtering out the deleted city and updating the state
    const citiesArray = cities.filter(
      (city) => city.id.toString() !== id.toString()
    );

    // Simulating a delay for updating data and local storage
    setTimeout(() => {
      dispatch({ type: "city/deleted", payload: citiesArray });
      setLocalStorage(citiesArray);
    }, 1500);
  }

  // Providing the city-related context to the components
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        deleteCity,
        dispatch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Custom hook to access the city-related context
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CityProvider");
  return context;
}

// Exporting the CitiesProvider and useCities for external use
export { CitiesProvider, useCities };
