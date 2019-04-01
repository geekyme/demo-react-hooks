import styles from "./Typography.scss";

export function H1(props) {
  const { children, ...other } = props;
  return (
    <h1 className={styles.h1} {...other}>
      {children}
    </h1>
  );
}

export function H2(props) {
  const { children, ...other } = props;
  return (
    <h1 className={styles.h2} {...other}>
      {children}
    </h1>
  );
}
