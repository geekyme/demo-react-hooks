import { useFormState } from "../Form/FormUtils";
import FormUI from "components/FormUI";

export default function FormCheckbox(props) {
  const { name, initialState, store } = props;
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

  return (
    <FormUI style={{ margin: "10px 20px" }} name={name}>
      <input {...props} onChange={onChange} type="checkbox" checked={value} />
      <button onClick={_setValue}>Change value</button>
    </FormUI>
  );
}
