# demo-react-hooks

A demo on how to use react hooks for everything. [DEMO](https://demo-react-hooks-3lt8ehjye.now.sh/)

4 examples are show cased here:

1. A simple editable list

- Using useState / useContext hooks to create a global observable store
- Providing custom useAppContext hook as an API to the store
- Store mutators are also passed down in context
- Using useState hook as transient component state (errors, input state, etc.)
- Using useEffect hook to do things like run init state
- Using custom hooks (useAdd / useRemove) to handle side effects.

2. A standalone form field

- Using custom useFormState to mask complexity of getting data from context / state

3. A Form with many fields

- Using custom useFormState to mask complexity of getting data from context / state

4. A Form builder

- Building on #3, providing a graph API to construct the fields of a form and map relationships between fields

### Setup

This project is built on top of [NextJS](http://nextjs.org) for convenience

1. `npm install`
2. `npm run dev` or `HIGHLOAD=true npm run dev` if you want to play with the form builder with 1000 fields
3. Open your browser and play with both examples. There is simulated delay with the editable list.
