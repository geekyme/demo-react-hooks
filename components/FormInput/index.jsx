import { useHandler, useValidator } from "../Form/FormUtils";

export default function FormInput(props) {
  const { onChange, onSetValue, value } = useHandler(props, {
    initialState: ""
  });
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
      <label>{props.name}</label>
      <input {...other} onChange={onChange} {...value} />
      <button onClick={_onSetValue}>Change value</button>
    </div>
  );
}
