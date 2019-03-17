import EditableList from "components/EditableList";
import GlanceItems from "components/GlanceItems";
import FormBuilder from "components/FormBuilder";
import FormInput from "components/FormInput";
import getFormConfig, { getLargeConfig } from "./getFormConfig";

export default function AgendaPage() {
  const config = getLargeConfig();
  const initialState = {};

  Object.keys(config.nodes).forEach(k => {
    initialState[k] = "";
  });

  // const initialState = {
  //   one: "hello",
  //   two: "world",
  //   check_1: false,
  //   check_2: false,
  //   check_3: true,
  //   radio_1: "Singaporean / PR",
  //   identity_input: ""
  // };

  // const config = getFormConfig();

  const newInitialState = config.runChanges({
    oldState: {},
    newState: initialState,
    changes: initialState
  });

  function standaloneOnChange(e) {
    console.log("standalone", e.target.value);
  }

  function customValidate(value) {
    if (value !== "boo") {
      return "Value is not boo";
    } else {
      return null;
    }
  }
  return (
    <div>
      <GlanceItems />
      <EditableList />
      <div>
        <h2>Form</h2>
        <FormBuilder config={config} initialState={newInitialState} />
      </div>
      <div>
        <h2>Standalone</h2>
        <FormInput onChange={standaloneOnChange} validate={customValidate} />
      </div>
    </div>
  );
}
