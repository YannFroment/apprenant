import { useAppContext } from '../service-container/ServiceContainerContext';

const useSimpleStore = () => {
  const { useStore } = useAppContext();
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);

  return { bears, increasePopulation };
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

export const BearWrapper = () => {
  return (
    <>
      <BearCounter />
      <Controls />
    </>
  );
};
