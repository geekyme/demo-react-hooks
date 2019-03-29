import { useHandler, useValidator } from "../Form/FormUtils";

export function DumbFormInput(props) {
  const { name, onChange, value, error, setValue, pristine, ...other } = props;

  return (
    <div style={{ margin: "20px 10px" }}>
      <label>{name}</label>
      <br />
      <input
        style={{ marginTop: 5 }}
        onChange={onChange}
        value={value}
        {...other}
      />
      <button onClick={setValue}>Change value</button>
      <small style={{ color: "red", marginLeft: 10 }}>
        {!pristine && error && <label>{error}</label>}
      </small>
    </div>
  );
}

export default function FormInput(props) {
  const { name, validate, store, ...other } = props;
  const { setValue, value, pristine } = useHandler({
    name,
    initialState: props.value,
    store
  });

  const error = useValidator({
    name,
    validate,
    value
  });

  function onChange(e) {
    setValue(e.target.value);

    if (typeof props.onChange === "function") {
      props.onChange(e.target.value);
    }
  }

  function _setValue(e) {
    e.preventDefault();
    setValue("boo");
  }

  return (
    <DumbFormInput
      setValue={_setValue}
      pristine={pristine}
      value={value}
      onChange={onChange}
      error={error}
      name={name}
      {...other}
    />
  );
}
