function Node(data) {
  this.data = data;
  this.out = new Map();
}

Node.prototype.render = function() {
  const Component = this.data.component;
  return <Component {...this.data.props} />;
};

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

  const components = Object.keys(newState).map(name => {
    const node = this.nodes[name];
    return node.render();
  });

  return [newState, components];
};

export default Graph;
