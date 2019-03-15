import EditableList from "components/EditableList";
import GlanceItems from "components/GlanceItems";
import FormBuilder from "components/FormBuilder";
import FormInput from "components/FormInput";
import Graph from "components/FormBuilder/Graph";

export default function AgendaPage() {
  const initialState = {
    one: "hello",
    two: "world",
    radio_1: "male"
  };

  const graph = new Graph([
    { name: "one" },
    { name: "two" },
    { name: "check_1" },
    { name: "check_2" },
    { name: "check_3" },
    { name: "radio_1" }
  ]);

  graph.nodes["check_1"].to(graph.nodes["check_3"], (oldState, newState) => {
    if (oldState["check_3"] && newState["check_1"]) {
      delete newState["check_3"];
    }

    return newState;
  });
  graph.nodes["check_2"].to(graph.nodes["check_3"], (oldState, newState) => {
    if (oldState["check_3"] && newState["check_2"]) {
      delete newState["check_3"];
    }

    return newState;
  });
  graph.nodes["check_3"].to(graph.nodes["check_1"], (oldState, newState) => {
    if (!oldState["check_3"] && newState["check_3"]) {
      delete newState["check_1"];
    }

    return newState;
  });
  graph.nodes["check_3"].to(graph.nodes["check_2"], (oldState, newState) => {
    if (!oldState["check_3"] && newState["check_3"]) {
      delete newState["check_2"];
    }

    return newState;
  });

  function standaloneOnChange(e) {
    console.log("standalone", e.target.value);
  }

  function customValidate(value) {
    if (value !== "boo") {
      return "Value is not boo";
    } else {
      return null;
    }
  }
  return (
    <div>
      <GlanceItems />
      <EditableList />
      <div>
        <h2>Form</h2>
        <FormBuilder config={graph} initialState={initialState} />
      </div>
      <div>
        <h2>Standalone</h2>
        <FormInput onChange={standaloneOnChange} validate={customValidate} />
      </div>
    </div>
  );
}
