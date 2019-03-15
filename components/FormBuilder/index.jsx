import { useState, useEffect } from "react";
import Form from "components/Form";
import FormEngine from "./FormEngine";

export default function FormBuilder(props) {
  const [components, setComponents] = useState();

  useEffect(() => {
    const [_, components] = FormEngine.render(
      props.config,
      props.initialState,
      props.initialState
    );

    setComponents(components);
  }, []);

  async function onChange(oldState, newState) {
    const [state, components] = FormEngine.render(
      props.config,
      oldState,
      newState
    );

    console.log(state);

    setComponents(components);

    return Promise.resolve(state);
  }

  function onSubmit(state) {
    console.log("form", state);
  }

  return (
    <Form onChange={onChange} onSubmit={onSubmit} data={props.initialState}>
      {components}
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </Form>
  );
}
