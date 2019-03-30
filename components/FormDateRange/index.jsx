import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { useRef } from "react";
import { useFormState } from "components/Form/FormUtils";

export default function FormDateRange(props) {
  const toEl = useRef();
  const { setValue, value } = useFormState({
    name: props.name,
    initialState: {}
  });
  const { from, to } = value;

  const modifiers = { start: from, end: to };

  function focusTo() {
    toEl.current.getInput().focus();
  }

  function handleFromChange(from) {
    setValue({
      ...value,
      from
    });
  }

  function handleToChange(to) {
    setValue({
      ...value,
      to
    });
  }

  return (
    <div className="InputFromTo">
      <DayPickerInput
        value={from}
        placeholder="From"
        dayPickerProps={{
          showOutsideDays: true,
          selectedDays: [from, { from, to }],
          disabledDays: { after: to },
          toMonth: to,
          modifiers,
          numberOfMonths: 2,
          onDayClick: focusTo
        }}
        onDayChange={handleFromChange}
      />{" "}
      —{" "}
      <span className="InputFromTo-to">
        <DayPickerInput
          ref={toEl}
          value={to}
          placeholder="To"
          dayPickerProps={{
            showOutsideDays: true,
            selectedDays: [from, { from, to }],
            disabledDays: { before: from },
            modifiers,
            month: from,
            fromMonth: from,
            numberOfMonths: 2
          }}
          onDayChange={handleToChange}
        />
      </span>
    </div>
  );
}
