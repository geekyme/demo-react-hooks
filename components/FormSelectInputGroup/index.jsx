import FormInput from "components/FormInput";
import FormSelect from "components/FormSelect";
import { useEffectOnMount } from "components/utils";
import { useFormState, useStore } from "../Form/FormUtils";

export default function FormSelectInputGroup(props) {
  const { initialState = {}, name, options, validate, ...other } = props;
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

  useEffectOnMount(() => {
    setValue({
      title: store.data.select,
      name: store.data.input
    });
  }, [store.data]);

  return (
    <div style={{ border: "1px solid blue", marginBottom: "10px" }} {...other}>
      <p>Select + Input group</p>
      <FormSelect
        name={allowedKeys.select}
        store={store}
        options={options}
        initialState={store.data.select}
      />
      <FormInput
        name={allowedKeys.input}
        store={store}
        validate={validate}
        initialState={store.data.input}
      />
    </div>
  );
}
