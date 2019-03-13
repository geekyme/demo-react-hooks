import EditableList from "components/EditableList";
import GlanceItems from "components/GlanceItems";
import Form from "components/Form";
import FormInput from "components/FormInput";

export default function AgendaPage() {
  const initialState = {
    one: "hello",
    two: "world"
  };

  function onChange(state) {
    console.log("form", state);
  }

  function standaloneOnChange(e) {
    console.log("standalone", e.target.value);
  }
  return (
    <div>
      <GlanceItems />
      <EditableList />
      <div>
        <h2>Form</h2>
        <Form onChange={onChange} data={initialState}>
          <FormInput name="one" />
          <FormInput name="two" />
          <button type="reset">Reset</button>
        </Form>
      </div>
      <div>
        <h2>Standalone</h2>
        <FormInput onChange={standaloneOnChange} />
      </div>
    </div>
  );
}
