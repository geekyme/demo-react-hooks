import { useHandler } from "../Form/FormUtils";

export default function FormRadio(props) {
  const { onChange, value } = useHandler(props, {
    initialState: props.value,
    type: "radio",
    label: props.value
  });

  return (
    <div>
      <input {...props} type="radio" onChange={onChange} {...value} />
      <label htmlFor={props.id}>{props.value}</label>
    </div>
  );
}
