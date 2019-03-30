import { useHandler } from "../Form/FormUtils";
import FormUI from "components/FormUI";

export default function FormRadio(props) {
  const { setValue, value } = useHandler({
    name: props.name,
    onChange: props.onChange,
    initialState: props.value,
    store: props.store,
    transformValue(value) {
      return value === props.value;
    }
  });

  function onChange() {
    setValue(props.value);
  }

  return (
    <FormUI style={{ margin: "20px 10px" }} name={props.name}>
      <input {...props} type="radio" onChange={onChange} checked={value} />
      <label style={{ marginLeft: 3 }} htmlFor={props.id}>
        {props.value}
      </label>
    </FormUI>
  );
}
