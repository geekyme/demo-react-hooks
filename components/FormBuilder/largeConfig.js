import Graph from "./Graph";
import FormInput from "components/FormInput";

const graph = new Graph();
const count = 10;
const relationships = 1;
const prefix = "input_";

for (let i = 0; i < count; i++) {
  graph.addNode(
    prefix + i,
    props => {
      console.log(props);
      return <FormInput {...props} />;
    },
    { props: {} }
  );
}

for (let i = 0; i < count; i++) {
  for (let j = 0; i < relationships; i++) {
    const rand1 = Math.floor(Math.random() * count);
    const rand2 = Math.floor(Math.random() * count);
    const node1 = prefix + rand1;
    const node2 = prefix + rand2;

    graph.link(node1).to(node2, value => {
      return {
        initialState: value
      };
    });
  }
}

export default graph;
