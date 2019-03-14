import { useHandler, useValidator } from "../Form/FormUtils";

export default function FormInput(props) {
  const { onChange, onSetValue, value } = useHandler(props);
  const error = useValidator(props.validate, value);

  const { validate, ...other } = props;

  function _onSetValue(e) {
    e.preventDefault();
    const value = "boo";
    onSetValue(value);
  }

  return (
    <div>
      <p>{error || <label>{error}</label>}</p>
      <input {...other} onChange={onChange} value={value} />
      <button onClick={_onSetValue}>Change value</button>
    </div>
  );
}
