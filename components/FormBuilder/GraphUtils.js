import { useEffect, useState, useRef } from "react";

export function useGraph(graph) {
  const initData = useRef({});
  const [ui, setState] = useState(() => {
    initData.current = graph.init();

    return graph.ui();
  });

  useEffect(() => {
    graph.runChanges(initData.current);
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
