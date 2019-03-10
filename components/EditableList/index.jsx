import { useAppState } from "components/StateProvider";
import { useState } from "react";
import { add, remove } from "./actions";

export default function EditableList() {
  const [appState, setAppState] = useAppState();
  const [inputState, setInputState] = useState("");
  const [errorState, setErrorState] = useState(null);

  async function onAdd(e) {
    e.preventDefault();
    try {
      const state = await add(inputState, appState);
      setAppState(state);
      setInputState("");
      setErrorState(null);
    } catch (e) {
      setErrorState(e.message);
    }
  }

  function onRemove(item) {
    return async () => {
      try {
        const state = await remove(item, appState);
        setAppState(state);
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
