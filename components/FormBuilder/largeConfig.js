import Graph from "./Graph";
import FormInput from "components/FormInput";

const graph = new Graph();
const count = 1000;
const relationships = 10;
const prefix = "input_";

for (let i = 0; i < count; i++) {
  graph.addNode(
    prefix + i,
    (props, ref) => {
      return <FormInput ref={ref} {...props} />;
    },
    { props: {} }
  );
}

// TODO this needs a bit of work, apparently triggering massive perf issues
for (let i = 0; i < count; i++) {
  for (let j = 0; j < relationships; j++) {
    const rand1 = Math.floor(Math.random() * count);
    const rand2 = Math.floor(Math.random() * count);
    const name1 = prefix + rand1;
    const name2 = prefix + rand2;
    const node1 = graph.getNode(name1);
    const node2 = graph.getNode(name2);

    if (node1.out.size === 0 && node2.out.size === 0) {
      graph.link(name1).to(name2, (value, toNode) => {
        if (toNode !== null) {
          toNode.setValue(value);
        }

        return {};
      });
    }
  }
}

export default graph;
