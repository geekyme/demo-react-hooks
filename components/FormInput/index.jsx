import { useHandler, useValidator } from "../Form/FormUtils";
import FormUI from "components/FormUI";

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
    <FormUI style={{ margin: "20px 10px" }} pristine={pristine} error={error}>
      <input
        style={{ marginTop: 5 }}
        onChange={onChange}
        value={value}
        {...other}
      />
      <button onClick={_setValue}>Change value</button>
    </FormUI>
  );
}
