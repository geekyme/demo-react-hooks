import EditableList from "components/EditableList";
import GlanceItems from "components/GlanceItems";
import Form from "components/Form";
import FormInput from "components/FormInput";
import FormCheckbox from "components/FormCheckbox";

export default function AgendaPage() {
  const initialState = {
    one: "hello",
    two: "world"
  };

  function onChange(state, setState) {
    console.log("form", state);

    if (state["check_3"]) {
      const newState = { ...state };
      delete newState["check_1"];
      delete newState["check_2"];
      setState(newState);
    }
  }

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
        <Form onChange={onChange} data={initialState}>
          <FormInput name="one" validate="number" />
          <FormInput name="two" validate="number" />
          <FormCheckbox name="check_1" />
          <FormCheckbox name="check_2" />
          <FormCheckbox name="check_3" />
          <button type="reset">Reset</button>
        </Form>
      </div>
      <div>
        <h2>Standalone</h2>
        <FormInput onChange={standaloneOnChange} validate={customValidate} />
      </div>
    </div>
  );
}
