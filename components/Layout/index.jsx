import "reset-css/reset.css";
import styles from "./Layout.scss";
import { H1 } from "components/Typography";
import { TiArrowRight } from "react-icons/ti";

export default function Layout(props) {
  return (
    <div className={styles.bg}>
      <div className={styles.header}>
        <H1 className={styles.title}>Demo React Hooks</H1>
        <p className={styles.subtitle}>
          Check out the source code{" "}
          <TiArrowRight className={styles.arrowIcon} />
        </p>
      </div>
      <div className={styles.tablet}>
        <div className={styles.screen}>{props.children}</div>
      </div>
    </div>
  );
}
