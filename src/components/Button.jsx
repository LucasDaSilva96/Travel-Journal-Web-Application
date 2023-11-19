import styles from "./Button.module.css";
function Button({ children, clickHandle, type }) {
  return (
    <button onClick={clickHandle} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
