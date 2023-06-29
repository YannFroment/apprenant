import { create, StoreApi, UseBoundStore } from 'zustand';

import { TextReorder } from '../domain/Backend';
import { useAppContext } from '../service-container/ServiceContainerContext';

export type StoreState = {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
};

export type UseStore = UseBoundStore<StoreApi<StoreState>>;

export const createUseStore = (
  args: Partial<StoreState> = {},
): UseBoundStore<StoreApi<StoreState>> => {
  return create<StoreState>((set) => ({
    textReorders: args.textReorders ?? [],
    setTextReorders: (textReorders: TextReorder[]) =>
      set(() => ({ textReorders })),
  }));
};

export const useTrainingsStore = () => {
  const { useStore } = useAppContext();
  const textReorders = useStore((state) => state.textReorders);
  const setTextReorders = useStore((state) => state.setTextReorders);

  return {
    textReorders,
    setTextReorders,
  };
};
