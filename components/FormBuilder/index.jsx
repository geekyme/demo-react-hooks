import { useState, useEffect } from "react";
import Form from "components/Form";

export default function FormBuilder(props) {
  async function onChange(oldState, newState, changes) {
    const state = props.config.runChanges({
      oldState,
      newState,
      changes
    });

    // console.log(state);

    return Promise.resolve(state);
  }

  function onSubmit(state) {
    console.log("form", state);
  }

  return (
    <Form onChange={onChange} onSubmit={onSubmit} data={props.initialState}>
      {props.config.ui()}
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </Form>
  );
}
