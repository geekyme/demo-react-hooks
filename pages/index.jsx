import EditableList from "components/EditableList";
import GlanceItems from "components/GlanceItems";
import FormBuilder from "components/FormBuilder";
import FormInput from "components/FormInput";
import FormCheckbox from "components/FormCheckbox";
import FormRadio from "components/FormRadio";
import FormSelect from "components/FormSelect";
import FormDateRange from "components/FormDateRange";
import FormSelectInputGroup from "../components/FormSelectInputGroup";
import Form from "components/Form";
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
    initialState = {};

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
        <h2>Form Builder</h2>
        <FormBuilder config={config} initialState={newInitialState} />
      </div>
      <div>
        <h2>Form</h2>
        <Form
          onChange={(...args) => {
            console.log("Form on change", args);
            return Promise.resolve();
          }}
          onSubmit={(data, errors) => {
            console.log("Form submit data", data);
            console.log("Form submit errors", errors);
          }}
        >
          <FormSelect
            name="country"
            options={[
              { value: "sg", label: "Singapore" },
              { value: "my", label: "Malaysia" },
              { value: "tw", label: "Taiwan" }
            ]}
            initialState={{ value: "tw", label: "Taiwan" }}
          />
          <FormSelectInputGroup
            name="fullName"
            options={[
              { value: "Mr", label: "Mr" },
              { value: "Mrs", label: "Mrs" },
              { value: "Ms", label: "Ms" },
              { value: "Mdm", label: "Mdm" }
            ]}
            selectValue={{ value: "Mr", label: "Mr" }}
            inputValue="bob"
          />
          <FormRadio
            name="gender"
            options={[
              { value: "m", label: "Male" },
              { value: "f", label: "Female" }
            ]}
            initialState="f"
          />
          <FormInput
            name="additional_comments"
            initialState="boo"
            validate="number"
          />
          <FormCheckbox name="agree_tos" initialState={true} />
          <FormCheckbox name="agree_privacy" initialState={false} />
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </Form>
      </div>
      <div>
        <h2>Standalone</h2>
        <FormDateRange />
        <FormInput
          onChange={e => console.log("standalone", e.target.value)}
          validate={customValidate}
        />
        <FormSelect
          initialState={{ value: "strawberry", label: "Strawberry" }}
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
