import FormInput from "components/FormInput";
import FormSelect from "components/FormSelect";
import { useEffectOnMount } from "components/utils";
import { useHandler, useStore } from "../Form/FormUtils";

export default function FormSelectInputGroup(props) {
  const store = useStore(buildState(props.selectValue, props.inputValue));
  const { setValue } = useHandler({
    name: props.name
  });

  useEffectOnMount(() => {
    setValue({
      title: store.data.selected.value,
      name: store.data.input
    });
  }, [store.data]);

  function buildState(selected, input) {
    return {
      selected,
      input
    };
  }

  return (
    <div style={{ border: "1px solid blue", marginBottom: "10px" }}>
      <p>Select + Input group</p>
      <FormSelect name="selected" store={store} options={props.options} />
      <FormInput name="input" store={store} validate={props.validate} />
    </div>
  );
}
