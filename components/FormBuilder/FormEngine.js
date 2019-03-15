import FormInput from "components/FormInput";
import FormCheckbox from "components/FormCheckbox";
import FormRadio from "components/FormRadio";

export default {
  // TODO: this render func could return newState + components to render
  render(config, oldState, newState) {
    const changedNodes = Object.keys(newState);
    const state = config.runChanges({
      oldState,
      newState,
      changedNodes
    });

    const components = (
      <div>
        <FormInput name="one" validate="number" />
        <FormInput name="two" validate="number" />
        <FormCheckbox name="check_1" />
        <FormCheckbox name="check_2" />
        <FormCheckbox name="check_3" />
        <FormRadio id="radio_female" name="radio_1" value="female" />
        <FormRadio id="radio_male" name="radio_1" value="male" />
      </div>
    );

    return [state, components];
  }
};
