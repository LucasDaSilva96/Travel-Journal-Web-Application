// Importing the useState hook from react
import { useState } from "react";

// Custom hook for handling geolocation functionality
function useGeolocation(defaultPosition = null) {
  // State variables for loading status, position, and error
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  // Function to get the current geolocation
  function getPosition() {
    // Checking if the browser supports geolocation
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    // Setting loading status to true
    setIsLoading(true);

    // Using geolocation API to get the current position
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (pos) => {
        // Updating position state with latitude and longitude
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        // Setting loading status to false
        setIsLoading(false);
      },
      // Error callback
      (error) => {
        // Updating error state with the error message
        setError(error.message);

        // Setting loading status to false
        setIsLoading(false);
      }
    );
  }

  // Returning an object with loading status, position, error, and the getPosition function
  return { isLoading, position, error, getPosition };
}

// Exporting the useGeolocation hook
export { useGeolocation };
