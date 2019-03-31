import { useFormState } from "../Form/FormUtils";
import FormUI from "components/FormUI";
import { forwardRef, useImperativeHandle } from "react";

function FormCheckbox(props, ref) {
  const { name, initialState = false, store, ...other } = props;
  const { setValue, value } = useFormState({
    name,
    initialState,
    store
  });

  function onChange(e) {
    setValue(e.target.checked);
  }

  function _setValue(e) {
    e.preventDefault();
    setValue(!value);
  }

  useImperativeHandle(ref, () => ({
    setValue: value => {
      setValue(value);
    }
  }));

  return (
    <FormUI style={{ margin: "10px 20px" }} name={name}>
      <input onChange={onChange} type="checkbox" checked={value} {...other} />
      <button onClick={_setValue}>Change value</button>
    </FormUI>
  );
}

export default forwardRef(FormCheckbox);
