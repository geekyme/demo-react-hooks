import styles from "./FormUI.scss";
import classNames from "classnames";

export function Label({ label }) {
  return label ? <label className={styles.label}>{label}</label> : null;
}

export function Error({ pristine, error }) {
  const show = !pristine && error;

  return show ? <small className={styles.error}>{error}</small> : null;
}

export default function FormUI(props) {
  const { children, label, error, pristine, className, ...other } = props;

  const containerClassName = classNames(styles.ui, className);
  return (
    <div {...other} className={containerClassName}>
      <Label label={label} />
      {children}
      <Error pristine={pristine} error={error} />
    </div>
  );
}
