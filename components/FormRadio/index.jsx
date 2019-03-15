import { useHandler } from "../Form/FormUtils";

export default function FormRadio(props) {
  const { onChange, value } = useHandler(props, {
    initialState: props.value,
    type: "radio",
    label: props.value
  });

  return (
    <div style={{ margin: "20px 10px" }}>
      <input {...props} type="radio" onChange={onChange} {...value} />
      <label style={{ marginLeft: 3 }} htmlFor={props.id}>
        {props.value}
      </label>
    </div>
  );
}
