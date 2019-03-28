import { useHandler } from "../Form/FormUtils";

export default function FormCheckbox(props) {
  const { onChange, setValue, value } = useHandler({
    name: props.name,
    onChange: props.onChange,
    initialState: props.value,
    getElementValue(e) {
      return e.target.checked;
    }
  });

  function _setValue(e) {
    e.preventDefault();
    setValue({
      target: {
        checked: !value
      }
    });
  }

  return (
    <div style={{ margin: "10px 20px" }}>
      <input {...props} onChange={onChange} type="checkbox" checked={value} />
      <button onClick={_setValue}>Change value</button>
    </div>
  );
}
