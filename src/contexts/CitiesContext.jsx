import { createContext, useContext, useEffect, useReducer } from "react";
import CITIES from "../data/Data";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

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

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    function fetchCity() {
      dispatch({ type: "loading" });

      setTimeout(() => {
        dispatch({ type: "cities/loaded", payload: CITIES });
      }, 1500);
    }
    fetchCity();
  }, []);

  function getCity(id) {
    let ID;
    if (isNaN(id)) {
      ID = id;
    } else {
      ID = Number(id);
    }

    if (Object.keys(currentCity).length > 0) {
      if (currentCity.id.toString() === id) {
        const data = cities.find((el) => el.id === ID);
        dispatch({ type: "city/loaded", payload: data });
        return;
      }
    }

    dispatch({ type: "loading" });
    const data = cities.find((el) => el.id === ID);
    setTimeout(() => {
      dispatch({ type: "city/loaded", payload: data });
    }, 1500);
  }

  function deleteCity(id) {
    dispatch({ type: "loading" });

    const citiesArray = cities.filter(
      (city) => city.id.toString() !== id.toString()
    );

    setTimeout(() => {
      dispatch({ type: "city/deleted", payload: citiesArray });
    }, 1500);
  }

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

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CityProvider");
  return context;
}

export { CitiesProvider, useCities };
