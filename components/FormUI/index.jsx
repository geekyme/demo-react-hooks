export default function FormUI(props) {
  const { children, name, error, pristine, ...other } = props;
  return (
    <div {...other}>
      <label>{name}</label>
      <br />
      {children}
      <small style={{ color: "red", marginLeft: 10 }}>
        {!pristine && error && <label>{error}</label>}
      </small>
    </div>
  );
}
