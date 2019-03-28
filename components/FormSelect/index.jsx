import { useHandler } from "../Form/FormUtils";
import ReactSelect from "react-select";

export default function Select(props) {
  const { onChange, value } = useHandler({
    name: props.name,
    onChange: props.onChange,
    initialState: props.value
  });

  function onReactSelectChange(selected) {
    onChange({
      target: {
        value: selected
      }
    });
  }

  return (
    <ReactSelect
      value={value}
      onChange={onReactSelectChange}
      options={props.options}
    />
  );
}
