import { useFormState } from "../Form/FormUtils";
import { useState } from "react";
import { useEffectOnMount } from "components/utils";
import Select from "react-select";
import FormUI from "components/FormUI";
import styles from "./FormSelect.scss";

export default function FormSelect(props) {
  const { initialState, name, label, store, onChange, ...other } = props;
  const [state, setState] = useState(initialState);
  const { setValue } = useFormState({
    name,
    initialState: initialState.value,
    store
  });

  useEffectOnMount(() => {
    setValue(state.value);
    if (typeof onChange === "function") {
      onChange(state.value);
    }
  }, [state]);

  function onSelectChange(selected) {
    setState(selected);
  }

  console.log(styles.select);

  return (
    <FormUI name={name} label={label}>
      <Select
        className={styles.select}
        classNamePrefix="selectPrefix"
        value={state}
        onChange={onSelectChange}
        options={props.options}
        {...other}
      />
    </FormUI>
  );
}
