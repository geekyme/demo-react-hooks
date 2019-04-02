import { render, fireEvent, cleanup } from "react-testing-library";
import FormRadio from "../FormRadio";

describe("<FormRadio />", () => {
  let wrapper, els;

  const name = "gender";
  const options = [
    { value: "f", label: "female" },
    { value: "m", label: "male" }
  ];
  const initialState = options[0].value;

  beforeEach(() => {
    wrapper = render(
      <FormRadio name={name} initialState={initialState} options={options} />
    );

    els = wrapper.getAllByTestId("FormRadio");
  });

  afterEach(cleanup);

  it("renders with initial state", () => {
    expect(els[0].checked).toEqual(true);
    expect(els[1].checked).toEqual(false);
  });

  it("changes value", () => {
    const i = 1;
    const value = options[i].value;
    fireEvent.click(els[i], { target: { value } });

    expect(els[0].checked).toEqual(false);
    expect(els[1].checked).toEqual(true);
  });
});
