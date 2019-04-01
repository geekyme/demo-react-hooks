import "reset-css";
import styles from "./Layout.scss";

export default function Layout(props) {
  return (
    <div className={styles.bg}>
      <div className={styles.tablet}>
        <div className={styles.screen}>{props.children}</div>
      </div>
    </div>
  );
}
