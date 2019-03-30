import { createRef } from "react";

class Node {
  constructor(graph, opts) {
    this.graph = graph;
    this.name = opts.name;
    this.renderFunc = opts.renderFunc;
    this.props = opts.props;
    this.out = new Map();
    this.ui = null;
    this.ref = createRef();
  }

  to(nodeName, callback) {
    const node = this.graph.getNode(nodeName);

    this.out.set(node, callback);

    return this.graph;
  }

  render() {
    if (this.props !== null) {
      this.ui = this.renderFunc({ name: this.name, ...this.props }, this.ref);
    } else {
      this.ui = null;
    }
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(name, renderFunc, opts) {
    const node = new Node(this, {
      renderFunc,
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

      node.render();

      node.out.forEach((callback, outNode) => {
        const change = changes[name];
        const result = callback(change, outNode.ref.current);

        outNode.props = result;

        outNode.render();
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

    for (const [_, node] of this.nodes) {
      if (node.props !== null) {
        children.push(node.ui);
      }
    }

    return children;
  }
}

export default Graph;
