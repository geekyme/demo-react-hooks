import Graph from "./Graph";
import FormDateRange from "components/FormDateRange";
import FormSelect from "components/FormSelect";
import FormInput from "components/FormInput";
import FormRadio from "components/FormRadio";

const graph = new Graph();

graph
  .addNode(
    "travel_dates",
    props => {
      return <FormDateRange {...props} />;
    },
    { props: {} }
  )
  .addNode(
    "country",
    props => {
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
        <FormSelect initialState={options[1]} options={options} {...props} />
      );
    },
    { props: {} }
  )
  .addNode(
    "id",
    props => {
      const options = [
        { value: "fin", label: "Foreign Identity Number" },
        { value: "nric", label: "Singapore IC" }
      ];

      return <FormRadio options={options} {...props} />;
    },
    { props: { initialState: "nric" } }
  )
  .addNode(
    "id_no",
    props => {
      return <FormInput {...props} />;
    },
    { props: {} }
  )
  .addNode(
    "id_no_copy",
    (props, ref) => {
      function validate(value) {
        if (value === "") {
          return "This is required!";
        }

        return null;
      }
      return <FormInput ref={ref} {...props} validate={validate} />;
    },
    { props: {} }
  )
  .addNode(
    "visa_no",
    props => {
      return <FormInput {...props} />;
    },
    { props: {}, visible: false }
  )
  .addNode(
    "gender",
    props => {
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
      return <FormRadio options={options} {...props} />;
    },
    { props: { initialState: "f" } }
  )
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
      toNode.setProps({
        validate(value) {
          if (value[0] !== "S") {
            return "Enter a proper NRIC no!";
          } else {
            return null;
          }
        }
      });
    } else if (id === "fin") {
      toNode.setProps({
        validate(value) {
          if (value[0] !== "F") {
            return "Enter a proper FIN no!";
          } else {
            return null;
          }
        }
      });
    }
  })
  .link("id_no")
  .to("id_no_copy", (value, toNode) => {
    toNode.call("setValue", value);
  });

export default graph;
