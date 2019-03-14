import Form from "components/Form";
import FormInput from "components/FormInput";
import FormCheckbox from "components/FormCheckbox";
import FormRadio from "components/FormRadio";
import FormEngine from "./FormEngine";

export default function FormBuilder(props) {
  async function onChange(oldState, newState) {
    const state = FormEngine.render({}, oldState, newState);

    console.log(state);

    return Promise.resolve(state);
  }

  function onSubmit(state) {
    console.log("form", state);
  }

  return (
    <Form onChange={onChange} onSubmit={onSubmit} data={props.initialState}>
      <FormInput name="one" validate="number" />
      <FormInput name="two" validate="number" />
      <FormCheckbox name="check_1" />
      <FormCheckbox name="check_2" />
      <FormCheckbox name="check_3" />
      <FormRadio id="radio_female" name="radio_1" value="female" />
      <FormRadio id="radio_male" name="radio_1" value="male" />
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </Form>
  );
}
