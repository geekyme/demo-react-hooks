import { useState, useEffect } from "react";

export function useGraph(graph) {
  const [ui, setState] = useState(graph.ui());

  useEffect(() => {
    graph.init();
    setState(graph.ui());
  }, []);

  function runChanges(changes) {
    graph.runChanges(changes);
    setState(graph.ui());
  }

  return {
    ui,
    runChanges
  };
}
