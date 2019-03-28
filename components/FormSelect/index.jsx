import { useHandler } from "../Form/FormUtils";
import Select from "react-select";

export function DumbFormSelect(props) {
  return (
    <Select
      value={props.value}
      onChange={props.onChange}
      options={props.options}
    />
  );
}

export default function FormSelect(props) {
  const { setValue, value } = useHandler({
    name: props.name,
    initialState: props.value
  });

  function onChange(selected) {
    setValue(selected);
    if (typeof props.onChange === "function") {
      props.onChange(selected);
    }
  }

  return (
    <DumbFormSelect value={value} onChange={onChange} options={props.options} />
  );
}
