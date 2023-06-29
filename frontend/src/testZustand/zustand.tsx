import { useState } from 'react';

import { useAppContext } from '../service-container/ServiceContainerContext';

const useSimpleStore = () => {
  const { useStore } = useAppContext();
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);
  const increasePopulationBy = useStore((state) => state.increasePopulationBy);

  return { bears, increasePopulation, increasePopulationBy };
};

function BearCounter() {
  const { bears } = useSimpleStore();
  return <h1 data-testid="bear-title">{bears}</h1>;
}

function Controls() {
  const { increasePopulation } = useSimpleStore();

  return (
    <button data-testid="bear-button" onClick={increasePopulation}>
      one up
    </button>
  );
}

function AddNumber() {
  const [num, setNum] = useState(0);
  const { increasePopulationBy } = useSimpleStore();
  return (
    <>
      <input value={num} onChange={(e) => setNum(parseInt(e.target.value))} />
      <button onClick={() => increasePopulationBy(num)}>Add</button>
    </>
  );
}

export const BearWrapper = () => {
  return (
    <>
      <BearCounter />
      <Controls />
      <AddNumber />
    </>
  );
};
