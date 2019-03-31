import Graph from "./Graph";
import FormInput from "components/FormInput";

const graph = new Graph();
const count = 1000;
const prefix = "input_";

// Generates a config where 1st node is linked with other X nodes
for (let i = 0; i < count; i++) {
  graph.addNode(
    prefix + i,
    (props, ref) => {
      return <FormInput ref={ref} {...props} />;
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

export default graph;
