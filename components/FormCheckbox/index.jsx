import { useHandler } from "../Form/FormUtils";

export default function FormCheckbox(props) {
  const initialState = false;
  const { onChange, onSetValue, value } = useHandler(props, {
    initialState,
    type: "checkbox"
  });

  function _onSetValue(e) {
    e.preventDefault();
    onSetValue(!value.checked);
  }

  return (
    <div style={{ margin: "10px 20px" }}>
      <input {...props} onChange={onChange} type="checkbox" {...value} />
      <button onClick={_onSetValue}>Change value</button>
    </div>
  );
}
