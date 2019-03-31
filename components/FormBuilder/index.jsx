import Form from "components/Form";
import { useGraph } from "components/FormBuilder/GraphUtils";

export default function FormBuilder(props) {
  const { ui, runChanges } = useGraph(props.config);

  function onSubmit(state, errors) {
    console.log("form", state);
    console.log("errors", errors);
  }

  return (
    <Form
      onChange={(newState, changes) => {
        runChanges(changes);
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
