import { DumbFormInput } from "components/FormInput";
import { DumbFormSelect } from "components/FormSelect";
import { useHandler, useValidator } from "../Form/FormUtils";
import { useState, useEffect, useRef } from "react";

export default function FormSelectInputGroup(props) {
  const isInitialMount = useRef(true);
  const [inputState, setInputState] = useState(props.inputValue);
  const [selectState, setSelectState] = useState(props.selectValue);
  const { setValue, value, pristine } = useHandler({
    name: props.name,
    initialState: buildState(selectState, inputState)
  });

  const error = useValidator({
    name: props.name,
    validate: props.validate,
    value
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setValue(buildState(selectState, inputState));
    }
  }, [inputState, selectState]);

  function onSelectChange(selected) {
    setSelectState(selected);
  }

  function onInputChange(e) {
    setInputState(e.target.value);
  }

  function setInputValue(e) {
    e.preventDefault();
    setInputState("123");
  }

  function buildState(selected, input) {
    return {
      selected,
      input
    };
  }

  return (
    <div style={{ border: "1px solid blue", marginBottom: "10px" }}>
      <p>Select + Input group</p>
      <DumbFormSelect
        onChange={onSelectChange}
        options={props.options}
        value={value.selected}
      />
      <DumbFormInput
        onChange={onInputChange}
        value={value.input}
        error={error}
        setValue={setInputValue}
        pristine={pristine}
      />
    </div>
  );
}
