import EditableList from "components/EditableList";
import GlanceItems from "components/GlanceItems";
import FormBuilder from "components/FormBuilder";
import FormInput from "components/FormInput";
import FormSelect from "components/FormSelect";
import FormDateRange from "components/FormDateRange";
import getFormConfig, { getLargeConfig } from "./getFormConfig";
import getConfig from "next/config";

export default function AgendaPage() {
  const { publicRuntimeConfig } = getConfig();
  let config, initialState;

  if (publicRuntimeConfig.highload) {
    initialState = {};
    config = getLargeConfig();

    Object.keys(config.nodes).forEach(k => {
      initialState[k] = "";
    });
  } else {
    initialState = {
      travel: {},
      fullName: {
        title: "Dr",
        name: "1"
      },
      select: { value: "chocolate", label: "Chocolate" },
      one: "hello",
      two: "world",
      check_1: false,
      check_2: false,
      check_3: true,
      radio_1: "Singaporean / PR",
      identity_input: ""
    };

    config = getFormConfig();
  }

  const newInitialState = config.runChanges({
    oldState: {},
    newState: initialState,
    changes: initialState
  });

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
        <FormDateRange />
        <FormInput
          onChange={e => console.log("standalone", e.target.value)}
          validate={customValidate}
        />
        <FormSelect
          value={{ value: "strawberry", label: "Strawberry" }}
          onChange={(...args) => console.log("standalone select", args)}
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" }
          ]}
        />
      </div>
    </div>
  );
}
