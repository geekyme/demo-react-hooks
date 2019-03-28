import { useHandler } from "../Form/FormUtils";

export default function FormCheckbox(props) {
  const { setValue, value } = useHandler({
    name: props.name,
    initialState: props.value
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
