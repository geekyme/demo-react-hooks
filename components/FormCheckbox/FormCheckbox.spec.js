import { render, fireEvent, cleanup } from "react-testing-library";
import { act } from "react-dom/test-utils";
import FormCheckbox from "../FormCheckbox";

describe("<FormCheckbox />", () => {
  let wrapper, el;
  const initialState = true;
  const ref = React.createRef();

  beforeEach(() => {
    wrapper = render(
      <FormCheckbox
        ref={ref}
        name="terms_of_service"
        initialState={initialState}
      />
    );
    el = wrapper.getByTestId("FormCheckbox");
  });

  afterEach(cleanup);

  it("renders with initial state", () => {
    expect(el.checked).toEqual(initialState);
  });

  it("toggles value", () => {
    fireEvent.click(el);
    expect(el.checked).toEqual(!initialState);
  });

  it("allows setting the value", async () => {
    const value = !initialState;
    act(() => {
      ref.current.setValue(value);
    });

    expect(el.checked).toEqual(value);
  });
});
