import { useHandler } from "../Form/FormUtils";

export default function FormCheckbox(props) {
  const { name, initialState, store } = props;
  const { setValue, value } = useHandler({
    name,
    initialState,
    store
  });

  function onChange(e) {
    setValue(e.target.checked);
  }

  function _setValue(e) {
    e.preventDefault();
    setValue(!value);
  }

  return (
    <div style={{ margin: "10px 20px" }}>
      <input {...props} onChange={onChange} type="checkbox" checked={value} />
      <button onClick={_setValue}>Change value</button>
    </div>
  );
}
