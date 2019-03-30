import { useFormState } from "../Form/FormUtils";
import Select from "react-select";
import FormUI from "components/FormUI";

export default function FormSelect(props) {
  const { setValue, value } = useFormState({
    name: props.name,
    initialState: props.value,
    store: props.store
  });

  function onChange(selected) {
    setValue(selected);
    if (typeof props.onChange === "function") {
      props.onChange(selected);
    }
  }

  return (
    <FormUI name={props.name}>
      <Select value={value} onChange={onChange} options={props.options} />
    </FormUI>
  );
}
