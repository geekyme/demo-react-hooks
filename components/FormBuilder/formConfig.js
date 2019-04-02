import Graph from "./Graph";
import FormDateRange from "components/FormDateRange";
import FormSelect from "components/FormSelect";
import FormInput from "components/FormInput";
import FormRadio from "components/FormRadio";
import FormCheckbox from "components/FormCheckbox";

const graph = new Graph();

graph
  .addNode("travel_dates", injectedProps => {
    return <FormDateRange label="Travel Dates" {...injectedProps} />;
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
        label="Select your country of origin"
        initialState={options[1]}
        options={options}
        data-testid={injectedProps.name}
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

      return (
        <FormRadio
          label="Select your Identification type"
          options={options}
          data-testid={injectedProps.name}
          {...injectedProps}
        />
      );
    },
    { props: { initialState: "nric" } }
  )
  .addNode(
    "visa_no",
    injectedProps => {
      return (
        <FormInput
          label="Enter your visa number"
          data-testid={injectedProps.name}
          {...injectedProps}
        />
      );
    },
    { visible: false }
  )
  .addNode("id_no", injectedProps => {
    return (
      <FormInput
        label="Enter your ID no."
        data-testid={injectedProps.name}
        {...injectedProps}
      />
    );
  })
  .addNode("id_no_copy", (injectedProps, ref) => {
    function validate(value) {
      if (value === "") {
        return "This is required!";
      }

      return null;
    }
    return (
      <FormInput
        label="(For example only) Copy of above"
        ref={ref}
        data-testid={injectedProps.name}
        {...injectedProps}
        validate={validate}
      />
    );
  })
  .addNode("id_no_another_copy", (injectedProps, ref) => {
    return (
      <FormInput
        label="(For example only) Copy of above"
        ref={ref}
        data-testid={injectedProps.name}
        {...injectedProps}
      />
    );
  })
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
    return (
      <FormRadio
        label="Select your gender"
        initialState="f"
        options={options}
        {...injectedProps}
      />
    );
  })
  .addNode("check_1", (injectedProps, ref) => {
    return (
      <FormCheckbox
        label="Checking this will uncheck #3"
        ref={ref}
        data-testid={injectedProps.name}
        {...injectedProps}
      />
    );
  })
  .addNode("check_2", (injectedProps, ref) => {
    return (
      <FormCheckbox
        label="Checking this will uncheck #3"
        ref={ref}
        data-testid={injectedProps.name}
        {...injectedProps}
      />
    );
  })
  .addNode("check_3", (injectedProps, ref) => {
    return (
      <FormCheckbox
        label="Checking this will uncheck #1 and #2"
        ref={ref}
        data-testid={injectedProps.name}
        {...injectedProps}
      />
    );
  })
  .link("check_1")
  .to("check_3", (check_1, toNode) => {
    if (check_1) {
      toNode.call("setValue", false);
    }
  })
  .link("check_2")
  .to("check_3", (check_2, toNode) => {
    if (check_2) {
      toNode.call("setValue", false);
    }
  })
  .link("check_3")
  .to("check_1", (check_3, toNode) => {
    if (check_3) {
      toNode.call("setValue", false);
    }
  })
  .link("check_3")
  .to("check_2", (check_3, toNode) => {
    if (check_3) {
      toNode.call("setValue", false);
    }
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
  })
  .link("id_no_copy")
  .to("id_no_another_copy", (value, toNode) => {
    toNode.call("setValue", value);
  });

export default graph;
