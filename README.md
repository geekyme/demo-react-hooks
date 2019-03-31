# demo-react-hooks

A demo on how to use react hooks for everything. See website link above for demo.

4 examples are show cased here:

### A simple editable list

- Using useState / useContext hooks to create a global observable store
- Providing custom useAppContext hook as an API to the store
- Store mutators are also passed down in context
- Using useState hook as transient component state (errors, input state, etc.)
- Using useEffect hook to do things like run init state
- Using custom hooks (useAdd / useRemove) to handle side effects.

### A standalone form field

- Using custom useFormState to mask complexity of getting data from context / state

### A Form with many fields

- Using custom useFormState to mask complexity of getting data from context / state

### A Form builder

- Building on #3, providing a graph API to construct the fields of a form and map relationships between fields

## Setup

This project is built on top of [NextJS](http://nextjs.org) for convenience

1. `npm install`
2. `npm run dev`
3. Open your browser and play with both examples. There is simulated delay with the editable list.
