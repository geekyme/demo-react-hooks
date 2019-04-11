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
    options,
    ...other
  } = props;
  const [state, setState] = useState(initialState);
  const { setValue } = useFormState({
    name,
    initialState: initialState,
    store
  });

  useEffectOnMount(() => {
    setValue(state);
    if (typeof onChange === "function") {
      onChange(state);
    }
  }, [state]);

  function onSelectChange(selected) {
    setState(selected.value);
  }

  return (
    <FormUI name={name} label={label} data-testid={props["data-testid"]}>
      <Select
        className={classNames(styles.select, className)}
        classNamePrefix="selectPrefix"
        value={options.filter(({ value }) => value === state)}
        onChange={onSelectChange}
        options={options}
        {...other}
      />
    </FormUI>
  );
}
