import { create, StoreApi, UseBoundStore } from 'zustand';

import { TextReorder } from '../domain/Backend';

export type StoreState = {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
};

export type UseStore = UseBoundStore<StoreApi<StoreState>>;

export const createUseStore = (args: Partial<StoreState> = {}): UseStore => {
  return create<StoreState>((set) => ({
    textReorders: args.textReorders ?? [],
    setTextReorders: (textReorders: TextReorder[]) =>
      set(() => ({ textReorders })),
  }));
};

const useStore = createUseStore();

export type UseTrainingsStore = () => {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
};

export const useTrainingsStore: UseTrainingsStore = () => {
  const textReorders = useStore((state) => state.textReorders);
  const setTextReorders = useStore((state) => state.setTextReorders);

  return {
    textReorders,
    setTextReorders,
  };
};
