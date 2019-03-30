import { useState, useEffect } from "react";
import Form from "components/Form";

export default function FormBuilder(props) {
  const [changeCount, setChangeCount] = useState(0);

  // TODO rethink this API
  // async function onChange(oldState, newState, changes) {
  //   const state = props.config.runChanges({
  //     oldState,
  //     newState,
  //     changes
  //   });

  //   setChangeCount(changeCount + 1);

  //   return Promise.resolve(state);
  // }

  function onSubmit(state, errors) {
    console.log("form", state);
    console.log("errors", errors);
  }

  return (
    <Form
      onChange={(newState, changes) => {
        console.log(newState, changes);
      }}
      onSubmit={onSubmit}
      data={props.initialState}
    >
      {props.config.ui()}
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </Form>
  );
}
