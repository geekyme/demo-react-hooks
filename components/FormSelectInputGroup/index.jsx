import FormInput from "components/FormInput";
import FormSelect from "components/FormSelect";
import FormUI from "components/FormUI";
import { useEffect } from "react";
import { useFormState, useStore } from "../Form/FormUtils";
import styles from "./FormSelectInputGroup.scss";

export default function FormSelectInputGroup(props) {
  const { initialState = {}, name, label, options, validate, ...other } = props;
  const allowedKeys = {
    select: "select",
    input: "input"
  };

  Object.keys(initialState).forEach(key => {
    if (!allowedKeys[key]) {
      throw new Error(
        `Key: ${key} is not allwoed. Allowed keys: ${JSON.stringify(
          allowedKeys
        )}`
      );
    }
  });

  const store = useStore(initialState);
  const { setValue } = useFormState({
    name
  });

  useEffect(() => {
    setValue({
      title: store.data.select,
      name: store.data.input
    });
  }, [store.data]);

  return (
    <FormUI label={label}>
      <div className={styles.container}>
        <FormSelect
          className={styles.select}
          name={allowedKeys.select}
          store={store}
          options={options}
          initialState={store.data.select}
        />
        <FormInput
          className={styles.input}
          name={allowedKeys.input}
          store={store}
          validate={validate}
          initialState={store.data.input}
        />
      </div>
    </FormUI>
  );
}
