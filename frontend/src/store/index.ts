import { useParams } from 'react-router-dom';
import { create } from 'zustand';

import { TextReorder } from '../domain/Backend';

export type StoreState = {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
};

const useStore = create<StoreState>((set) => ({
  textReorders: [
    {
      id: 1,
      orderedSentences: ['a', 'b'],
      randomizedSentences: ['a', 'b'],
      title: 'toto',
    },
  ],
  setTextReorders: (textReorders: TextReorder[]) =>
    set(() => ({ textReorders })),
}));

export type UseTrainingsStore = () => {
  textReorders: TextReorder[];
  setTextReorders: (textReorders: TextReorder[]) => void;
  useCurrentTextReorder: () => TextReorder | undefined;
};

export const useTrainingsStore: UseTrainingsStore = () => {
  const textReorders = useStore((state) => state.textReorders);
  const setTextReorders = useStore((state) => state.setTextReorders);

  const useCurrentTextReorder = () => {
    const { id } = useParams();
    console.info('id', id);
    return textReorders.find((el) => el.id.toString() === id);
  };

  return {
    textReorders,
    setTextReorders,
    useCurrentTextReorder,
  };
};
