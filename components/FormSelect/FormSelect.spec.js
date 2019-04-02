import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import FormSelect from "../FormSelect";

describe("<FormSelect />", () => {
  let wrapper, els;

  const name = "country";
  const options = [
    { value: "sg", label: "Singapore" },
    { value: "my", label: "Malaysia" },
    { value: "tw", label: "Taiwan" }
  ];
  const initialState = options[0];

  beforeEach(() => {
    wrapper = render(
      <FormSelect name={name} initialState={initialState} options={options} />
    );
  });

  afterEach(cleanup);

  it("renders with initial state", () => {
    wrapper.getByText(initialState.label);
  });

  it("changes value", async () => {
    const input = wrapper.container.querySelector(".selectPrefix__input input");
    const select = wrapper.container.querySelector(".selectPrefix__control");
    fireEvent.focus(input);
    fireEvent.mouseDown(select);

    const option = await waitForElement(() =>
      wrapper.getByText(options[1].label)
    );

    fireEvent.click(option);

    wrapper.getByText(options[1].label);
  });
});
