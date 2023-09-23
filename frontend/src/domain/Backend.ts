import { Trainings } from './Trainings';

export type Credentials = {
  email: string;
  password: string;
};

export type Backend = {
  getTrainings: () => Promise<Trainings>;
  signIn: (credentials: Credentials) => Promise<void>;
  logOut: () => Promise<void>;
  autoLogIn: () => Promise<boolean>;
};
