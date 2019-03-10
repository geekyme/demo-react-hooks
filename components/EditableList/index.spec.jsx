import React from "react";
import { render, fireEvent } from "react-testing-library";

import EditableList from "../EditableList";
import StateProvider from "components/StateProvider";

describe("<EditableList />", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = render(
      <StateProvider>
        <EditableList />
      </StateProvider>
    );
  });

  it("allows adding", () => {
    const text = "Boohoo";
    try {
      wrapper.getByText(text);
    } catch (e) {
      expect(e).toBeDefined();
    }
    fireEvent.change(wrapper.getByTestId("input"), {
      target: { value: text }
    });

    fireEvent.click(wrapper.getByTestId("submit"));
    expect(wrapper.getByText(text)).toBeDefined();
  });
});
