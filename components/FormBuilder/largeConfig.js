import Graph from "./Graph";
import FormInput from "components/FormInput";

function getConfig(initialState = {}) {
  const graph = new Graph();
  const count = 1000;
  const prefix = "input_";

  // Generates a config where 1st node is linked with other X nodes
  for (let i = 0; i < count; i++) {
    graph.addNode(
      prefix + i,
      (props, ref) => {
        const label =
          i === 0
            ? "Modify me and see what happens"
            : `Copy field no. ${i + 1}`;
        return (
          <FormInput
            label={label}
            ref={ref}
            initialState={initialState[props.name]}
            {...props}
          />
        );
      },
      { props: {} }
    );

    if (i !== 0) {
      graph.link(prefix + 0).to(prefix + i, (value, toNode) => {
        if (toNode !== null) {
          toNode.call("setValue", value);
        }
      });
    }
  }

  return graph;
}

export default getConfig;
