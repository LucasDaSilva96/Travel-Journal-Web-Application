// Importing necessary components and hooks from react and react-router-dom
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import Button from "./Button";

// Function to format a date using the Intl.DateTimeFormat
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// Functional component for displaying details of a city
function City() {
  // Accessing the navigate function and city ID from the URL parameters
  const navigate = useNavigate();
  const { id } = useParams();

  // Accessing functions and data from the CitiesContext
  const { getCity, currentCity, isLoading } = useCities();

  // Fetching city data on component mount or when the ID changes
  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  // Destructuring relevant data from the current city
  const { cityName, emoji, date, notes } = currentCity;

  // Displaying a spinner while data is being loaded
  if (isLoading) return <Spinner />;

  // Rendering the city details
  return (
    <div className={styles.city}>
      {/* Displaying the city name and emoji */}
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      {/* Displaying the visit date */}
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {/* Displaying notes if available */}
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      {/* Displaying a link to Wikipedia for more information */}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      {/* Displaying a back button with a click event to navigate back */}
      <div>
        <Button type={"primary"} clickHandle={() => navigate(-1)}>
          &#8592; Back
        </Button>
      </div>
    </div>
  );
}

// Exporting the City component as the default export
export default City;
