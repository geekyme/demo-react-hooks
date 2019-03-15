import EditableList from "components/EditableList";
import GlanceItems from "components/GlanceItems";
import FormBuilder from "components/FormBuilder";
import FormInput from "components/FormInput";
import FormCheckbox from "components/FormCheckbox";
import FormRadio from "components/FormRadio";

import Graph from "components/FormBuilder/Graph";

export default function AgendaPage() {
  const initialState = {
    one: "hello",
    two: "world",
    check_1: false,
    check_2: false,
    check_3: true,
    radio_1: "Singaporean / PR"
  };

  const graph = new Graph([
    {
      name: "one",
      component: FormInput,
      props: { name: "one", validate: "number" }
    },
    {
      name: "two",
      component: FormInput,
      props: { name: "two", validate: "number" }
    },
    { name: "check_1", component: FormCheckbox, props: { name: "check_1" } },
    { name: "check_2", component: FormCheckbox, props: { name: "check_2" } },
    { name: "check_3", component: FormCheckbox, props: { name: "check_3" } },
    {
      name: "radio_1",
      component: FormRadio,
      props: { name: "radio_1", value: "Singaporean / PR", id: "radio_female" }
    },
    {
      name: "radio_1",
      component: FormRadio,
      props: { name: "radio_1", value: "Foreigner", id: "radio_male" }
    },
    {
      name: "sg_input",
      component: FormInput,
      props: {
        name: "sg_input",
        validate: str => {
          if (str && str[0] === "S") {
            return null;
          } else {
            return "Please enter NRIC";
          }
        }
      }
    },
    {
      name: "foreigner_input",
      component: FormInput,
      props: {
        name: "foreigner_input",
        validate: str => {
          if (str && str[0] === "F") {
            return null;
          } else {
            return "Please enter FIN";
          }
        }
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
    .to(graph.getNode("sg_input"), (oldState, newState) => {
      if (
        typeof oldState["sg_input"] === "undefined" &&
        newState["radio_1"] === "Singaporean / PR"
      ) {
        newState["sg_input"] = "";
        delete newState["foreigner_input"];
      }

      return newState;
    });

  graph
    .getNode("radio_1", 1)
    .to(graph.getNode("foreigner_input"), (oldState, newState) => {
      if (
        typeof oldState["foreigner_input"] === "undefined" &&
        newState["radio_1"] === "Foreigner"
      ) {
        newState["foreigner_input"] = "";
        delete newState["sg_input"];
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
