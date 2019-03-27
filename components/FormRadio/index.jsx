import { useHandler } from "../Form/FormUtils";

export default function FormRadio(props) {
  const { onChange, value } = useHandler(props, {
    initialState: props.value,
    transformValue(value) {
      return value === props.value;
    },
    getElementValue(e) {
      return e.target.checked;
    }
  });

  return (
    <div style={{ margin: "20px 10px" }}>
      <input {...props} type="radio" onChange={onChange} checked={value} />
      <label style={{ marginLeft: 3 }} htmlFor={props.id}>
        {props.value}
      </label>
    </div>
  );
}
