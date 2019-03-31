import Graph from "./Graph";
import FormDateRange from "components/FormDateRange";
import FormSelect from "components/FormSelect";
import FormInput from "components/FormInput";
import FormRadio from "components/FormRadio";

const graph = new Graph();

graph
  .addNode("travel_dates", injectedProps => {
    return <FormDateRange {...injectedProps} />;
  })
  .addNode("country", injectedProps => {
    const options = [
      {
        value: "my",
        label: "Malaysia"
      },
      {
        value: "sg",
        label: "Singapore"
      }
    ];
    return (
      <FormSelect
        initialState={options[1]}
        options={options}
        {...injectedProps}
      />
    );
  })
  .addNode(
    "id",
    injectedProps => {
      const options = [
        { value: "fin", label: "Foreign Identity Number" },
        { value: "nric", label: "Singapore IC" }
      ];

      return <FormRadio options={options} {...injectedProps} />;
    },
    { props: { initialState: "nric" } }
  )
  .addNode("id_no", injectedProps => {
    return <FormInput {...injectedProps} />;
  })
  .addNode("id_no_copy", (injectedProps, ref) => {
    function validate(value) {
      if (value === "") {
        return "This is required!";
      }

      return null;
    }
    return <FormInput ref={ref} {...injectedProps} validate={validate} />;
  })
  .addNode(
    "visa_no",
    injectedProps => {
      return <FormInput {...injectedProps} />;
    },
    { visible: false }
  )
  .addNode("gender", injectedProps => {
    const options = [
      {
        value: "m",
        label: "Male"
      },
      {
        value: "f",
        label: "Female"
      }
    ];
    return <FormRadio initialState="f" options={options} {...injectedProps} />;
  })
  .link("country")
  .to("visa_no", (country, toNode) => {
    if (country === "my") {
      toNode.setVisible(true);
    } else {
      toNode.setVisible(false);
    }
  })
  .link("id")
  .to("id_no", (id, toNode) => {
    if (id === "nric") {
      toNode.setProps(prevProps => ({
        ...prevProps,
        validate(value) {
          if (value[0] !== "S") {
            return "Enter a proper NRIC no!";
          } else {
            return null;
          }
        }
      }));
    } else if (id === "fin") {
      toNode.setProps(prevProps => ({
        ...prevProps,
        validate(value) {
          if (value[0] !== "F") {
            return "Enter a proper FIN no!";
          } else {
            return null;
          }
        }
      }));
    }
  })
  .link("id_no")
  .to("id_no_copy", (value, toNode) => {
    toNode.call("setValue", value);
  });

export default graph;
