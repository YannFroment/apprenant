import { create, StoreApi, UseBoundStore } from 'zustand';

import { TextReorder, Trainings } from '../domain/Backend';

type TrainingsStoreState = {
  textReorders: TextReorder[];
  setTrainings: (trainings: Trainings) => void;
};

type UseStore = UseBoundStore<StoreApi<TrainingsStoreState>>;

export const createUseStore = (
  args: Partial<TrainingsStoreState> = {},
): UseStore => {
  return create<TrainingsStoreState>((set) => ({
    textReorders: args.textReorders ?? [],
    setTrainings: (trainings: Trainings) =>
      set(() => ({ textReorders: trainings.textReorders })),
  }));
};

export type UseTrainingsStore = () => {
  textReorders: TextReorder[];
  setTrainings: (trainings: Trainings) => void;
};

const useStore = createUseStore();
export const useTrainingsStore: UseTrainingsStore = () => {
  const textReorders = useStore((state) => state.textReorders);
  const setTrainings = useStore((state) => state.setTrainings);

  return {
    textReorders,
    setTrainings,
  };
};
