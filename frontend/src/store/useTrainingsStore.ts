import { create, StoreApi, UseBoundStore } from 'zustand';

import { TextReorder, Trainings, WordRecognition } from '../domain/Trainings';

type TrainingsStoreState = {
  textReorders: TextReorder[];
  wordRecognitions: WordRecognition[];
  setTrainings: (trainings: Trainings) => void;
};

type UseStore = UseBoundStore<StoreApi<TrainingsStoreState>>;

export const createUseTrainingsStore = (
  args: Partial<TrainingsStoreState> = {},
): UseStore => {
  return create<TrainingsStoreState>((set) => ({
    textReorders: args.textReorders ?? [],
    wordRecognitions: args.wordRecognitions ?? [],
    setTrainings: (trainings: Trainings) =>
      set(() => ({
        textReorders: trainings.textReorders,
        wordRecognitions: trainings.wordRecognitions,
      })),
  }));
};

export type UseTrainingsStore = () => {
  textReorders: TextReorder[];
  wordRecognitions: WordRecognition[];
  setTrainings: (trainings: Trainings) => void;
};

const useStore = createUseTrainingsStore();
export const useTrainingsStore: UseTrainingsStore = () => {
  const { textReorders, wordRecognitions, setTrainings } = useStore(
    (state) => ({
      textReorders: state.textReorders,
      wordRecognitions: state.wordRecognitions,
      setTrainings: state.setTrainings,
    }),
  );

  return {
    textReorders,
    wordRecognitions,
    setTrainings,
  };
};
