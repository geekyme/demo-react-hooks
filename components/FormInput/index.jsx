import { useHandler, useValidator } from "../Form/FormUtils";

export default function FormInput(props) {
  const { setValue, value, pristine } = useHandler({
    name: props.name,
    initialState: props.value
  });

  const error = useValidator({
    name: props.name,
    validate: props.validate,
    value
  });

  function onChange(e) {
    setValue(e.target.value);
    props.onChange(e.target.value);
  }

  const { validate, ...other } = props;

  function _setValue(e) {
    e.preventDefault();
    setValue("boo");
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
