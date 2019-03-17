function Node(data) {
  this.data = data;
  this.out = new Map();
  this.key = data.id || data.name;
  this.ui = null;
}

Node.prototype.render = function(oldState, newState) {
  const Component = this.data.component;
  const props = this.data.getProps(oldState, newState);

  this.ui = <Component key={this.key} {...props} />;
};

Node.prototype.to = function(node, condition) {
  this.out.set(node, condition);
};

function Graph(items) {
  this.nodes = {};
  this.components = {};

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
      node.out.forEach((condition, outNode) => {
        newState = condition(oldState, newState);
        outNode.render(oldState, newState);
      });

      node.render(oldState, newState);
    });
  });

  const components = {};

  Object.keys(newState).forEach(name => {
    this.nodes[name].forEach(node => {
      components[node.key] = node.ui;
    });
  });

  this.components = components;

  return newState;
};

Graph.prototype.ui = function() {
  return Object.values(this.components);
};

export default Graph;
