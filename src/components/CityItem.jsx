// Importing necessary components and hooks from react and react-router-dom
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

// Function to format a date using the Intl.DateTimeFormat
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

// Functional component for displaying a city item
function CityItem({ city }) {
  // Accessing functions and data from the CitiesContext
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  // Function to handle click event for deleting a city
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  // Rendering a city item with details and a link to the City component
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* Displaying the emoji, city name, visit date, and delete button */}
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

// Exporting the CityItem component as the default export
export default CityItem;
