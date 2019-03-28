import { useHandler } from "../Form/FormUtils";
import ReactSelect from "react-select";

export default function Select(props) {
  const { setValue, value } = useHandler({
    name: props.name,
    initialState: props.value
  });

  function onChange(selected) {
    setValue(selected);
    props.onChange(selected);
  }

  return (
    <ReactSelect value={value} onChange={onChange} options={props.options} />
  );
}
