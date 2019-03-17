function Node(data) {
  this.data = data;
  this.out = new Map();
}

Node.prototype.render = function(oldState, newState) {
  const Component = this.data.component;
  const props = this.data.getProps(oldState, newState);
  return <Component key={props.id || props.name} {...props} />;
};

Node.prototype.to = function(node, condition) {
  this.out.set(node, condition);
};

function Graph(items) {
  this.nodes = {};

  items.forEach(data => {
    if (typeof this.nodes[data.name] === "undefined") {
      this.nodes[data.name] = [new Node(data)];
    } else {
      this.nodes[data.name].push(new Node(data));
    }
  });
}

Graph.prototype.getNode = function(name, index = 0) {
  return this.nodes[name][index];
};

// TODO: need to rethink this together with UI changes
// at the moment, we are only able to modify the form state based on inputs
// however we should also be able to apply node changes.
//
// eg. if a node A's value is xxx, then node B's validator should change to xxx
// therefore we need to be able to apply new props on the node
Graph.prototype.runChanges = function({ oldState, newState, changes }) {
  Object.keys(changes).forEach(name => {
    this.nodes[name].forEach(node => {
      node.out.forEach(condition => {
        newState = condition(oldState, newState);
      });
    });
  });

  const components = [];

  Object.keys(newState).forEach(name => {
    const nodes = this.nodes[name];

    nodes.forEach(node => {
      components.push(node.render(oldState, newState));
    });
  });

  return [newState, components];
};

export default Graph;
