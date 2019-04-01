import styles from "./Typography.scss";
import classNames from "classnames";

export function H1(props) {
  const { children, className, ...other } = props;

  const containerClassName = classNames(styles.h1, className);
  return (
    <h1 className={containerClassName} {...other}>
      {children}
    </h1>
  );
}

export function H2(props) {
  const { children, className, ...other } = props;
  const containerClassName = classNames(styles.h2, className);

  return (
    <h2 className={containerClassName} {...other}>
      {children}
    </h2>
  );
}
