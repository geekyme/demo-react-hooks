import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { useState, useRef } from "react";

export default function FormDateRange() {
  const toEl = useRef();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const modifiers = { start: from, end: to };

  function focusTo() {
    toEl.current.getInput().focus();
  }

  function handleFromChange(from) {
    setFrom(from);
  }

  function handleToChange(to) {
    setTo(to);
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
