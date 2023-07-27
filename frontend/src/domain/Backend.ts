import { Trainings } from './Trainings';

export type Backend = {
  getTrainings: () => Promise<Trainings>;
};
