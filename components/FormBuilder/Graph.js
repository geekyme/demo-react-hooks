import { createRef } from "react";

class Node {
  constructor(graph, opts) {
    this.graph = graph;
    this.name = opts.name;
    this.renderFunc = opts.renderFunc;
    this.props = opts.props || {};
    this.visible = typeof opts.visible !== "undefined" ? opts.visible : true;
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
    this.ui = this.renderFunc(
      { key: this.name, name: this.name, ...this.props },
      this.ref
    );
    this.props = this.ui.props;
  }

  setProps(callback) {
    this.props = callback(this.props);
  }

  setVisible(value) {
    this.visible = value;
  }

  call(name, ...args) {
    if (this.ref.current !== null) {
      this.ref.current[name].apply(null, args);
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

        callback(change, outNode);

        outNode.render();
      });
    });
  }

  init() {
    const changes = {};

    this.nodes.forEach((node, name) => {
      if (node.visible) {
        changes[name] = node.props.initialState;
      }
    });

    this.runChanges(changes);
  }

  ui() {
    const children = [];

    for (const [_, node] of this.nodes) {
      if (node.visible) {
        children.push(node.ui);
      }
    }

    return children;
  }
}

export default Graph;
