import { useHandler, useValidator } from "../Form/FormUtils";

export default function FormInput(props) {
  const { onChange, setValue, value, pristine } = useHandler({
    name: props.name,
    onChange: props.onChange,
    initialState: props.value
  });

  const error = useValidator({
    name: props.name,
    validate: props.validate,
    value
  });

  const { validate, ...other } = props;

  function _setValue(e) {
    e.preventDefault();
    const value = "boo";
    setValue({
      target: {
        value
      }
    });
  }

  return (
    <div style={{ margin: "20px 10px" }}>
      <label>{props.name}</label>
      <br />
      <input
        style={{ marginTop: 5 }}
        {...other}
        onChange={onChange}
        value={value}
      />
      <button onClick={_setValue}>Change value</button>
      <small style={{ color: "red", marginLeft: 10 }}>
        {!pristine && error && <label>{error}</label>}
      </small>
    </div>
  );
}
