import { useHandler, useValidator } from "../Form/FormUtils";

export default function FormInput(props) {
  const { onChange, onSetValue, value } = useHandler(props, {
    initialState: ""
  });
  const error = useValidator(props.validate, value);

  const { validate, ...other } = props;

  function _onSetValue(e) {
    e.preventDefault();
    const value = "boo";
    onSetValue(value);
  }

  return (
    <div style={{ margin: "20px 10px" }}>
      <label>{props.name}</label>
      <br />
      <input
        style={{ marginTop: 5 }}
        {...other}
        onChange={onChange}
        {...value}
      />
      <button onClick={_onSetValue}>Change value</button>
      <small style={{ color: "red", marginLeft: 10 }}>
        {error || <label>{error}</label>}
      </small>
    </div>
  );
}
