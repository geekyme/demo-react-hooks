import { render, fireEvent, cleanup } from "react-testing-library";
import { act } from "react-dom/test-utils";
import FormInput from "../FormInput";

describe("<FormInput />", () => {
  let wrapper, el;
  const initialState = "init";
  const errorMsg = "Not boo";
  const ref = React.createRef();

  function validate(value) {
    if (value !== "boo") {
      return errorMsg;
    } else {
      return null;
    }
  }

  beforeEach(() => {
    const testId = "FormInput";
    wrapper = render(
      <FormInput
        ref={ref}
        name="name"
        initialState={initialState}
        validate={validate}
        data-testid={testId}
      />
    );
    el = wrapper.getByTestId(testId);
  });

  afterEach(cleanup);

  it("renders with initial state", () => {
    expect(el.value).toEqual(initialState);
  });

  it("does not show errors initially", () => {
    try {
      wrapper.getByText(errorMsg);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it("changes value", () => {
    const value = "23";
    fireEvent.change(el, { target: { value } });
    expect(el.value).toEqual(value);
  });

  it("shows errors", async () => {
    const value = "error";
    fireEvent.change(el, { target: { value } });

    wrapper.getByText(errorMsg);
  });

  it("allows setting the value", async () => {
    const value = "sett!";
    act(() => {
      ref.current.setValue(value);
    });

    expect(el.value).toEqual(value);
  });
});
