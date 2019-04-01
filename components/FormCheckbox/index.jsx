import { useFormState } from "../Form/FormUtils";
import FormUI from "components/FormUI";
import { forwardRef, useImperativeHandle } from "react";

function FormCheckbox(props, ref) {
  const { name, label, initialState = false, store, ...other } = props;
  const { setValue, value } = useFormState({
    name,
    initialState,
    store
  });

  function onChange(e) {
    setValue(e.target.checked);
  }

  useImperativeHandle(ref, () => ({
    setValue: value => {
      setValue(value);
    }
  }));

  return (
    <FormUI name={name}>
      <div className="check">
        <input
          id={name}
          onChange={onChange}
          type="checkbox"
          checked={value}
          {...other}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    </FormUI>
  );
}

export default forwardRef(FormCheckbox);
