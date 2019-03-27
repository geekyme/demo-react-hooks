import { useHandler } from "../Form/FormUtils";

export default function FormCheckbox(props) {
  const initialState = false;
  const { onChange, onSetValue, value } = useHandler(props, {
    initialState,
    getElementValue(e) {
      return e.target.checked;
    }
  });

  function _onSetValue(e) {
    e.preventDefault();
    onSetValue({
      target: {
        checked: !value
      }
    });
  }

  return (
    <div style={{ margin: "10px 20px" }}>
      <input {...props} onChange={onChange} type="checkbox" checked={value} />
      <button onClick={_onSetValue}>Change value</button>
    </div>
  );
}
