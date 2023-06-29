import { create } from 'zustand';

import { useAppContext } from '../service-container/ServiceContainerContext';

interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

function BearCounter() {
  const { useStore } = useAppContext();
  const bears = useStore((state) => state.bears);
  return <h1 data-testid="bear-title">{bears}</h1>;
}

function Controls() {
  const { useStore } = useAppContext();

  const increasePopulation = useStore((state) => state.increasePopulation);
  return (
    <button data-testid="bear-button" onClick={increasePopulation}>
      one up
    </button>
  );
}

export const BearWrapper = () => {
  return (
    <>
      <BearCounter />
      <Controls />
    </>
  );
};
