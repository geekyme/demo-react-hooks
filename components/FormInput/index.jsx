import { useChangeHandler, useValidator } from "../Form/FormUtils";

export default function FormInput(props) {
  const { onChange, value } = useChangeHandler(props);
  const error = useValidator(props.validate, value);

  const { validate, ...other } = props;

  return (
    <div>
      <p>{error || <label>{error}</label>}</p>
      <input {...other} onChange={onChange} value={value} />
    </div>
  );
}
