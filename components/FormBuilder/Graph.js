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

  return newState;
};

export default Graph;
