import { useState, useEffect } from "react";
import Form from "components/Form";

export default function FormBuilder(props) {
  const [components, setComponents] = useState();

  useEffect(() => {
    const [_, components] = props.config.runChanges({
      oldState: props.initialState,
      newState: props.initialState,
      changes: {}
    });

    setComponents(components);
  }, []);

  async function onChange(oldState, newState, changes) {
    const [state, components] = props.config.runChanges({
      oldState,
      newState,
      changes
    });

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
