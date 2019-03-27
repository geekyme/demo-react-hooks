import { useState, useEffect } from "react";
import Form from "components/Form";

export default function FormBuilder(props) {
  const [changeCount, setChangeCount] = useState(0);

  async function onChange(oldState, newState, changes) {
    const state = props.config.runChanges({
      oldState,
      newState,
      changes
    });

    setChangeCount(changeCount + 1);

    return Promise.resolve(state);
  }

  function onSubmit(state, errors) {
    console.log("form", state);
    console.log("errors", errors);
  }

  return (
    <Form onChange={onChange} onSubmit={onSubmit} data={props.initialState}>
      {props.config.ui()}
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </Form>
  );
}
