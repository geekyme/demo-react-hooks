import { useFormState } from "../Form/FormUtils";
import FormUI from "components/FormUI";

export default function FormRadio(props) {
  const {
    name,
    label,
    onChange,
    initialState,
    store,
    options,
    ...other
  } = props;

  if (typeof options === "undefined" || options.length < 2) {
    throw new Error("Radio needs to have at least 2 options prop set!");
  }
  const { setValue, value } = useFormState({
    name,
    onChange,
    initialState,
    store
  });

  function _onChange(e) {
    setValue(e.target.value);
  }

  return (
    <FormUI name={name} label={label}>
      {options.map((option, index) => {
        const id = `${props.name}_${index}`;

        return (
          <div className="radio" key={id}>
            <input
              data-testid={"FormRadio"}
              id={id}
              type="radio"
              onChange={_onChange}
              checked={value === option.value}
              value={option.value}
              {...other}
            />
            <label htmlFor={id}>{option.label}</label>
          </div>
        );
      })}
    </FormUI>
  );
}
