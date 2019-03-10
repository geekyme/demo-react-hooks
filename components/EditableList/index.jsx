import { useState } from "react";
import { useAdd, useRemove } from "./actions";
import { useAppState } from "components/StateProvider";

export default function EditableList() {
  const [appState] = useAppState();
  const [inputState, setInputState] = useState("");
  const [errorState, setErrorState] = useState(null);
  const add = useAdd();
  const remove = useRemove();

  async function onAdd(e) {
    e.preventDefault();
    try {
      await add(inputState);
      setInputState("");
      setErrorState(null);
    } catch (e) {
      setErrorState(e.message);
    }
  }

  function onRemove(item) {
    return async () => {
      try {
        await remove(item);
        setErrorState(null);
      } catch (e) {
        setErrorState(e.message);
      }
    };
  }

  function onChange(e) {
    setInputState(e.target.value);
  }

  return (
    <ul>
      {errorState !== null && <div>{errorState}</div>}
      <form onSubmit={onAdd}>
        <textarea value={inputState} onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
      {appState.agenda.items.map(item => {
        return (
          <div>
            <li>{item.text}</li>
            <button onClick={onRemove(item)}>x</button>
          </div>
        );
      })}
    </ul>
  );
}
