import { create, StoreApi, UseBoundStore } from 'zustand';

import { TextReorder, Trainings } from '../domain/Backend';

type TrainingsStoreState = {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
  setTrainings: (trainings: Trainings) => void;
};

type UseStore = UseBoundStore<StoreApi<TrainingsStoreState>>;

export const createUseStore = (
  args: Partial<TrainingsStoreState> = {},
): UseStore => {
  return create<TrainingsStoreState>((set) => ({
    textReorders: args.textReorders ?? [],
    setTextReorders: (textReorders: TextReorder[]) =>
      set(() => ({ textReorders })),
    setTrainings: (trainings: Trainings) =>
      set(() => ({ textReorders: trainings.textReorders })),
  }));
};

export type UseTrainingsStore = () => {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
  setTrainings: (trainings: Trainings) => void;
};

const useStore = createUseStore();
export const useTrainingsStore: UseTrainingsStore = () => {
  const textReorders = useStore((state) => state.textReorders);
  const setTextReorders = useStore((state) => state.setTextReorders);
  const setTrainings = useStore((state) => state.setTrainings);

  return {
    textReorders,
    setTextReorders,
    setTrainings,
  };
};
