import FormBuilder from "components/FormBuilder";
import FormInput from "components/FormInput";
import formConfig from "components/FormBuilder/formConfig";
import largeConfig from "components/FormBuilder/largeConfig";
import FormCheckbox from "components/FormCheckbox";
import FormRadio from "components/FormRadio";
import FormSelect from "components/FormSelect";
import FormDateRange from "components/FormDateRange";
import FormSelectInputGroup from "components/FormSelectInputGroup";
import Button from "components/Button";
import Form from "components/Form";
import Layout from "components/Layout";
import { H2 } from "components/Typography";
import { FaGithub, FaGitlab } from "react-icons/fa";
import styles from "./Demo.scss";

export function getInitialState(key) {
  try {
    const state = localStorage.getItem(key);

    if (state !== null) {
      return JSON.parse(state);
    } else {
      throw new Error(`Cannot find ${key}`);
    }
  } catch (e) {
    console.warn(e.message);
  }
}

export default function Demo() {
  function customValidate(value) {
    if (value !== "boo") {
      return "Value is not boo";
    } else {
      return null;
    }
  }
  return (
    <Layout>
      <a
        href="https://github.com/geekyme/demo-react-hooks"
        target="_blank"
        className={styles.github}
      >
        <FaGithub className={styles.icon} />
      </a>
      <a
        href="https://gitlab.com/geekyme/demo-react-hooks"
        target="_blank"
        className={styles.gitlab}
      >
        <FaGitlab className={styles.icon} />
      </a>
      <div className={styles.container}>
        <div className={styles.standalone}>
          <H2>Standalone Fields</H2>
          <FormDateRange label="Travel Dates" />
          <FormInput
            label="KrisFlyer Miles No."
            onChange={value => console.log("standalone", value)}
            validate={customValidate}
          />
          <FormSelect
            label="Select your favorite dessert"
            initialState={{ value: "strawberry", label: "Strawberry" }}
            onChange={value => console.log("standalone select", value)}
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" }
            ]}
          />
        </div>

        <div className={styles.form}>
          <H2>Form</H2>
          <Form
            onChange={newState => {
              console.log("Form on change", newState);
            }}
            onSubmit={(data, errors) => {
              console.log("Form submit data", data);
              console.log("Form submit errors", errors);
              alert("Check the developer console!");
            }}
          >
            <FormDateRange
              label="Select your travel dates"
              name="travel_date"
            />
            <FormSelect
              label="Country of origin"
              name="country_from"
              options={[
                { value: "sg", label: "Singapore" },
                { value: "my", label: "Malaysia" },
                { value: "tw", label: "Taiwan" }
              ]}
              initialState={{ value: "sg", label: "Singapore" }}
            />
            <FormSelect
              label="Destination"
              name="country_to"
              options={[
                { value: "sg", label: "Singapore" },
                { value: "my", label: "Malaysia" },
                { value: "tw", label: "Taiwan" }
              ]}
              initialState={{ value: "tw", label: "Taiwan" }}
            />
            <FormSelectInputGroup
              name="full_name"
              label="Provide your full name"
              options={[
                { value: "Mr", label: "Mr" },
                { value: "Mrs", label: "Mrs" },
                { value: "Ms", label: "Ms" },
                { value: "Mdm", label: "Mdm" }
              ]}
              initialState={{
                select: { value: "Mrs", label: "Mrs" },
                input: "Magnolia"
              }}
              validate={value => {
                if (value === "") {
                  return "Must not be empty!";
                } else {
                  return null;
                }
              }}
            />
            <FormRadio
              label="Select your meal preferences"
              name="meal"
              options={[
                { value: "veggie", label: "Vegetarian" },
                { value: "halal", label: "Halal" },
                { value: "none", label: "No restrictions" }
              ]}
              initialState="none"
            />
            <FormInput
              label="Additional comments"
              name="additional_comments"
              initialState=""
              validate="number"
            />
            <FormCheckbox
              label="Agree to our Terms & Conditions"
              name="agree_tos"
              initialState={true}
            />
            <FormCheckbox
              label="Agree to our Privacy Policy statement"
              name="agree_privacy"
            />
            <Button btnType="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className={styles.formBuilder}>
          <H2>Form Builder</H2>
          <FormBuilder
            config={formConfig(getInitialState("fb_initial_state"))}
            onSubmit={(state, errors) => {
              console.log("form", state);
              console.log("errors", errors);
              localStorage.setItem("fb_initial_state", JSON.stringify(state));
              alert("Check the developer console!");
            }}
          />
        </div>
        <div className={styles.formBuilderLarge}>
          <H2>Form Builder (Large)</H2>
          <FormBuilder
            config={largeConfig(getInitialState("fb_initial_large_state"))}
            onSubmit={(state, errors) => {
              console.log("form", state);
              console.log("errors", errors);
              localStorage.setItem(
                "fb_initial_large_state",
                JSON.stringify(state)
              );
              alert("Check the developer console!");
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
