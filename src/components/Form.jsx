// Importing necessary components and hooks from react
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import { setLocalStorage } from "../data/Data";

// Function to convert a country code to an emoji
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// Functional component for rendering a form to add a new city
function Form() {
  // Accessing functions and data from the CitiesContext and react-router-dom
  const { dispatch, isLoading, cities } = useCities();
  const navigate = useNavigate();

  // State variables to manage form inputs and geolocation data
  const [isLoadingGeocoding, setIsLoadingGeocode] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geolocationError, setGeoloacationError] = useState(null);

  // Custom hook to get the latitude and longitude from the URL
  const [lat, lng] = useUrlPosition();

  // Effect to fetch city data based on geolocation when latitude and longitude are available
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocode(true);

          // Fetching reverse geocoding data using the BigDataCloud API
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );

          const data = await res.json();

          // Handling errors and updating state with geolocation data
          if (!data.countryCode) {
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else🤨"
            );
          } else {
            setCountry(data.countryName);
            setCityName(data.city);
            setEmoji(data.countryCode);
            setGeoloacationError(null);
          }
        } catch (err) {
          setGeoloacationError(err.message);
        } finally {
          setIsLoadingGeocode(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Check if required fields are filled
    if (!cityName || !date) return;

    // Create a new city object
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
      id: crypto.randomUUID(),
    };

    // Dispatch loading action and add a delay for loading effect
    dispatch({ type: "loading" });
    setTimeout(() => {
      // Dispatch created action, update local storage, and navigate to cities
      dispatch({ type: "city/created", payload: newCity });
      setLocalStorage([...cities, newCity]);
      navigate("/app/cities");
    }, 1000);
  }

  // Conditional rendering based on geolocation and form state
  if (isLoadingGeocoding) return <Spinner />;
  if (geolocationError !== null)
    return <Message message={geolocationError}></Message>;
  if (!lat && !lng) return <Message message={"Start by clicking on the map"} />;

  // Render the form with input fields and buttons
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      {/* Input field for city name */}
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {<span className={styles.flag}>{emoji}</span>}
      </div>

      {/* Date picker for visit date */}
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Textarea for notes */}
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      {/* Buttons for form submission and navigation */}
      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          clickHandle={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

// Exporting the Form component as the default export
export default Form;
