import { useFormState } from "../Form/FormUtils";
import FormUI from "components/FormUI";
import { forwardRef, useImperativeHandle } from "react";

function FormInput(props, ref) {
  const { name, validate, store, initialState = "", ...other } = props;
  const { setValue, value, pristine, error } = useFormState({
    name,
    initialState,
    store,
    validate
  });

  useImperativeHandle(ref, () => ({
    setValue: value => {
      setValue(value);
    }
  }));

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
    <FormUI
      style={{ margin: "20px 10px" }}
      pristine={pristine}
      error={error}
      name={name}
    >
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

export default forwardRef(FormInput);
