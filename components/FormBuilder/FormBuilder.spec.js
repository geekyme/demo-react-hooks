import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import FormBuilder from "../FormBuilder";
import formConfig, { defaultState } from "components/FormBuilder/formConfig";

describe("<FormBuilder />", () => {
  let wrapper;
  const spy = jest.fn();

  beforeEach(() => {
    wrapper = render(<FormBuilder config={formConfig()} onSubmit={spy} />);
  });

  afterEach(cleanup);

  describe("Initial state rendering", () => {
    it("shows initial state with relationships executed", () => {
      const id_no = wrapper.getByTestId("id_no");
      const id_no_copy = wrapper.getByTestId("id_no_copy");
      const id_no_another_copy = wrapper.getByTestId("id_no_another_copy");

      expect(id_no.value).toEqual(defaultState.id_no);
      expect(id_no_copy.value).toEqual(defaultState.id_no);
      expect(id_no_another_copy.value).toEqual(defaultState.id_no);
    });
  });
  describe("Submitting without filling form", () => {
    it("shows all form errors", () => {
      const button = wrapper.getByText("Submit");

      fireEvent.click(button);
      expect(spy).toBeCalled();

      wrapper.getByText("Please select a valid to and from date");
      wrapper.getByText("Enter a proper NRIC no!");
    });

    it("shows all form errors", () => {
      const button = wrapper.getByText("Submit");

      fireEvent.click(button);

      wrapper.getByText("Please select a valid to and from date");
      wrapper.getByText("Enter a proper NRIC no!");
    });
  });

  describe("Conditional rendering", () => {
    it("only shows field for visa number when you select 'Malaysia'", () => {
      try {
        wrapper.getByText("Enter your visa number");
      } catch (e) {
        expect(e).toBeDefined();
      }

      const node = wrapper.getByTestId("country");
      const input = node.querySelector(".selectPrefix__input input");
      const select = node.querySelector(".selectPrefix__control");
      fireEvent.focus(input);
      fireEvent.mouseDown(select);
      const option = wrapper.getByText("Malaysia");

      fireEvent.click(option);
      wrapper.getByText("Enter your visa number");
    });
  });

  describe("Conditional props", () => {
    it("applys NRIC validation when you select Singapore IC id", async () => {
      const el = wrapper.getByLabelText("Singapore IC");

      fireEvent.click(el);

      const input = wrapper.getByTestId("id_no");

      fireEvent.change(input, { target: { value: "boo" } });

      wrapper.getByText("Enter a proper NRIC no!");
    });

    it("applys FIN validation when you select Foreign Identity Number id", async () => {
      const el = wrapper.getByLabelText("Foreign Identity Number");

      fireEvent.click(el);

      const input = wrapper.getByTestId("id_no");

      fireEvent.change(input, { target: { value: "boo" } });

      wrapper.getByText("Enter a proper FIN no!");
    });
  });

  describe("Conditonal node method calls", () => {
    it("copies whatever you type in id_no to id_no_copy and id_no_another_copy", async () => {
      const value = "boo";
      const id_no = wrapper.getByTestId("id_no");

      fireEvent.change(id_no, { target: { value } });

      const id_no_copy = wrapper.getByTestId("id_no_copy");
      const id_no_another_copy = wrapper.getByTestId("id_no_another_copy");

      expect(id_no_copy.value).toEqual(value);
      expect(id_no_another_copy.value).toEqual(value);
    });

    it("copies whatever you type in id_no_copy to id_no_another_copy", async () => {
      const value = "boo";

      const id_no_copy = wrapper.getByTestId("id_no_copy");

      fireEvent.change(id_no_copy, { target: { value } });

      const id_no_another_copy = wrapper.getByTestId("id_no_another_copy");

      expect(id_no_another_copy.value).toEqual(value);
    });

    it("unchecks #3 when you check #1", async () => {
      const check_3 = wrapper.getByTestId("check_3");
      const check_1 = wrapper.getByTestId("check_1");

      fireEvent.click(check_3);

      expect(check_3.checked).toEqual(true);

      fireEvent.click(check_1);

      expect(check_1.checked).toEqual(true);
      expect(check_3.checked).toEqual(false);
    });

    it("unchecks #3 when you check #2", async () => {
      const check_3 = wrapper.getByTestId("check_3");
      const check_2 = wrapper.getByTestId("check_2");

      fireEvent.click(check_3);

      expect(check_3.checked).toEqual(true);

      fireEvent.click(check_2);

      expect(check_2.checked).toEqual(true);
      expect(check_3.checked).toEqual(false);
    });

    it("unchecks #1 and #2 when you check #3", async () => {
      const check_1 = wrapper.getByTestId("check_1");
      const check_2 = wrapper.getByTestId("check_2");
      const check_3 = wrapper.getByTestId("check_3");

      fireEvent.click(check_1);
      fireEvent.click(check_2);

      expect(check_1.checked).toEqual(true);
      expect(check_2.checked).toEqual(true);

      fireEvent.click(check_3);
      expect(check_3.checked).toEqual(true);
      expect(check_1.checked).toEqual(false);
      expect(check_2.checked).toEqual(false);
    });
  });
});
