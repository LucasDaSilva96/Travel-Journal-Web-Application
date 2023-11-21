import { createContext, useContext, useEffect, useState } from "react";
import CITIES from "../data/Data";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    function fethCity() {
      setIsLoading(true);
      setCities(CITIES);

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
    fethCity();
  }, []);

  function getCity(id) {
    let ID;
    if (isNaN(id)) {
      ID = id;
    } else {
      ID = Number(id);
    }

    setIsLoading(true);
    const data = cities.find((el) => el.id === ID);
    setCurrentCity(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        setCities,
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

function createCity(newCity) {
  return CITIES.push(newCity);
}

export { CitiesProvider, useCities, createCity };
