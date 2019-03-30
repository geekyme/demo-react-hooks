import FormInput from "components/FormInput";
import FormCheckbox from "components/FormCheckbox";
import FormRadio from "components/FormRadio";
import FormSelect from "components/FormSelect";
import FormSelectInputGroup from "components/FormSelectInputGroup";
import FormDateRange from "components/FormDateRange";

import Graph from "components/FormBuilder/Graph";

function generateNodes(count) {
  const nodes = [];

  while (nodes.length !== count) {
    const name = "one_" + nodes.length;
    nodes.push({
      name,
      component: FormInput,
      getProps(oldState, newState) {
        return { name, validate: "number" };
      }
    });
  }

  return nodes;
}

function generateRelationship(graph, count) {
  let _count = 0;

  // N nodes, 10 out-relationships per node
  while (_count !== count) {
    for (let i = 0; i < 10; i++) {
      const rand1 = Math.floor(Math.random() * count);
      const rand2 = Math.floor(Math.random() * count);
      const node1 = "one_" + rand1;
      const node2 = "one_" + rand2;

      graph.getNode(node1).to(graph.getNode(node2), (oldState, newState) => {
        newState[node2] = newState[node1];

        return newState;
      });
    }

    _count++;
  }
}

export function getLargeConfig() {
  const count = 1000;
  const graph = new Graph(generateNodes(count));

  generateRelationship(graph, count);

  return graph;
}
export default function getFormConfig() {
  const graph = new Graph([
    {
      name: "travel",
      component: FormDateRange,
      getProps(oldState, newState) {
        return { name: "travel" };
      }
    },
    {
      name: "select",
      component: FormSelect,
      getProps(oldState, newState) {
        const options = [
          { value: "chocolate", label: "Chocolate" },
          { value: "strawberry", label: "Strawberry" },
          { value: "vanilla", label: "Vanilla" }
        ];
        return { name: "select", options, value: options[0] };
      }
    },
    {
      name: "fullName",
      component: FormSelectInputGroup,
      getProps(oldState, newState) {
        const options = [
          { value: "Mr", label: "Mr" },
          { value: "Mrs", label: "Mrs" },
          { value: "Ms", label: "Ms" },
          { value: "Mdm", label: "Mdm" },
          { value: "Dr", label: "Dr" }
        ];

        function validate(value) {
          if (isNaN(value)) {
            return null;
          } else {
            return "Is that a proper name?";
          }
        }

        return {
          name: "fullName",
          options,
          selectValue: options[4],
          inputValue: "1",
          validate
        };
      }
    },
    {
      name: "one",
      component: FormInput,
      getProps(oldState, newState) {
        return { name: "one", validate: "number" };
      }
    },
    {
      name: "two",
      component: FormInput,
      getProps(oldState, newState) {
        return { name: "two", validate: "number" };
      }
    },
    {
      name: "check_1",
      component: FormCheckbox,
      getProps(oldState, newState) {
        return { name: "check_1" };
      }
    },
    {
      name: "check_2",
      component: FormCheckbox,
      getProps(oldState, newState) {
        return { name: "check_2" };
      }
    },
    {
      name: "check_3",
      component: FormCheckbox,
      getProps(oldState, newState) {
        return { name: "check_3" };
      }
    },
    {
      name: "radio_1",
      id: "radio_sg",
      component: FormRadio,
      getProps(oldState, newState) {
        return {
          name: "radio_1",
          value: "Singaporean / PR",
          id: "radio_sg"
        };
      }
    },
    {
      name: "radio_1",
      id: "radio_fr",
      component: FormRadio,
      getProps(oldState, newState) {
        return { name: "radio_1", value: "Foreigner", id: "radio_fr" };
      }
    },
    {
      name: "identity_input",
      component: FormInput,
      getProps(oldState, newState) {
        return {
          name: "identity_input",
          validate(str) {
            if (newState["radio_1"] === "Foreigner") {
              if (str && str[0] === "F") {
                return null;
              } else {
                return "Please enter FIN";
              }
            } else {
              if (str && str[0] === "S") {
                return null;
              } else {
                return "Please enter NRIC";
              }
            }
          }
        };
      }
    },
    {
      name: "sg_extra",
      component: FormInput,
      getProps() {
        return { name: "sg_extra" };
      }
    },
    {
      name: "foreigner_extra",
      component: FormInput,
      getProps() {
        return { name: "foreigner_extra" };
      }
    }
  ]);

  graph
    .getNode("check_1")
    .to(graph.getNode("check_3"), (oldState, newState) => {
      if (oldState["check_3"] && newState["check_1"]) {
        newState["check_3"] = false;
      }

      return newState;
    });
  graph
    .getNode("check_2")
    .to(graph.getNode("check_3"), (oldState, newState) => {
      if (oldState["check_3"] && newState["check_2"]) {
        newState["check_3"] = false;
      }

      return newState;
    });
  graph
    .getNode("check_3")
    .to(graph.getNode("check_1"), (oldState, newState) => {
      if (!oldState["check_3"] && newState["check_3"]) {
        newState["check_1"] = false;
      }

      return newState;
    });
  graph
    .getNode("check_3")
    .to(graph.getNode("check_2"), (oldState, newState) => {
      if (!oldState["check_3"] && newState["check_3"]) {
        newState["check_2"] = false;
      }

      return newState;
    });

  graph
    .getNode("radio_1", 0)
    .to(graph.getNode("sg_extra"), (oldState, newState) => {
      if (
        typeof newState["sg_extra"] === "undefined" &&
        newState["radio_1"] === "Singaporean / PR"
      ) {
        delete newState["foreigner_extra"];
        newState["sg_extra"] = "";
      }

      return newState;
    });

  graph
    .getNode("radio_1", 1)
    .to(graph.getNode("foreigner_extra"), (oldState, newState) => {
      if (
        typeof newState["foreigner_extra"] === "undefined" &&
        newState["radio_1"] === "Foreigner"
      ) {
        delete newState["sg_extra"];
        newState["foreigner_extra"] = "";
      }

      return newState;
    });

  graph
    .getNode("radio_1", 0)
    .to(graph.getNode("identity_input"), (oldState, newState) => {
      return newState;
    });

  graph
    .getNode("radio_1", 1)
    .to(graph.getNode("identity_input"), (oldState, newState) => {
      return newState;
    });

  return graph;
}
