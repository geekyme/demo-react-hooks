import { FormContext, useStore } from "./FormUtils";

export default function Form(props) {
  const store = useStore(props.data, props.onChange);

  function onSubmit(e) {
    e.preventDefault();
    store.setAllDirty();
    props.onSubmit(store.data, store.errors);
  }

  function onReset() {
    store.resetData(props.data);
  }

  return (
    <FormContext.Provider value={store}>
      <form onReset={onReset} onSubmit={onSubmit}>
        {props.children}
      </form>
    </FormContext.Provider>
  );
}
