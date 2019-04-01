import { useFormState } from "../Form/FormUtils";
import FormUI from "components/FormUI";
import { forwardRef, useImperativeHandle } from "react";

function FormInput(props, ref) {
  const {
    name,
    validate,
    store,
    initialState = "",
    onChange,
    ...other
  } = props;
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

  function onInputChange(e) {
    setValue(e.target.value);

    if (typeof onChange === "function") {
      onChange(e.target.value);
    }
  }

  return (
    <FormUI pristine={pristine} error={error} name={name}>
      <input
        type="text"
        style={{ marginTop: 5 }}
        onChange={onInputChange}
        value={value}
        {...other}
      />
    </FormUI>
  );
}

export default forwardRef(FormInput);
