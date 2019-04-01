import "reset-css";
import styles from "./Layout.scss";

export default function Layout(props) {
  return (
    <div className={styles.bg}>
      <h1>QONTRA</h1>
      {props.children}
    </div>
  );
}
