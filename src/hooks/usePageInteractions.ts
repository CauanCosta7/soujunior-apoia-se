import { useEffect, type RefObject } from "react";
import { initializeInteractions } from "./interactions";
export function usePageInteractions(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (root.current) return initializeInteractions(root.current);
  }, [root]);
}
