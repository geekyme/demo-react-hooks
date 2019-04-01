import EditableList from "components/EditableList";
import GlanceItems from "components/GlanceItems";
import FormBuilder from "components/FormBuilder";
import FormInput from "components/FormInput";
import formConfig from "components/FormBuilder/formConfig";
import largeConfig from "components/FormBuilder/largeConfig";
import FormCheckbox from "components/FormCheckbox";
import FormRadio from "components/FormRadio";
import FormSelect from "components/FormSelect";
import FormDateRange from "components/FormDateRange";
import FormSelectInputGroup from "../components/FormSelectInputGroup";
import Form from "components/Form";
import Layout from "components/Layout";

export default function AgendaPage() {
  function customValidate(value) {
    if (value !== "boo") {
      return "Value is not boo";
    } else {
      return null;
    }
  }
  return (
    <Layout>
      <div>
        <h2>Simple Editable list</h2>
        <GlanceItems />
        <EditableList />
      </div>
      <div>
        <h2>Standalone</h2>
        <FormDateRange />
        <FormInput
          onChange={value => console.log("standalone", value)}
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

      <div>
        <h2>Form</h2>
        <Form
          onChange={newState => {
            console.log("Form on change", newState);
          }}
          onSubmit={(data, errors) => {
            console.log("Form submit data", data);
            console.log("Form submit errors", errors);
          }}
        >
          <FormDateRange name="travel_date" />
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
            name="full_name"
            options={[
              { value: "Mr", label: "Mr" },
              { value: "Mrs", label: "Mrs" },
              { value: "Ms", label: "Ms" },
              { value: "Mdm", label: "Mdm" }
            ]}
            initialState={{
              select: { value: "Mrs", label: "Mrs" },
              input: "bob"
            }}
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
          <FormCheckbox name="agree_privacy" />
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </Form>
      </div>
      <div>
        <h2>Form Builder</h2>
        <FormBuilder config={formConfig} />
      </div>
      {/* <div>
        <h2>Form Builder (Large)</h2>
        <FormBuilder config={largeConfig} />
      </div> */}
    </Layout>
  );
}
