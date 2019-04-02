import { useFormState } from "../Form/FormUtils";
import { useState } from "react";
import { useEffectOnMount } from "components/utils";
import Select from "react-select";
import FormUI from "components/FormUI";
import styles from "./FormSelect.scss";
import classNames from "classnames";

export default function FormSelect(props) {
  const {
    initialState,
    name,
    label,
    store,
    onChange,
    className,
    ...other
  } = props;
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

  return (
    <FormUI name={name} label={label} data-testid={props["data-testid"]}>
      <Select
        className={classNames(styles.select, className)}
        classNamePrefix="selectPrefix"
        value={state}
        onChange={onSelectChange}
        options={props.options}
        {...other}
      />
    </FormUI>
  );
}
