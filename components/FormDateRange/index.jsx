import DayPickerInput from "react-day-picker/DayPickerInput";
import { useRef } from "react";
import { useFormState } from "components/Form/FormUtils";
import FormUI from "components/FormUI";
import styles from "./FormDateRange.scss";

function defaultValidate(value) {
  const { from, to } = value;

  if (isValidDate(from) && isValidDate(to)) {
    return null;
  } else {
    return "Please select a valid to and from date";
  }
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export default function FormDateRange(props) {
  const { initialState = {}, name, validate = defaultValidate, label } = props;
  const toEl = useRef();
  const { setValue, value, error, pristine } = useFormState({
    name,
    initialState,
    validate
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
    <FormUI label={label} error={error} pristine={pristine}>
      <div className={styles.container}>
        <DayPickerInput
          classNames={{ container: styles.from }}
          value={from}
          placeholder="From"
          dayPickerProps={{
            showOutsideDays: true,
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            onDayClick: focusTo
          }}
          inputProps={{
            type: "text"
          }}
          onDayChange={handleFromChange}
        />

        <DayPickerInput
          classNames={{ container: styles.to }}
          ref={toEl}
          value={to}
          placeholder="To"
          dayPickerProps={{
            showOutsideDays: true,
            selectedDays: [from, { from, to }],
            disabledDays: { before: from },
            modifiers,
            month: from,
            fromMonth: from
          }}
          inputProps={{
            type: "text"
          }}
          onDayChange={handleToChange}
        />
      </div>
    </FormUI>
  );
}
