import { Trainings } from './Trainings';

export type Credentials = {
  email: string;
  password: string;
};

export type Tokens = { access_token: string; refresh_token: string };

export type Backend = {
  getTrainings: () => Promise<Trainings>;
  signIn: (credentials: Credentials) => Promise<Tokens>;
};
