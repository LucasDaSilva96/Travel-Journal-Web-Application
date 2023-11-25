// Importing the useSearchParams hook from react-router-dom
import { useSearchParams } from "react-router-dom";

// Custom hook to extract latitude and longitude from the URL search parameters
function useUrlPosition() {
  // Accessing search parameters from the URL
  const [searchParams] = useSearchParams();

  // Extracting latitude and longitude from the search parameters
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Returning an array with latitude and longitude
  return [lat, lng];
}

// Exporting the useUrlPosition hook as the default export
export default useUrlPosition;
