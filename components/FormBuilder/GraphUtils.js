import { useState } from "react";

export function useGraph(graph) {
  const [ui, setState] = useState(() => {
    graph.init();

    return graph.ui();
  });

  function runChanges(changes) {
    graph.runChanges(changes);
    setState(graph.ui());
  }

  return {
    ui,
    runChanges
  };
}
