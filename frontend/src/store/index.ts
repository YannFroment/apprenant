import { useParams } from 'react-router-dom';
import { create, StoreApi, UseBoundStore } from 'zustand';

import { TextReorder } from '../domain/Backend';

export type StoreState = {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
};

export const createUseStore = (
  args: Partial<StoreState> = {},
): UseBoundStore<StoreApi<StoreState>> => {
  return create<StoreState>((set) => ({
    textReorders: args.textReorders ?? [],
    setTextReorders: (textReorders: TextReorder[]) =>
      set(() => ({ textReorders })),
  }));
};

const useStore = createUseStore();

export type UseTrainingStore = () => {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
  useCurrentTextReorder: () => TextReorder | undefined;
};

export const useTrainingsStore: UseTrainingStore = () => {
  const textReorders = useStore((state) => state.textReorders);
  const setTextReorders = useStore((state) => state.setTextReorders);

  const useCurrentTextReorder = () => {
    const { id } = useParams();
    return textReorders.find((el) => el.id.toString() === id);
  };

  return {
    textReorders,
    setTextReorders,
    useCurrentTextReorder,
  };
};
