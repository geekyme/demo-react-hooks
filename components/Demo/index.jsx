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
import styles from "./Demo.scss";

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
            }}
          >
            <FormDateRange name="travel_date" />
            <FormSelect
              name="country"
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
                input: "bob"
              }}
            />
            <FormRadio
              label="Select your gender"
              name="gender"
              options={[
                { value: "m", label: "Male" },
                { value: "f", label: "Female" }
              ]}
              initialState="f"
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
            <Button type="reset">Reset</Button>
            <Button btnType="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className={styles.formBuilder}>
          <H2>Form Builder</H2>
          <FormBuilder config={formConfig} />
        </div>
        {/* <div className={styles.formBuilderLarge}>
        <H2>Form Builder (Large)</H2>
        <FormBuilder config={largeConfig} />
      </div> */}
      </div>
    </Layout>
  );
}
