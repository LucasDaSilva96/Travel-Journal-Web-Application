import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Messages from "./Message";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner></Spinner>;

  if (!cities.length)
    return <Messages message={"Add your first city"}></Messages>;

  return (
    <ul className={styles.cityList}>
      {cities.map((city, i) => (
        <CityItem city={city} key={i} />
      ))}
    </ul>
  );
}

export default CityList;
