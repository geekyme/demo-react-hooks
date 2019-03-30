import { useFormState } from "../Form/FormUtils";
import Select from "react-select";
import FormUI from "components/FormUI";

export default function FormSelect(props) {
  const { initialState, name, store, ...other } = props;
  const { setValue, value } = useFormState({
    name,
    initialState,
    store
  });

  function onChange(selected) {
    setValue(selected);
    if (typeof props.onChange === "function") {
      props.onChange(selected);
    }
  }

  return (
    <FormUI name={props.name}>
      <Select
        value={value}
        onChange={onChange}
        options={props.options}
        {...other}
      />
    </FormUI>
  );
}
