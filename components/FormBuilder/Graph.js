class Node {
  constructor(graph, opts) {
    this.graph = graph;
    this.name = opts.name;
    this.render = opts.render;
    this.props = opts.props;
    this.out = new Map();
  }

  to(nodeName, callback) {
    const node = this.graph.getNode(nodeName);

    this.out.set(node, callback);

    return this.graph;
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(name, render, opts) {
    const node = new Node(this, {
      render,
      name,
      ...opts
    });
    this.nodes.set(name, node);

    return this;
  }

  getNode(name) {
    return this.nodes.get(name);
  }

  link(name) {
    return this.getNode(name);
  }

  runChanges(changes) {
    const nodes = Object.keys(changes);

    nodes.forEach(name => {
      const node = this.nodes.get(name);

      node.out.forEach((callback, outNode) => {
        const change = changes[name];
        const result = callback(change);

        outNode.props = result;
      });
    });
  }

  init() {
    const changes = {};

    this.nodes.forEach((node, name) => {
      if (node.props !== null) {
        changes[name] = node.props.initialState;
      }
    });

    this.runChanges(changes);
  }

  ui() {
    const children = [];

    for (const [name, node] of this.nodes) {
      if (node.props !== null) {
        children.push(
          node.render({
            name,
            ...node.props
          })
        );
      }
    }

    return children;
  }
}

export default Graph;
