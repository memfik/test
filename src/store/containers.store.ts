import { create } from "zustand";
import type { Container } from "@/types/containers";
import { getContainers } from "@/api/containers";

interface ContainersState {
  containers: Container[];
  loading: boolean;
  fetch: () => Promise<void>;
}

export const useContainersStore = create<ContainersState>((set) => ({
  containers: [],
  loading: false,
  fetch: async () => {
    set({ loading: true });
    const data = await getContainers();
    set({ containers: data, loading: false });
  },
}));
