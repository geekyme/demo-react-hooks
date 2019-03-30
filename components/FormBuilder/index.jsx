import { useState, useEffect } from "react";
import Form from "components/Form";

export default function FormBuilder(props) {
  const formConfig = props.config;
  const [ui, rerender] = useState(formConfig.ui());

  useEffect(() => {
    formConfig.init();
    rerender(formConfig.ui());
  }, []);

  function onSubmit(state, errors) {
    console.log("form", state);
    console.log("errors", errors);
  }

  return (
    <Form
      onChange={(newState, changes) => {
        formConfig.runChanges(changes);
        rerender(formConfig.ui());
      }}
      onSubmit={onSubmit}
      data={props.initialState}
    >
      {ui}
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </Form>
  );
}
