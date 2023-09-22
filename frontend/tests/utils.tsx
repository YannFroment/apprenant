import { render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Backend } from '../src/domain/Backend';
import { Storage } from '../src/domain/Storage';
import {
  AppContext,
  ServiceContainer,
} from '../src/service-container/ServiceContainerContext';
import { useAuthStore } from '../src/store/useAuthStore';
import { useTrainingsStore } from '../src/store/useTrainingsStore';
import { theme } from '../src/theme';

export const inMemoryBackend: Backend = {
  getTrainings: async () => {
    return { textReorders: [], wordRecognitions: [] };
  },
  signIn: async () => ({
    access_token: '',
    refresh_token: '',
  }),
};

const inMemoryStorage: Storage = {
  saveRefreshToken: () => {},
  deleteRefreshToken: () => {},
};

const defaultContainer: ServiceContainer = {
  speechSynth: { speak: () => {} },
  speechRecorderFactory: () => {
    return {
      start: () => {},
      stop: () => {},
    };
  },
  pictures: {
    get: async (searchKey) => {
      return searchKey;
    },
  },
  backend: inMemoryBackend,
  useTrainingsStore,
  useAuthStore,
  storage: inMemoryStorage,
};

const createContainer = (
  overrideContainer: Partial<ServiceContainer>,
): ServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};

const TestContainer = ({
  children,
  overrideServices,
}: {
  children: ReactNode;
  overrideServices?: Partial<ServiceContainer>;
}) => {
  const container = createContainer(overrideServices ?? {});

  return (
    <AppContext.Provider value={container}>{children}</AppContext.Provider>
  );
};

export const renderWithinProviders = ({
  children,
  overrideServices,
  wrapInRouter = true,
}: {
  children: ReactNode;
  overrideServices?: Partial<ServiceContainer>;
  wrapInRouter?: boolean;
}) => {
  render(
    <ThemeProvider theme={theme}>
      <TestContainer overrideServices={overrideServices}>
        {wrapInRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
      </TestContainer>
    </ThemeProvider>,
  );
};

export const createWrapper = (
  overrideServices: Partial<ServiceContainer> = {},
) => {
  return function Wrapper({ children }: { children: ReactElement }) {
    return (
      <TestContainer overrideServices={overrideServices}>
        {children}
      </TestContainer>
    );
  };
};
