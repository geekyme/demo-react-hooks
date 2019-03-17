function Node(data) {
  this.data = data;
  this.out = new Map();
}

Node.prototype.render = function({ oldState, newState }) {
  const Component = this.data.component;
  const props = this.data.getProps(oldState, newState);
  return <Component key={props.id || props.name} {...props} />;
};

Node.prototype.to = function(node, condition) {
  this.out.set(node, condition);
};

function Graph(items, initialState) {
  this.nodes = {};
  this.components = {};

  items.forEach(data => {
    const node = new Node(data);
    if (typeof this.nodes[data.name] === "undefined") {
      this.nodes[data.name] = [node];
    } else {
      this.nodes[data.name].push(node);
    }

    const key = data.name + (this.nodes[data.name].length - 1);
    this.components[key] = node.render({
      oldState: initialState,
      newState: initialState
    });
  });
}

Graph.prototype.getNode = function(name, index = 0) {
  return this.nodes[name][index];
};

Graph.prototype.runChanges = function({ oldState, newState, changes }) {
  const changedNodes = Object.keys(changes);
  changedNodes.forEach((name, i) => {
    this.nodes[name].forEach(node => {
      node.out.forEach((condition, outNode) => {
        newState = condition(oldState, newState);
        this.components[key] = outNode.render({
          oldState,
          newState
        });
      });

      const key = name + i;
      this.components[key] = node.render({
        oldState,
        newState
      });
    });
  });

  return newState;
};

Graph.prototype.ui = function() {
  return Object.values(this.components);
};

export default Graph;
