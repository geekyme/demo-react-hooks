# demo-react-hooks

A demo on how to use react hooks for everything. [DEMO](https://demo-react-hooks.now.sh/)

A few examples are show cased here:

### A standalone form field

- Using custom useFormState to mask complexity of getting data from context / state

### A Form with many fields

- Using custom useFormState to mask complexity of getting data from context / state

### A Form builder

- Using custom useGraph hook, which accepts a graph of components and relationships. This allows us to build a complex form with conditional rendering fields.

### A Form builder with huge number of fields and relationships

- An exaggerated version of the previous example, where changing the first field will copy the value to all the other X fields

## Setup

This project is built on top of [NextJS](http://nextjs.org) for convenience

1. `npm install`
2. `npm run dev`
3. (For production build) `npm run build && npm start`
