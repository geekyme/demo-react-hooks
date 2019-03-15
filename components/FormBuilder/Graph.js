import FormInput from "components/FormInput";
import FormCheckbox from "components/FormCheckbox";
import FormRadio from "components/FormRadio";

function Node(data) {
  this.data = data;
  this.out = new Map();
}

Node.prototype.to = function(node, condition) {
  this.out.set(node, condition);
};

function Graph(items) {
  this.nodes = {};

  items.forEach(data => {
    this.nodes[data.name] = new Node(data);
  });
}

Graph.prototype.runChanges = function({ oldState, newState, changedNodes }) {
  changedNodes.forEach(name => {
    this.nodes[name].out.forEach(condition => {
      newState = condition(oldState, newState);
    });
  });

  console.log(newState);

  const components = (
    <div>
      <FormInput name="one" validate="number" />
      <FormInput name="two" validate="number" />
      <FormCheckbox name="check_1" />
      <FormCheckbox name="check_2" />
      <FormCheckbox name="check_3" />
      <FormRadio id="radio_female" name="radio_1" value="female" />
      <FormRadio id="radio_male" name="radio_1" value="male" />
    </div>
  );

  return [newState, components];
};

export default Graph;
