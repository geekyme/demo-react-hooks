import { useHandler } from "../Form/FormUtils";

export default function FormRadio(props) {
  const { setValue, value } = useHandler({
    name: props.name,
    onChange: props.onChange,
    initialState: props.value,
    transformValue(value) {
      return value === props.value;
    }
  });

  function onChange() {
    setValue(props.value);
  }

  return (
    <div style={{ margin: "20px 10px" }}>
      <input {...props} type="radio" onChange={onChange} checked={value} />
      <label style={{ marginLeft: 3 }} htmlFor={props.id}>
        {props.value}
      </label>
    </div>
  );
}
