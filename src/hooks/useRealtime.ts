import { useEffect } from "react";
import { useContainersStore } from "../store/containers.store";

export const useRealtime = () => {
  const fetch = useContainersStore((state) => state.fetch);

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, [fetch]);
};
