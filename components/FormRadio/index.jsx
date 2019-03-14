import { useHandler } from "../Form/FormUtils";

export default function FormRadio(props) {
  const { onChange, _ } = useHandler(props, {
    initialState: ""
  });

  return (
    <div>
      <input {...props} type="radio" onChange={onChange} />
      <label htmlFor={props.id}>{props.value}</label>
    </div>
  );
}
