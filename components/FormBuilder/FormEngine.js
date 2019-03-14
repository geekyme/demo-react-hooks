export default {
  // TODO: this render func could return newState + components to render
  render(config, oldState, newState) {
    // if check_3 is checked, uncheck everything else
    // otherwise uncheck_3 if any other checkbox is checked
    if (!oldState["check_3"] && newState["check_3"]) {
      delete newState["check_1"];
      delete newState["check_2"];
    } else if (
      oldState["check_3"] &&
      (newState["check_1"] || newState["check_2"])
    ) {
      delete newState["check_3"];
    }

    return newState;
  }
};
