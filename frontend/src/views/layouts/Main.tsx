import { ReactNode } from 'react';

type MainProps = { children: ReactNode };

export const Main = ({ children }: MainProps) => {
  return <main>{children}</main>;
};
