import { useEffect, useRef } from "react";

export function useEffectOnMount(effect, opts) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const cleanup = effect();

      if (typeof cleanup === "function") {
        return cleanup;
      }
    }
  }, opts);
}
