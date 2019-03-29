import { useHandler } from "../Form/FormUtils";
import Select from "react-select";

export default function FormSelect(props) {
  const { setValue, value } = useHandler({
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

  return <Select value={value} onChange={onChange} options={props.options} />;
}
