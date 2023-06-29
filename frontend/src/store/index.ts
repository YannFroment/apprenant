import { create, StoreApi, UseBoundStore } from 'zustand';

export type StoreState = {
  bears: number;
  increasePopulation: () => void;
  increasePopulationBy: (by: number) => void;
};

export type UseStore = UseBoundStore<StoreApi<StoreState>>;

export const createUseStore = (
  args: Partial<StoreState> = {},
): UseBoundStore<StoreApi<StoreState>> => {
  return create<StoreState>((set) => ({
    bears: args.bears ?? 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    increasePopulationBy: (by: number) =>
      set((state) => ({ bears: state.bears + by })),
  }));
};
