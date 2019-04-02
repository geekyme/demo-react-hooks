import { FormContext, useStore } from "./FormUtils";

export default function Form(props) {
  const { data, onChange, children, onSubmit, ...other } = props;
  const store = useStore(data, onChange);

  function onFormSubmit(e) {
    e.preventDefault();
    store.setAllDirty();
    onSubmit(store.data, store.errors);
  }

  function onReset() {
    store.resetData(data);
  }

  return (
    <FormContext.Provider value={store} {...other}>
      <form onReset={onReset} onSubmit={onFormSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
