export default {
  // TODO: this render func could return newState + components to render
  render(config, oldState, newState) {
    const changedNodes = Object.keys(newState);

    const [state, components] = config.runChanges({
      oldState,
      newState,
      changedNodes
    });

    return [state, components];
  }
};
