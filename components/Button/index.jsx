import styles from "./Button.scss";

function getClass(btnType) {
  if (btnType === "primary") {
    return styles.buttonPrimary;
  } else {
    return styles.button;
  }
}
export default function Button(props) {
  const { children, btnType, ...other } = props;

  return (
    <button className={getClass(btnType)} {...other}>
      {children}
    </button>
  );
}
