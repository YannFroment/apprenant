import { create, StoreApi, UseBoundStore } from 'zustand';

import { TextReorder } from '../domain/Backend';

type StoreState = {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
};

type UseStore = UseBoundStore<StoreApi<StoreState>>;

export const createUseStore = (args: Partial<StoreState> = {}): UseStore => {
  return create<StoreState>((set) => ({
    textReorders: args.textReorders ?? [],
    setTextReorders:
      args.setTextReorders ??
      ((textReorders: TextReorder[]) => set(() => ({ textReorders }))),
  }));
};

export type UseTrainingsStore = () => {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
};

const useStore = createUseStore();
export const useTrainingsStore: UseTrainingsStore = () => {
  const textReorders = useStore((state) => state.textReorders);
  const setTextReorders = useStore((state) => state.setTextReorders);

  return {
    textReorders,
    setTextReorders,
  };
};
