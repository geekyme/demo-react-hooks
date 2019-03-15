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
    radio_1: "Singaporean / PR",
    identity_input: ""
  };

  const graph = new Graph([
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
      component: FormRadio,
      getProps(oldState, newState) {
        return {
          name: "radio_1",
          value: "Singaporean / PR",
          id: "radio_female"
        };
      }
    },
    {
      name: "radio_1",
      component: FormRadio,
      getProps(oldState, newState) {
        return { name: "radio_1", value: "Foreigner", id: "radio_male" };
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
