import "reset-css";
import styles from "./Layout.scss";
import { H1 } from "components/Typography";

export default function Layout(props) {
  return (
    <div className={styles.bg}>
      <H1 className={styles.title}>Demo React Hooks</H1>
      <div className={styles.tablet}>
        <div className={styles.screen}>{props.children}</div>
      </div>
    </div>
  );
}
